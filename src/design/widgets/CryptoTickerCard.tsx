import { useEffect, useState, useRef } from "react";
import clsx from "clsx";
import { useWidgetTheme } from "../hooks/useWidgetTheme";
import { Tile } from "../primitives/Tile";
import { DotText } from "../primitives/DotText";
import { Label } from "../primitives/Label";

type CryptoTickerCardProps = {
  light?: boolean;
};

const coins = [
  { symbol: "BTC", name: "Bitcoin", price: 67432, change: 2.4 },
  { symbol: "ETH", name: "Ethereum", price: 3521, change: -1.2 },
  { symbol: "SOL", name: "Solana", price: 148, change: 5.7 },
  { symbol: "DOT", name: "Polkadot", price: 7.24, change: -0.8 },
  { symbol: "XRP", name: "Ripple", price: 0.62, change: 1.1 },
];

export function CryptoTickerCard({ light: explicitLight }: CryptoTickerCardProps) {
  const light = useWidgetTheme(explicitLight);
  const [prices, setPrices] = useState(coins);
  const [activeIndex, setActiveIndex] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval>>(null);

  useEffect(() => {
    timer.current = setInterval(() => {
      setPrices((prev) =>
        prev.map((c) => {
          const jitter = (Math.random() - 0.5) * c.price * 0.008;
          return { ...c, price: Math.max(0.01, Math.round((c.price + jitter) * 100) / 100) };
        })
      );
      setActiveIndex((i) => (i + 1) % coins.length);
    }, 2500);
    return () => clearInterval(timer.current!);
  }, []);

  const active = prices[activeIndex];

  return (
    <Tile light={light} className="flex flex-col gap-3 @min-[360px]:gap-4">
      <Label>Crypto Ticker</Label>
      <div className="flex items-center justify-between gap-2">
        <div className="min-w-0">
          <span className="text-[11px] uppercase tracking-[0.12em] text-[var(--text-muted)]">{active.symbol}</span>
          <DotText
            value={`$${active.price >= 1 ? active.price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : active.price.toFixed(4)}`}
            className="mt-1 text-[24px] @min-[300px]:text-[30px] @min-[360px]:text-[36px] leading-[1] tracking-[0.02em]"
          />
        </div>
        <span
          className={clsx(
            "shrink-0 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.08em]",
            active.change >= 0
              ? "bg-[var(--white)] text-[var(--bg)]"
              : "bg-[var(--danger)] text-white"
          )}
        >
          {active.change >= 0 ? "+" : ""}{active.change}%
        </span>
      </div>
      <div className="flex gap-1.5 @min-[360px]:gap-2">
        {prices.map((c, i) => (
          <button
            key={c.symbol}
            onClick={() => setActiveIndex(i)}
            className={clsx(
              "flex-1 rounded-full py-1.5 @min-[360px]:py-2 text-[9px] @min-[360px]:text-[10px] uppercase tracking-[0.1em] transition-all",
              i === activeIndex
                ? light
                  ? "bg-[var(--card-light-text)] text-[var(--card-light)]"
                  : "bg-[var(--white)] text-[var(--bg)]"
                : "bg-[var(--surface)] text-[var(--text-muted)] hover:bg-[var(--surface-2)]"
            )}
          >
            {c.symbol}
          </button>
        ))}
      </div>
    </Tile>
  );
}
