import clsx from "clsx";
import type { PropsWithChildren } from "react";

type TileProps = PropsWithChildren<{
  className?: string;
  light?: boolean;
}>;

export function Tile({ className, light, children }: TileProps) {
  return (
    <div
      className={clsx(
        light ? "nothing-card-light" : "nothing-card",
        "w-full min-w-0 p-5",
        className
      )}
    >
      {children}
    </div>
  );
}
