import { useState } from "react";
import clsx from "clsx";
import { useWidgetTheme } from "../hooks/useWidgetTheme";
import { Tile } from "../primitives/Tile";
import { DotText } from "../primitives/DotText";
import { Label } from "../primitives/Label";

type CalculatorCardProps = {
  light?: boolean;
};

export function CalculatorCard({ light: explicitLight }: CalculatorCardProps) {
  const light = useWidgetTheme(explicitLight);
  const [display, setDisplay] = useState("0");
  const [prev, setPrev] = useState<number | null>(null);
  const [op, setOp] = useState<string | null>(null);
  const [fresh, setFresh] = useState(true);

  const handleNum = (n: string) => {
    if (fresh) { setDisplay(n); setFresh(false); }
    else if (display === "0") setDisplay(n);
    else if (display.length < 10) setDisplay(display + n);
  };

  const handleOp = (o: string) => {
    setOp(o);
    setPrev(parseFloat(display));
    setFresh(true);
  };

  const calc = () => {
    if (prev === null || !op) return;
    const curr = parseFloat(display);
    let res = 0;
    switch (op) {
      case "+": res = prev + curr; break;
      case "-": res = prev - curr; break;
      case "×": res = prev * curr; break;
      case "÷": res = curr !== 0 ? prev / curr : 0; break;
    }
    const formatted = String(Math.round(res * 1000000) / 1000000);
    setDisplay(formatted.slice(0, 10));
    setPrev(null);
    setOp(null);
    setFresh(true);
  };

  const clear = () => { setDisplay("0"); setPrev(null); setOp(null); setFresh(true); };

  const keys = [
    ["C", "±", "%", "÷"],
    ["7", "8", "9", "×"],
    ["4", "5", "6", "-"],
    ["1", "2", "3", "+"],
    ["0", ".", "="],
  ];

  return (
    <Tile light={light} className="flex flex-col gap-3 @min-[360px]:gap-4">
      <Label>Calculator</Label>
      <div className={clsx("rounded-[14px] px-3 @min-[360px]:px-4 py-4 @min-[360px]:py-5 text-right", light ? "bg-[rgba(17,17,17,0.06)]" : "bg-[rgba(255,255,255,0.06)]")}>
        <DotText value={display} className="text-[24px] @min-[360px]:text-[32px] leading-[1] tracking-[0.02em]" />
        {op && <span className="text-[11px] uppercase tracking-[0.12em] text-[var(--text-muted)]">{op}</span>}
      </div>
      <div className="grid grid-cols-4 gap-1.5 @min-[360px]:gap-2">
        {keys.flat().map((k) => {
          const isOp = ["÷", "×", "-", "+", "="].includes(k);
          const isFn = ["C", "±", "%"].includes(k);
          const wide = k === "0";
          return (
            <button
              key={k}
              onClick={() => {
                if (k === "C") clear();
                else if (k === "±") setDisplay(String(-parseFloat(display)));
                else if (k === "%") setDisplay(String(parseFloat(display) / 100));
                else if (k === "=") calc();
                else if (isOp) handleOp(k);
                else if (k === ".") { if (!display.includes(".")) setDisplay(display + "."); }
                else handleNum(k);
              }}
              className={clsx(
                "rounded-full py-2.5 @min-[360px]:py-3 text-[13px] @min-[360px]:text-[15px] font-medium transition-colors",
                wide && "col-span-2",
                isOp && !light && "bg-[var(--white)] text-[var(--bg)] hover:opacity-90",
                isOp && light && "bg-[var(--card-light-text)] text-[var(--card-light)] hover:opacity-90",
                isFn && !light && "bg-[var(--surface)] text-[var(--text)] hover:bg-[var(--surface-2)]",
                isFn && light && "bg-[rgba(17,17,17,0.08)] text-[var(--card-light-text)] hover:bg-[rgba(17,17,17,0.12)]",
                !isOp && !isFn && !light && "bg-[var(--surface-2)] text-[var(--text)] hover:bg-[var(--surface-3)]",
                !isOp && !isFn && light && "bg-[rgba(17,17,17,0.06)] text-[var(--card-light-text)] hover:bg-[rgba(17,17,17,0.1)]",
              )}
            >
              {k}
            </button>
          );
        })}
      </div>
    </Tile>
  );
}
