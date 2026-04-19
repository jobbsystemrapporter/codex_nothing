import clsx from "clsx";

type WeatherDotsVariant = "location" | "sunny" | "showers" | "clear" | "cloudy";

const patterns: Record<WeatherDotsVariant, string[]> = {
  location: [
    "000111000",
    "001000100",
    "010000010",
    "010000010",
    "010000010",
    "001000100",
    "000111000",
    "000010000",
    "000010000",
  ],
  sunny: [
    "010000010",
    "000010000",
    "001111100",
    "011111110",
    "001111100",
    "000010000",
    "010000010",
    "000000000",
    "000000000",
  ],
  showers: [
    "000111100",
    "001111110",
    "011111111",
    "111111110",
    "011111100",
    "000000000",
    "001001001",
    "000100100",
    "010001000",
  ],
  clear: [
    "000111000",
    "001000100",
    "010000000",
    "010000000",
    "010000000",
    "001000100",
    "000111100",
    "000001010",
    "000000101",
  ],
  cloudy: [
    "000011100",
    "000111110",
    "001111111",
    "011111111",
    "111111110",
    "011111100",
    "000000000",
    "000000000",
    "000000000",
  ],
};

type WeatherDotsIconProps = {
  variant: WeatherDotsVariant;
  className?: string;
  light?: boolean;
  size?: "sm" | "md" | "lg";
};

const sizeMap = {
  sm: { dot: "h-1.5 w-1.5", gap: "gap-1" },
  md: { dot: "h-2.5 w-2.5", gap: "gap-1.5" },
  lg: { dot: "h-3 w-3", gap: "gap-1.5" },
} as const;

export function WeatherDotsIcon({
  variant,
  className,
  light = false,
  size = "md",
}: WeatherDotsIconProps) {
  const pattern = patterns[variant];
  const on = light ? "bg-[var(--card-light-text)]" : "bg-[var(--white)]";
  const off = light ? "bg-[rgba(17,17,17,0.08)]" : "bg-[rgba(255,255,255,0.06)]";
  const s = sizeMap[size];

  return (
    <div className={clsx("inline-grid", s.gap, className)}>
      {pattern.map((row, rowIndex) => (
        <div className={clsx("flex", s.gap)} key={rowIndex}>
          {row.split("").map((cell, cellIndex) => (
            <span
              className={clsx("rounded-full", s.dot, cell === "1" ? on : off)}
              key={`${rowIndex}-${cellIndex}`}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export type { WeatherDotsVariant };
