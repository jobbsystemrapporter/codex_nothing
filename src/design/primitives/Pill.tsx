import clsx from "clsx";
import type { PropsWithChildren } from "react";

type PillProps = PropsWithChildren<{
  className?: string;
  light?: boolean;
}>;

export function Pill({ className, light, children }: PillProps) {
  return (
    <div
      className={clsx(
        light ? "nothing-card-light" : "nothing-card",
        "rounded-full px-4 py-2 inline-flex items-center gap-2",
        className
      )}
    >
      {children}
    </div>
  );
}
