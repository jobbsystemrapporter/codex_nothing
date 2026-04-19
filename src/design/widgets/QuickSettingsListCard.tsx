import { Label } from "../primitives/Label";
import { Tile } from "../primitives/Tile";

type QuickSetting = {
  id?: string;
  name: string;
  meta: string;
  enabled: boolean;
};

type QuickSettingsListCardProps = {
  items: QuickSetting[];
  light?: boolean;
  onToggle?: (id: string, next: boolean) => void;
};

export function QuickSettingsListCard({
  items,
  light = true,
  onToggle,
}: QuickSettingsListCardProps) {
  const muted = light ? "text-[rgba(17,17,17,0.58)]" : "text-[var(--text-muted)]";

  return (
    <Tile light={light} className="min-h-[220px] p-5">
      <Label className={light ? "text-[rgba(17,17,17,0.62)]" : ""}>QUICK SETTINGS</Label>
      <div className="mt-4 grid gap-0">
        {items.map((item, index) => (
          <button
            className={`grid w-full grid-cols-[1fr_auto_auto] items-center gap-3 py-3 text-left ${
              index < items.length - 1 ? "border-b border-[var(--border)]" : ""
            } ${onToggle ? "cursor-pointer" : "cursor-default"}`}
            key={item.id ?? item.name}
            onClick={() => onToggle?.(item.id ?? item.name, !item.enabled)}
            type="button"
          >
            <p className="text-[30px] leading-[0.95] tracking-[-0.02em]">{item.name}</p>
            <p className={`text-[12px] uppercase tracking-[0.1em] ${muted}`}>{item.meta}</p>
            <span
              aria-checked={item.enabled}
              className="relative h-7 w-12 rounded-full border border-[var(--border)]"
              role="switch"
              style={{
                backgroundColor: item.enabled
                  ? "#f97316"
                  : light
                    ? "rgba(17,17,17,0.1)"
                    : "rgba(245,245,245,0.1)",
              }}
            >
              <span
                className="absolute top-1/2 h-5 w-5 -translate-y-1/2 rounded-full bg-[var(--white)] transition-all"
                style={{ left: item.enabled ? "22px" : "2px" }}
              />
            </span>
          </button>
        ))}
      </div>
    </Tile>
  );
}
