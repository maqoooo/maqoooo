"""
OKX Bitcoin Breakout Trading Bot
Strategy: Buy when price breaks above N-candle resistance with buffer confirmation.
          Close on take profit, stop loss, or bearish breakdown of support.
Spot trading only — long positions only (no shorting).
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

from config import Config


load_dotenv()


class OKXBreakoutBot:
    def __init__(self, config: Config):
        self.config = config
        self.exchange = self._init_exchange()
        self.position: dict | None = None

        Path("logs").mkdir(exist_ok=True)
        logger.add(
            "logs/bot_{time:YYYY-MM-DD}.log",
            rotation="00:00",
            retention="30 days",
            level="INFO",
            format="{time:YYYY-MM-DD HH:mm:ss} | {level} | {message}",
        )

    # ─── Exchange ────────────────────────────────────────────────────────────

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
        })

        if self.config.dry_run:
            exchange.set_sandbox_mode(True)
            logger.info("Mode: SANDBOX (paper trading — no real money)")
        else:
            logger.warning("Mode: LIVE — real money at risk!")

        return exchange

    # ─── Data ────────────────────────────────────────────────────────────────

    def _fetch_candles(self) -> pd.DataFrame:
        limit = self.config.lookback_period + 10
        ohlcv = self.exchange.fetch_ohlcv(self.config.symbol, self.config.timeframe, limit=limit)
        df = pd.DataFrame(ohlcv, columns=["timestamp", "open", "high", "low", "close", "volume"])
        df["timestamp"] = pd.to_datetime(df["timestamp"], unit="ms", utc=True)
        return df

    def _get_free_usdt(self) -> float:
        balance = self.exchange.fetch_balance()
        return float(balance["USDT"]["free"])

    # ─── Strategy ────────────────────────────────────────────────────────────

    def _breakout_levels(self, df: pd.DataFrame) -> tuple[float, float]:
        # Exclude the current (potentially incomplete) candle
        history = df.iloc[-(self.config.lookback_period + 1):-1]
        resistance = float(history["high"].max())
        support = float(history["low"].min())
        return resistance, support

    def _position_size(self, balance_usdt: float, entry_price: float) -> float:
        # Size = risk_amount / (entry_price * stop_loss_pct)
        risk_usdt = balance_usdt * self.config.risk_per_trade
        size_by_risk = risk_usdt / (entry_price * self.config.stop_loss_pct)
        size_by_cap = self.config.max_position_usdt / entry_price
        return round(min(size_by_risk, size_by_cap), 6)

    # ─── Position management ─────────────────────────────────────────────────

    def _open_long(self, price: float, size: float):
        sl = round(price * (1 - self.config.stop_loss_pct), 2)
        tp = round(price * (1 + self.config.take_profit_pct), 2)

        logger.info(f"OPEN LONG  price={price:.2f}  size={size} BTC  SL={sl:.2f}  TP={tp:.2f}")

        if self.config.dry_run:
            order_id = f"paper_{int(time.time())}"
        else:
            order = self.exchange.create_market_buy_order(self.config.symbol, size)
            order_id = order["id"]

        self.position = {
            "side": "long",
            "entry": price,
            "size": size,
            "sl": sl,
            "tp": tp,
            "order_id": order_id,
            "opened_at": datetime.now(timezone.utc).isoformat(),
        }

    def _close_position(self, price: float, reason: str):
        if self.position is None:
            return

        pnl_pct = (price - self.position["entry"]) / self.position["entry"] * 100
        logger.info(f"CLOSE LONG  reason={reason}  exit={price:.2f}  pnl={pnl_pct:+.2f}%")

        if not self.config.dry_run:
            self.exchange.create_market_sell_order(self.config.symbol, self.position["size"])

        self._log_trade({
            **self.position,
            "exit": price,
            "pnl_pct": round(pnl_pct, 4),
            "reason": reason,
            "closed_at": datetime.now(timezone.utc).isoformat(),
        })
        self.position = None

    def _log_trade(self, trade: dict):
        with open("logs/trades.jsonl", "a") as f:
            f.write(json.dumps(trade) + "\n")

    # ─── Main loop ───────────────────────────────────────────────────────────

    def _step(self):
        df = self._fetch_candles()
        price = float(df["close"].iloc[-1])
        resistance, support = self._breakout_levels(df)

        pos_label = f"LONG entry={self.position['entry']:.2f}" if self.position else "NONE"
        logger.info(
            f"BTC={price:.2f}  resistance={resistance:.2f}  support={support:.2f}  position={pos_label}"
        )

        # Exit check
        if self.position:
            if price <= self.position["sl"]:
                self._close_position(price, "stop_loss")
            elif price >= self.position["tp"]:
                self._close_position(price, "take_profit")
            elif price < support:
                # Bearish breakdown — exit existing long to avoid further loss
                self._close_position(price, "bearish_breakdown")

        # Entry check
        if self.position is None:
            buf = self.config.breakout_buffer
            if price > resistance * (1 + buf):
                balance = self._get_free_usdt()
                size = self._position_size(balance, price)
                if size > 0:
                    self._open_long(price, size)
                else:
                    logger.warning("Calculated size is 0 — insufficient balance or config issue")

    def run(self):
        logger.info(
            f"Starting OKX Breakout Bot | {self.config.symbol} {self.config.timeframe} "
            f"| lookback={self.config.lookback_period} buffer={self.config.breakout_buffer:.1%} "
            f"| SL={self.config.stop_loss_pct:.1%} TP={self.config.take_profit_pct:.1%}"
        )

        while True:
            try:
                self._step()

            except ccxt.AuthenticationError as e:
                logger.error(f"Authentication failed — check API keys: {e}")
                sys.exit(1)

            except ccxt.NetworkError as e:
                logger.warning(f"Network error: {e} — retrying in 30s")
                time.sleep(30)
                continue

            except ccxt.ExchangeError as e:
                logger.error(f"Exchange error: {e}")

            except KeyboardInterrupt:
                logger.info("Interrupted — shutting down")
                break

            except Exception as e:
                logger.exception(f"Unexpected error: {e}")

            time.sleep(self.config.loop_interval_seconds)


if __name__ == "__main__":
    bot = OKXBreakoutBot(Config())
    bot.run()
