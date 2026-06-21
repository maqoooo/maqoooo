"""
Telegram interface for the OKX Futures Bot.

Commands:
  /start_bot  — uruchom trading
  /stop_bot   — zatrzymaj trading
  /status     — aktualna pozycja i cena BTC
  /trades     — ostatnie 5 transakcji
  /help       — lista komend

Setup:
  1. Utwórz bota przez @BotFather → skopiuj token do TELEGRAM_TOKEN
  2. Wyślij /start do bota, potem sprawdź Chat ID przez @userinfobot
     i wpisz go do TELEGRAM_CHAT_ID w pliku .env
  3. Uruchom: python telegram_interface.py
"""

import os
import sys
import json
import threading
from pathlib import Path

from dotenv import load_dotenv
from loguru import logger
from telegram import Update
from telegram.ext import Application, CommandHandler, ContextTypes

from config import FuturesConfig
from futures_bot import OKXFuturesBot
from notifier import TelegramNotifier


load_dotenv()


class TelegramInterface:
    def __init__(self):
        token = os.getenv("TELEGRAM_TOKEN")
        if not token:
            logger.error("Brak TELEGRAM_TOKEN w .env")
            sys.exit(1)

        self.authorized_chat = str(os.getenv("TELEGRAM_CHAT_ID", ""))
        self.config = FuturesConfig()
        self.notifier = TelegramNotifier()
        self.trading_bot = OKXFuturesBot(self.config, notifier=self.notifier)
        self._thread: threading.Thread | None = None

        self.app = Application.builder().token(token).build()
        self._register_handlers()

    # ─── Auth ─────────────────────────────────────────────────────────────────

    async def _check_auth(self, update: Update) -> bool:
        if self.authorized_chat and str(update.effective_chat.id) != self.authorized_chat:
            await update.message.reply_text("⛔ Brak dostępu.")
            return False
        return True

    # ─── Handlers ─────────────────────────────────────────────────────────────

    def _register_handlers(self):
        for cmd, fn in [
            ("start_bot", self._cmd_start_bot),
            ("stop_bot", self._cmd_stop_bot),
            ("status", self._cmd_status),
            ("trades", self._cmd_trades),
            ("help", self._cmd_help),
        ]:
            self.app.add_handler(CommandHandler(cmd, fn))

    def _is_running(self) -> bool:
        return bool(self._thread and self._thread.is_alive() and self.trading_bot.running)

    async def _cmd_start_bot(self, update: Update, ctx: ContextTypes.DEFAULT_TYPE):
        if not await self._check_auth(update):
            return
        if self._is_running():
            await update.message.reply_text("⚡ Bot już działa.")
            return

        self._thread = threading.Thread(target=self.trading_bot.run, daemon=True)
        self._thread.start()

        await update.message.reply_text(
            f"✅ <b>Bot uruchomiony!</b>\n\n"
            f"Symbol: {self.config.symbol}\n"
            f"Timeframe: {self.config.timeframe}\n"
            f"Dźwignia: {self.config.leverage}x {self.config.margin_mode}\n"
            f"SL: {self.config.stop_loss_pct:.1%}  TP: {self.config.take_profit_pct:.1%}\n"
            f"Lookback: {self.config.lookback_period} świec",
            parse_mode="HTML",
        )

    async def _cmd_stop_bot(self, update: Update, ctx: ContextTypes.DEFAULT_TYPE):
        if not await self._check_auth(update):
            return
        if not self._is_running():
            await update.message.reply_text("Bot nie jest uruchomiony.")
            return

        self.trading_bot.stop()
        await update.message.reply_text("⛔ <b>Bot zatrzymany.</b>", parse_mode="HTML")

    async def _cmd_status(self, update: Update, ctx: ContextTypes.DEFAULT_TYPE):
        if not await self._check_auth(update):
            return

        state = self.trading_bot.get_status()
        bot_label = "🟢 Działa" if self._is_running() else "🔴 Zatrzymany"
        text = f"<b>Status bota</b>  {bot_label}\n\n"

        price = state["current_price"]
        if price:
            text += f"BTC: <b>${price:,.2f}</b>\n\n"

        pos = state["position"]
        if pos:
            pnl_raw = (price - pos["entry"]) / pos["entry"] if price else 0
            if pos["side"] == "short":
                pnl_raw = -pnl_raw
            pnl_pct = pnl_raw * 100 * self.config.leverage
            emoji = "🟢" if pnl_pct >= 0 else "🔴"
            text += (
                f"<b>Pozycja:</b> {pos['side'].upper()}  {pos['contracts']} kontraktów\n"
                f"Entry: ${pos['entry']:.2f}\n"
                f"SL: ${pos['sl']:.2f}  |  TP: ${pos['tp']:.2f}\n"
                f"{emoji} P&L: <b>{pnl_pct:+.2f}%</b> ({self.config.leverage}x)\n"
            )
        else:
            text += "Brak otwartej pozycji.\n"

        if state["last_update"]:
            text += f"\n<i>Aktualizacja: {state['last_update']}</i>"

        await update.message.reply_text(text, parse_mode="HTML")

    async def _cmd_trades(self, update: Update, ctx: ContextTypes.DEFAULT_TYPE):
        if not await self._check_auth(update):
            return

        log_path = Path("logs/trades.jsonl")
        if not log_path.exists():
            await update.message.reply_text("Brak historii transakcji.")
            return

        trades = []
        with open(log_path) as f:
            for line in f:
                line = line.strip()
                if line:
                    try:
                        trades.append(json.loads(line))
                    except json.JSONDecodeError:
                        continue

        if not trades:
            await update.message.reply_text("Brak historii transakcji.")
            return

        total_pnl = sum(t.get("pnl_pct", 0) for t in trades)
        wins = sum(1 for t in trades if t.get("pnl_pct", 0) > 0)

        lines = [
            f"<b>Historia transakcji</b>  ({len(trades)} łącznie)\n"
            f"Win rate: {wins}/{len(trades)}  Suma P&L: {total_pnl:+.2f}%\n"
        ]

        reason_pl = {
            "stop_loss": "SL",
            "take_profit": "TP",
            "reverse_signal": "Odwrót",
        }

        for t in reversed(trades[-5:]):
            pnl = t.get("pnl_pct", 0)
            emoji = "✅" if pnl > 0 else "❌"
            reason = reason_pl.get(t.get("reason", ""), t.get("reason", ""))
            lines.append(
                f"{emoji} <b>{t['side'].upper()}</b>  [{reason}]  "
                f"<b>{pnl:+.2f}%</b>\n"
                f"   ${t['entry']:.2f} → ${t.get('exit', 0):.2f}"
            )

        await update.message.reply_text("\n".join(lines), parse_mode="HTML")

    async def _cmd_help(self, update: Update, ctx: ContextTypes.DEFAULT_TYPE):
        await update.message.reply_text(
            "<b>Komendy bota:</b>\n\n"
            "/start_bot — uruchom trading\n"
            "/stop_bot  — zatrzymaj trading\n"
            "/status    — aktualna pozycja i cena BTC\n"
            "/trades    — ostatnie 5 transakcji + statystyki\n"
            "/help      — ta pomoc",
            parse_mode="HTML",
        )

    # ─── Run ──────────────────────────────────────────────────────────────────

    def run(self):
        logger.info("Telegram interface uruchomiony. Oczekuję na komendy...")
        self.notifier.send(
            "🤖 <b>Bot Telegram połączony!</b>\n"
            "Wpisz /help aby zobaczyć dostępne komendy."
        )
        self.app.run_polling(allowed_updates=["message"])


if __name__ == "__main__":
    TelegramInterface().run()
