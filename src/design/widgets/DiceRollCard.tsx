import { useState, useCallback } from "react";
import clsx from "clsx";
import { useWidgetTheme } from "../hooks/useWidgetTheme";
import { Tile } from "../primitives/Tile";
import { DotText } from "../primitives/DotText";
import { Label } from "../primitives/Label";

type DiceRollCardProps = {
  light?: boolean;
};

const dotPositions: Record<number, [number, number][]> = {
  1: [[4, 4]],
  2: [[1, 1], [7, 7]],
  3: [[1, 1], [4, 4], [7, 7]],
  4: [[1, 1], [1, 7], [7, 1], [7, 7]],
  5: [[1, 1], [1, 7], [4, 4], [7, 1], [7, 7]],
  6: [[1, 1], [1, 4], [1, 7], [7, 1], [7, 4], [7, 7]],
};

function Die({ value, rolling }: { value: number; rolling: boolean }) {
  const dots = dotPositions[value] || [];
  return (
    <div
      className={clsx(
        "relative h-20 w-20 rounded-[14px] ring-1 ring-[var(--border)] transition-transform duration-300",
        rolling && "scale-95 rotate-6"
      )}
    >
      <div className="absolute inset-0 grid grid-cols-9 grid-rows-9">
        {dots.map(([x, y], i) => (
          <span
            key={i}
            className="absolute h-2.5 w-2.5 rounded-full bg-[var(--danger)]"
            style={{ left: `${(x / 9) * 100}%`, top: `${(y / 9) * 100}%`, transform: "translate(-50%, -50%)" }}
          />
        ))}
      </div>
    </div>
  );
}

export function DiceRollCard({ light: explicitLight }: DiceRollCardProps) {
  const light = useWidgetTheme(explicitLight);
  const [dice, setDice] = useState([3, 4]);
  const [rolling, setRolling] = useState(false);
  const [history, setHistory] = useState<number[]>([]);

  const roll = useCallback(() => {
    if (rolling) return;
    setRolling(true);
    const interval = setInterval(() => {
      setDice([Math.ceil(Math.random() * 6), Math.ceil(Math.random() * 6)]);
    }, 80);
    setTimeout(() => {
      clearInterval(interval);
      const final = [Math.ceil(Math.random() * 6), Math.ceil(Math.random() * 6)];
      setDice(final);
      setHistory((prev) => [final[0] + final[1], ...prev].slice(0, 5));
      setRolling(false);
    }, 600);
  }, [rolling]);

  const total = dice[0] + dice[1];

  return (
    <Tile light={light} className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <Label>Dice</Label>
        <DotText value={String(total)} className="text-[20px]" />
      </div>
      <div className="flex items-center justify-center gap-4 py-2">
        <Die value={dice[0]} rolling={rolling} />
        <Die value={dice[1]} rolling={rolling} />
      </div>
      <button
        onClick={roll}
        disabled={rolling}
        className={clsx(
          "w-full rounded-full py-2.5 text-[11px] font-semibold uppercase tracking-[0.08em] transition-opacity hover:opacity-90 disabled:opacity-50",
          light ? "bg-[var(--card-light-text)] text-[var(--card-light)]" : "bg-[var(--white)] text-[var(--bg)]"
        )}
      >
        {rolling ? "Rolling..." : "Roll"}
      </button>
      {history.length > 0 && (
        <div className="flex items-center gap-2">
          <span className="text-[10px] uppercase tracking-[0.12em] text-[var(--text-muted)]">Last:</span>
          <div className="flex gap-1.5">
            {history.map((h, i) => (
              <span key={i} className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--surface)] text-[11px] text-[var(--text)]">
                {h}
              </span>
            ))}
          </div>
        </div>
      )}
    </Tile>
  );
}
