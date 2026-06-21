from dataclasses import dataclass


@dataclass
class FuturesConfig:
    # OKX linear perpetual (USDT-margined)
    symbol: str = "BTC/USDT:USDT"
    timeframe: str = "1h"           # Options: 1m, 5m, 15m, 30m, 1h, 4h, 1d

    # Leverage & margin
    leverage: int = 5               # 5x — adjust carefully
    margin_mode: str = "isolated"   # "isolated" (recommended) or "cross"

    # Breakout strategy
    lookback_period: int = 20       # Candles used to define resistance/support
    breakout_buffer: float = 0.002  # 0.2% confirmation above/below level

    # Risk management (all percentages based on available balance)
    risk_per_trade: float = 0.01    # 1% of balance risked per trade
    stop_loss_pct: float = 0.02     # 2% stop loss from entry
    take_profit_pct: float = 0.04   # 4% take profit (2:1 R:R)
    max_margin_pct: float = 0.20    # Max 20% of balance used as margin on one trade

    # Bot behavior
    loop_interval_seconds: int = 60
    dry_run: bool = False           # True = sandbox paper trading


@dataclass
class Config:
    # Trading pair and candle timeframe
    symbol: str = "BTC/USDT"
    timeframe: str = "1h"           # Options: 1m, 5m, 15m, 30m, 1h, 4h, 1d

    # Breakout strategy
    lookback_period: int = 20       # Candles used to define resistance/support
    breakout_buffer: float = 0.002  # 0.2% above resistance to confirm breakout

    # Risk management
    risk_per_trade: float = 0.01    # 1% of available USDT balance risked per trade
    stop_loss_pct: float = 0.02     # 2% stop loss below entry price
    take_profit_pct: float = 0.04   # 4% take profit above entry price (2:1 R:R)
    max_position_usdt: float = 500.0  # Hard cap on single position size (USDT)

    # Bot behavior
    loop_interval_seconds: int = 60   # How often the bot checks for signals
    dry_run: bool = False             # True = sandbox/paper trading, False = live
