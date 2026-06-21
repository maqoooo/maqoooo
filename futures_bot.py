"""
OKX Bitcoin Futures Breakout Bot  (BTC/USDT:USDT — linear perpetual)

Strategy
--------
- Resistance = highest high of last N closed candles
- Support    = lowest  low  of last N closed candles
- Breakout above resistance → LONG
- Breakdown below support   → SHORT
- Exit on Take Profit, Stop Loss, or opposite breakout signal

Position mode: one-way (net) — one position at a time per instrument.
"""

import os
import sys
import json
import time
from datetime import datetime, timezone
from pathlib import Path

import ccxt
import pandas as pd
from dotenv import load_dotenv
from loguru import logger

from config import FuturesConfig


load_dotenv()

# OKX BTC/USDT:USDT: 1 contract = 0.01 BTC
CONTRACT_SIZE_BTC = 0.01


class OKXFuturesBot:
    def __init__(self, config: FuturesConfig, notifier=None):
        self.config = config
        self.notifier = notifier
        self.exchange = self._init_exchange()
        self.position: dict | None = None
        self.running: bool = False
        self.current_price: float = 0.0
        self.last_update: str = ""

        Path("logs").mkdir(exist_ok=True)
        logger.add(
            "logs/futures_{time:YYYY-MM-DD}.log",
            rotation="00:00",
            retention="30 days",
            level="INFO",
            format="{time:YYYY-MM-DD HH:mm:ss} | {level} | {message}",
        )

        self._configure_futures()

    def stop(self):
        self.running = False

    def get_status(self) -> dict:
        return {
            "position": self.position,
            "current_price": self.current_price,
            "last_update": self.last_update,
            "running": self.running,
        }

    def _notify(self, text: str):
        if self.notifier:
            self.notifier.send(text)

    # ─── Setup ───────────────────────────────────────────────────────────────

    def _init_exchange(self) -> ccxt.okx:
        api_key = os.getenv("OKX_API_KEY")
        secret = os.getenv("OKX_SECRET")
        passphrase = os.getenv("OKX_PASSPHRASE")

        if not all([api_key, secret, passphrase]):
            logger.error("Missing OKX credentials — copy .env.example to .env and fill in values.")
            sys.exit(1)

        exchange = ccxt.okx({
            "apiKey": api_key,
            "secret": secret,
            "password": passphrase,
            "enableRateLimit": True,
            "options": {
                "defaultType": "swap",   # perpetual futures
            },
        })

        if self.config.dry_run:
            exchange.set_sandbox_mode(True)
            logger.info("Mode: SANDBOX (paper trading)")
        else:
            logger.warning("Mode: LIVE FUTURES — real money with leverage!")

        return exchange

    def _configure_futures(self):
        """Set one-way position mode, leverage, and margin mode on OKX."""
        try:
            # One-way (net) mode — single position per instrument
            self.exchange.set_position_mode(False, self.config.symbol)
        except ccxt.ExchangeError:
            pass  # Already in one-way mode or has open positions

        try:
            self.exchange.set_leverage(
                self.config.leverage,
                self.config.symbol,
                params={"mgnMode": self.config.margin_mode},
            )
            logger.info(
                f"Configured {self.config.symbol}: {self.config.leverage}x "
                f"{self.config.margin_mode} margin"
            )
        except Exception as e:
            logger.warning(f"Could not set leverage/margin: {e}")

    # ─── Data helpers ─────────────────────────────────────────────────────────

    def _fetch_candles(self) -> pd.DataFrame:
        limit = self.config.lookback_period + 10
        ohlcv = self.exchange.fetch_ohlcv(
            self.config.symbol, self.config.timeframe, limit=limit
        )
        df = pd.DataFrame(ohlcv, columns=["timestamp", "open", "high", "low", "close", "volume"])
        df["timestamp"] = pd.to_datetime(df["timestamp"], unit="ms", utc=True)
        return df

    def _get_free_usdt(self) -> float:
        bal = self.exchange.fetch_balance(params={"type": "swap"})
        return float(bal.get("USDT", {}).get("free", 0.0))

    # ─── Position sync ────────────────────────────────────────────────────────

    def _sync_position(self):
        """Align local state with the exchange — handles liquidations and restarts."""
        try:
            positions = self.exchange.fetch_positions([self.config.symbol])
            active = [p for p in positions if float(p.get("contracts") or 0) > 0]

            if not active:
                if self.position:
                    logger.warning("Position disappeared (liquidated or closed externally).")
                    self._notify("⚠️ <b>Pozycja zlikwidowana lub zamknięta zewnętrznie!</b>\nSprawdź konto OKX.")
                self.position = None
                return

            if self.position is not None:
                return  # Already tracked locally

            # Bot restarted with an open position — reconstruct
            pos = active[0]
            side = pos["side"]  # "long" or "short"
            entry = float(pos["entryPrice"])
            contracts = float(pos["contracts"])
            multiplier = (1 - self.config.stop_loss_pct) if side == "long" else (1 + self.config.stop_loss_pct)
            sl = round(entry * multiplier, 2)
            tp_mult = (1 + self.config.take_profit_pct) if side == "long" else (1 - self.config.take_profit_pct)
            tp = round(entry * tp_mult, 2)

            self.position = {
                "side": side,
                "entry": entry,
                "contracts": int(contracts),
                "sl": sl,
                "tp": tp,
                "opened_at": datetime.now(timezone.utc).isoformat(),
                "recovered": True,
            }
            logger.info(
                f"Recovered position: {side.upper()} {int(contracts)} contracts "
                f"@ {entry:.2f}  SL={sl:.2f}  TP={tp:.2f}"
            )
        except Exception as e:
            logger.warning(f"Position sync failed: {e}")

    # ─── Strategy ─────────────────────────────────────────────────────────────

    def _breakout_levels(self, df: pd.DataFrame) -> tuple[float, float]:
        history = df.iloc[-(self.config.lookback_period + 1):-1]  # exclude current candle
        return float(history["high"].max()), float(history["low"].min())

    def _calc_contracts(self, balance_usdt: float, price: float) -> int:
        # Risk-based sizing: risk_amount = contracts * contract_size * price * sl_pct
        risk_usdt = balance_usdt * self.config.risk_per_trade
        contracts_by_risk = risk_usdt / (CONTRACT_SIZE_BTC * price * self.config.stop_loss_pct)

        # Margin cap: position notional = contracts * contract_size * price
        #             margin = notional / leverage
        max_notional = balance_usdt * self.config.max_margin_pct * self.config.leverage
        contracts_by_cap = max_notional / (CONTRACT_SIZE_BTC * price)

        return max(1, int(min(contracts_by_risk, contracts_by_cap)))

    # ─── Orders ───────────────────────────────────────────────────────────────

    def _open_long(self, price: float, contracts: int):
        sl = round(price * (1 - self.config.stop_loss_pct), 2)
        tp = round(price * (1 + self.config.take_profit_pct), 2)
        notional = contracts * CONTRACT_SIZE_BTC * price

        logger.info(
            f"OPEN LONG   price={price:.2f}  contracts={contracts}  "
            f"notional≈${notional:.0f}  SL={sl:.2f}  TP={tp:.2f}"
        )

        if not self.config.dry_run:
            self.exchange.create_order(
                self.config.symbol, "market", "buy", contracts,
                params={"tdMode": self.config.margin_mode},
            )

        self.position = {
            "side": "long", "entry": price, "contracts": contracts,
            "sl": sl, "tp": tp,
            "opened_at": datetime.now(timezone.utc).isoformat(),
        }
        self._notify(
            f"🟢 <b>LONG otwarto</b>\n"
            f"Cena: <b>${price:.2f}</b>\n"
            f"Kontrakty: {contracts}  (~${notional:.0f})\n"
            f"SL: ${sl:.2f}  |  TP: ${tp:.2f}"
        )

    def _open_short(self, price: float, contracts: int):
        sl = round(price * (1 + self.config.stop_loss_pct), 2)
        tp = round(price * (1 - self.config.take_profit_pct), 2)
        notional = contracts * CONTRACT_SIZE_BTC * price

        logger.info(
            f"OPEN SHORT  price={price:.2f}  contracts={contracts}  "
            f"notional≈${notional:.0f}  SL={sl:.2f}  TP={tp:.2f}"
        )

        if not self.config.dry_run:
            self.exchange.create_order(
                self.config.symbol, "market", "sell", contracts,
                params={"tdMode": self.config.margin_mode},
            )

        self.position = {
            "side": "short", "entry": price, "contracts": contracts,
            "sl": sl, "tp": tp,
            "opened_at": datetime.now(timezone.utc).isoformat(),
        }
        self._notify(
            f"🔴 <b>SHORT otwarto</b>\n"
            f"Cena: <b>${price:.2f}</b>\n"
            f"Kontrakty: {contracts}  (~${notional:.0f})\n"
            f"SL: ${sl:.2f}  |  TP: ${tp:.2f}"
        )

    def _close_position(self, price: float, reason: str):
        if self.position is None:
            return

        side = self.position["side"]
        pnl_raw = (price - self.position["entry"]) / self.position["entry"]
        if side == "short":
            pnl_raw = -pnl_raw
        pnl_pct = pnl_raw * 100 * self.config.leverage

        logger.info(
            f"CLOSE {side.upper():<5}  reason={reason}  "
            f"exit={price:.2f}  pnl={pnl_pct:+.2f}% (with {self.config.leverage}x)"
        )

        if not self.config.dry_run:
            close_side = "sell" if side == "long" else "buy"
            self.exchange.create_order(
                self.config.symbol, "market", close_side, self.position["contracts"],
                params={"tdMode": self.config.margin_mode, "reduceOnly": True},
            )

        self._log_trade({
            **self.position,
            "exit": price,
            "pnl_pct": round(pnl_pct, 4),
            "leverage": self.config.leverage,
            "reason": reason,
            "closed_at": datetime.now(timezone.utc).isoformat(),
        })
        emoji = "✅" if pnl_pct > 0 else "❌"
        reason_pl = {
            "stop_loss": "Stop Loss",
            "take_profit": "Take Profit",
            "reverse_signal": "Odwrócenie sygnału",
        }.get(reason, reason)
        self._notify(
            f"{emoji} <b>Pozycja zamknięta</b>\n"
            f"Powód: {reason_pl}\n"
            f"P&L: <b>{pnl_pct:+.2f}%</b> ({self.config.leverage}x)\n"
            f"Exit: ${price:.2f}"
        )
        self.position = None

    def _log_trade(self, trade: dict):
        with open("logs/trades.jsonl", "a") as f:
            f.write(json.dumps(trade) + "\n")

    # ─── Main loop ────────────────────────────────────────────────────────────

    def _step(self):
        self._sync_position()

        df = self._fetch_candles()
        price = float(df["close"].iloc[-1])
        resistance, support = self._breakout_levels(df)

        self.current_price = price
        self.last_update = datetime.now(timezone.utc).strftime("%H:%M:%S UTC")

        pos_label = (
            f"{self.position['side'].upper()} {self.position['contracts']}c "
            f"@ {self.position['entry']:.2f}"
            if self.position else "NONE"
        )
        logger.info(
            f"BTC={price:.2f}  R={resistance:.2f}  S={support:.2f}  pos={pos_label}"
        )

        # ── Exit ──
        if self.position:
            p = self.position
            if p["side"] == "long":
                if price <= p["sl"]:
                    self._close_position(price, "stop_loss")
                elif price >= p["tp"]:
                    self._close_position(price, "take_profit")
                elif price < support * (1 - self.config.breakout_buffer):
                    self._close_position(price, "reverse_signal")
            else:  # short
                if price >= p["sl"]:
                    self._close_position(price, "stop_loss")
                elif price <= p["tp"]:
                    self._close_position(price, "take_profit")
                elif price > resistance * (1 + self.config.breakout_buffer):
                    self._close_position(price, "reverse_signal")

        # ── Entry ──
        if self.position is None:
            balance = self._get_free_usdt()
            buf = self.config.breakout_buffer
            contracts = self._calc_contracts(balance, price)

            if price > resistance * (1 + buf):
                self._open_long(price, contracts)
            elif price < support * (1 - buf):
                self._open_short(price, contracts)

    def run(self):
        logger.info(
            f"OKX Futures Bot started | {self.config.symbol} {self.config.timeframe} "
            f"| {self.config.leverage}x {self.config.margin_mode} "
            f"| lookback={self.config.lookback_period} buf={self.config.breakout_buffer:.1%} "
            f"| SL={self.config.stop_loss_pct:.1%} TP={self.config.take_profit_pct:.1%}"
        )

        self.running = True
        while self.running:
            try:
                self._step()

            except ccxt.AuthenticationError as e:
                logger.error(f"Authentication failed: {e}")
                self._notify("🚨 <b>Błąd autoryzacji OKX!</b> Sprawdź klucze API.")
                sys.exit(1)

            except ccxt.InsufficientFunds as e:
                logger.error(f"Insufficient funds: {e}")
                self._notify("⚠️ <b>Niewystarczające środki</b> na koncie OKX.")

            except ccxt.NetworkError as e:
                logger.warning(f"Network error: {e} — retrying in 30s")
                time.sleep(30)
                continue

            except ccxt.ExchangeError as e:
                logger.error(f"Exchange error: {e}")

            except KeyboardInterrupt:
                logger.info("Shutting down gracefully")
                self.running = False
                break

            except Exception as e:
                logger.exception(f"Unexpected error: {e}")

            time.sleep(self.config.loop_interval_seconds)


if __name__ == "__main__":
    bot = OKXFuturesBot(FuturesConfig())
    bot.run()
