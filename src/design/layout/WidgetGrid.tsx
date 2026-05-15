import type { PropsWithChildren } from "react";
import { useTheme } from "../hooks/useTheme";

type WidgetGridProps = PropsWithChildren<{
  shadow?: "on" | "off";
  id?: string;
}>;

export function WidgetGrid({ children, shadow = "on", id }: WidgetGridProps) {
  const { mode } = useTheme();
  return (
    <div
      id={id}
      data-theme={mode}
      className={`${mode === "light" ? "nothing-canvas-soft" : "nothing-grid-bg"} ${
        shadow === "off" ? "nothing-no-shadow" : ""
      } min-h-screen p-6 md:p-10`}
    >
      <div className="mx-auto grid max-w-[1520px] grid-cols-1 gap-4 md:grid-cols-12">
        {children}
      </div>
    </div>
  );
}
