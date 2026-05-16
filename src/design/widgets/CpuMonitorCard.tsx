import { useEffect, useState, useRef } from "react";
import clsx from "clsx";
import { useWidgetTheme } from "../hooks/useWidgetTheme";
import { Tile } from "../primitives/Tile";
import { DotText } from "../primitives/DotText";
import { Label } from "../primitives/Label";

type CpuMonitorCardProps = {
  light?: boolean;
};

export function CpuMonitorCard({ light: explicitLight }: CpuMonitorCardProps) {
  const light = useWidgetTheme(explicitLight);
  const [cores, setCores] = useState([12, 34, 56, 23, 78, 45, 67, 30]);
  const frame = useRef(0);

  useEffect(() => {
    const animate = () => {
      setCores((prev) =>
        prev.map((v) => {
          const change = (Math.random() - 0.5) * 20;
          return Math.max(5, Math.min(98, Math.round(v + change)));
        })
      );
      frame.current = window.setTimeout(() => {
        frame.current = requestAnimationFrame(animate);
      }, 800);
    };
    frame.current = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(frame.current);
      clearTimeout(frame.current);
    };
  }, []);

  const avg = Math.round(cores.reduce((a, b) => a + b, 0) / cores.length);

  return (
    <Tile light={light} className="flex flex-col gap-3 @min-[360px]:gap-4">
      <div className="flex items-center justify-between">
        <Label>CPU Monitor</Label>
        <DotText value={`${avg}%`} className="text-[14px] @min-[360px]:text-[16px]" />
      </div>
      <div className="flex items-end gap-1 @min-[360px]:gap-1.5 h-20 @min-[360px]:h-24">
        {cores.map((v, i) => (
          <div key={i} className="flex-1 flex flex-col justify-end gap-1">
            <div
              className={clsx(
                "w-full rounded-full transition-all duration-700 ease-out",
                v > 80 ? "bg-[var(--danger)]" : light ? "bg-[var(--card-light-text)]" : "bg-[var(--white)]"
              )}
              style={{ height: `${v}%` }}
            />
            <span className="text-center text-[8px] @min-[360px]:text-[9px] uppercase tracking-[0.08em] text-[var(--text-muted)]">{i + 1}</span>
          </div>
        ))}
      </div>
      <div className="flex justify-between text-[10px] uppercase tracking-[0.12em] text-[var(--text-muted)]">
        <span>8 Cores</span>
        <span>Live</span>
      </div>
    </Tile>
  );
}
