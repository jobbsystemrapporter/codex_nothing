type ProgressDotsProps = {
  total?: number;
  active: number;
  light?: boolean;
};

export function ProgressDots({
  total = 10,
  active,
  light = false,
}: ProgressDotsProps) {
  return (
    <div className="flex items-center gap-1.5">
      {Array.from({ length: total }).map((_, i) => {
        const on = i < active;
        return (
          <span
            key={i}
            className="h-2.5 w-2.5 rounded-full"
            style={{
              backgroundColor: on
                ? light
                  ? "#111111"
                  : "#F5F5F5"
                : light
                ? "rgba(17,17,17,0.18)"
                : "rgba(255,255,255,0.18)",
            }}
          />
        );
      })}
    </div>
  );
}
