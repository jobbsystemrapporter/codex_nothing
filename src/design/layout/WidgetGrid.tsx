import type { PropsWithChildren } from "react";

type WidgetGridProps = PropsWithChildren<{
  mode?: "dark" | "light";
  shadow?: "on" | "off";
  id?: string;
}>;

export function WidgetGrid({
  children,
  mode = "light",
  shadow = "on",
  id,
}: WidgetGridProps) {
  return (
    <div
      id={id}
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
