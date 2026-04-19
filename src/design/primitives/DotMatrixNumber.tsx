import clsx from "clsx";

const glyphs: Record<string, string[]> = {
  "0": ["111", "101", "101", "101", "111"],
  "1": ["010", "110", "010", "010", "111"],
  "2": ["111", "001", "111", "100", "111"],
  "3": ["111", "001", "111", "001", "111"],
  "4": ["101", "101", "111", "001", "001"],
  "5": ["111", "100", "111", "001", "111"],
  "6": ["111", "100", "111", "101", "111"],
  "7": ["111", "001", "001", "001", "001"],
  "8": ["111", "101", "111", "101", "111"],
  "9": ["111", "101", "111", "001", "111"],
  ":": ["000", "010", "000", "010", "000"],
  "°": ["111", "101", "111", "000", "000"],
  "-": ["000", "000", "111", "000", "000"],
  " ": ["000", "000", "000", "000", "000"],
};

type DotMatrixNumberProps = {
  value: string;
  size?: "sm" | "md" | "lg";
  className?: string;
  light?: boolean;
  offStyle?: "dim" | "none";
};

const sizeMap = {
  sm: { dot: "h-1.5 w-1.5", cellGap: "gap-1", charGap: "gap-2" },
  md: { dot: "h-2.5 w-2.5", cellGap: "gap-1.5", charGap: "gap-3" },
  lg: { dot: "h-3.5 w-3.5", cellGap: "gap-2", charGap: "gap-4" },
} as const;

export function DotMatrixNumber({
  value,
  size = "md",
  className,
  light = false,
  offStyle = "dim",
}: DotMatrixNumberProps) {
  const colors = light
    ? { on: "bg-[var(--card-light-text)]", off: "bg-[rgba(17,17,17,0.14)]" }
    : { on: "bg-[var(--white)]", off: "bg-[rgba(255,255,255,0.1)]" };
  const s = sizeMap[size];

  return (
    <div aria-label={value} className={clsx("inline-flex items-start", s.charGap, className)}>
      {value.split("").map((char, charIndex) => {
        const pattern = glyphs[char] ?? glyphs[" "];
        return (
          <div className={clsx("grid", s.cellGap)} key={`${char}-${charIndex}`}>
            {pattern.map((row, rowIndex) => (
              <div className={clsx("flex", s.cellGap)} key={`${charIndex}-${rowIndex}`}>
                {row.split("").map((cell, cellIndex) => (
                  <span
                    className={clsx(
                      "rounded-full",
                      s.dot,
                      cell === "1" ? colors.on : offStyle === "none" ? "opacity-0" : colors.off,
                    )}
                    key={`${charIndex}-${rowIndex}-${cellIndex}`}
                  />
                ))}
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}
