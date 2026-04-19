import clsx from "clsx";
import type { PropsWithChildren } from "react";

type CircleTileProps = PropsWithChildren<{
  className?: string;
  light?: boolean;
}>;

export function CircleTile({ className, light, children }: CircleTileProps) {
  return (
    <div
      className={clsx(
        light ? "nothing-card-light" : "nothing-card",
        "aspect-square w-full min-w-0 !rounded-full p-5 flex items-center justify-center overflow-hidden",
        className
      )}
    >
      {children}
    </div>
  );
}
