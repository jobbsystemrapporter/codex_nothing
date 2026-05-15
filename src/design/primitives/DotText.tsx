import clsx from "clsx";

import type { CSSProperties } from "react";

type DotTextProps = {
  value: string;
  className?: string;
  style?: CSSProperties;
};

export function DotText({ value, className, style }: DotTextProps) {
  return (
    <div
      className={clsx(
        "nothing-dot tabular-nums",
        className
      )}
      style={style}
      aria-label={value}
    >
      {value}
    </div>
  );
}
