import { X } from "lucide-react";
import { useWidgetSettings } from "../hooks/useWidgetSettings";

export function WidgetSettingsPanel({ onClose }: { onClose: () => void }) {
  const { settings, update, reset } = useWidgetSettings();

  return (
    <div className="absolute inset-0 z-[300] flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="w-full max-w-sm rounded-[var(--radius-lg)] bg-[var(--surface-2)] p-6 ring-1 ring-[var(--border)] shadow-[0_24px_48px_rgba(0,0,0,0.5)]">
        <div className="mb-6 flex items-center justify-between">
          <span className="text-[13px] font-medium uppercase tracking-[0.1em]">Widget Settings</span>
          <button
            onClick={onClose}
            className="flex h-7 w-7 items-center justify-center rounded-full text-[var(--text-muted)] transition-colors hover:bg-[var(--surface-3)]"
          >
            <X className="h-4 w-4" strokeWidth={1.5} />
          </button>
        </div>

        <div className="flex flex-col gap-5">
          {/* Opacity */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-[12px] uppercase tracking-[0.08em] text-[var(--text-muted)]">Opacity</span>
              <span className="text-[12px] tabular-nums text-[var(--text)]">{Math.round(settings.opacity * 100)}%</span>
            </div>
            <input
              type="range"
              min={30}
              max={100}
              value={Math.round(settings.opacity * 100)}
              onChange={(e) => update({ opacity: Number(e.target.value) / 100 })}
              className="h-1 w-full cursor-pointer appearance-none rounded-full bg-[var(--surface-3)] accent-[var(--danger)]"
            />
          </div>

          {/* Toggles */}
          <div className="flex flex-col gap-3">
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-[12px] uppercase tracking-[0.08em] text-[var(--text-muted)]">Show Border</span>
              <button
                onClick={() => update({ showBorder: !settings.showBorder })}
                className={`relative h-6 w-10 rounded-full transition-colors ${
                  settings.showBorder ? "bg-[var(--danger)]" : "bg-[rgba(255,255,255,0.14)]"
                }`}
              >
                <span
                  className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
                    settings.showBorder ? "left-0.5 translate-x-4" : "left-0.5"
                  }`}
                />
              </button>
            </label>

            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-[12px] uppercase tracking-[0.08em] text-[var(--text-muted)]">Show Shadow</span>
              <button
                onClick={() => update({ showShadow: !settings.showShadow })}
                className={`relative h-6 w-10 rounded-full transition-colors ${
                  settings.showShadow ? "bg-[var(--danger)]" : "bg-[rgba(255,255,255,0.14)]"
                }`}
              >
                <span
                  className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
                    settings.showShadow ? "left-0.5 translate-x-4" : "left-0.5"
                  }`}
                />
              </button>
            </label>

            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-[12px] uppercase tracking-[0.08em] text-[var(--text-muted)]">Glass Effect</span>
              <button
                onClick={() => update({ glassEffect: !settings.glassEffect })}
                className={`relative h-6 w-10 rounded-full transition-colors ${
                  settings.glassEffect ? "bg-[var(--danger)]" : "bg-[rgba(255,255,255,0.14)]"
                }`}
              >
                <span
                  className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
                    settings.glassEffect ? "left-0.5 translate-x-4" : "left-0.5"
                  }`}
                />
              </button>
            </label>
          </div>

          {/* Reset */}
          <button
            onClick={reset}
            className="mt-2 w-full rounded-full py-2.5 text-[11px] font-medium uppercase tracking-[0.08em] ring-1 ring-[var(--border)] text-[var(--text-muted)] transition-colors hover:bg-[var(--surface-3)] hover:text-[var(--text)]"
          >
            Reset to Default
          </button>
        </div>
      </div>
    </div>
  );
}
