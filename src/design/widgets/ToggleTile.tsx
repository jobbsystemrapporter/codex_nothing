import { CircleTile } from "../primitives/CircleTile";
import { Label } from "../primitives/Label";
import type { ReactNode } from "react";
import { useWidgetTheme } from "../hooks/useWidgetTheme";
import clsx from "clsx";

type ToggleTileProps = {
  icon: ReactNode;
  label: string;
  active?: boolean;
  onToggle?: () => void;
};

export function ToggleTile({ icon, label, active, onToggle }: ToggleTileProps) {
  const light = useWidgetTheme();
  const content = (
    <div className="flex flex-col items-center gap-3">
      <div>{icon}</div>
      <Label className="text-center">{label}</Label>
    </div>
  );

  if (onToggle) {
    return (
      <button
        aria-pressed={Boolean(active)}
        className={clsx(
          `${light ? "nothing-card-light" : "nothing-card"} aspect-square rounded-full p-5 flex items-center justify-center transition-colors`,
          active ? "text-red-500" : ""
        )}
        onClick={onToggle}
        type="button"
      >
        {content}
      </button>
    );
  }

  return (
    <CircleTile className={active ? "text-red-500" : ""}>
      {content}
    </CircleTile>
  );
}
