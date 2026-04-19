import clsx from "clsx";

type DotTextProps = {
  value: string;
  className?: string;
};

export function DotText({ value, className }: DotTextProps) {
  return (
    <div
      className={clsx(
        "nothing-dot tabular-nums",
        className
      )}
      aria-label={value}
    >
      {value}
    </div>
  );
}
