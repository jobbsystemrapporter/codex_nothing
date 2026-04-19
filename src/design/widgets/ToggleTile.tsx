import { CircleTile } from "../primitives/CircleTile";
import { Label } from "../primitives/Label";
import type { ReactNode } from "react";

type ToggleTileProps = {
  icon: ReactNode;
  label: string;
  active?: boolean;
};

export function ToggleTile({ icon, label, active }: ToggleTileProps) {
  return (
    <CircleTile className={active ? "text-red-500" : ""}>
      <div className="flex flex-col items-center gap-3">
        <div>{icon}</div>
        <Label className="text-center">{label}</Label>
      </div>
    </CircleTile>
  );
}
