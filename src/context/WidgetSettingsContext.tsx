import { useState, useEffect, type ReactNode } from "react";
import { WidgetSettingsContext } from "./WidgetSettingsContextValue";

export type WidgetSettings = {
  opacity: number; // 0.3 – 1.0
  showBorder: boolean;
  showShadow: boolean;
  glassEffect: boolean;
};

export function WidgetSettingsProvider({ children }: { children: ReactNode }) {
  const defaultSettings: WidgetSettings = { opacity: 1, showBorder: true, showShadow: true, glassEffect: false };

  const [settings, setSettings] = useState<WidgetSettings>(() => {
    try {
      const raw = localStorage.getItem("nothing-widget-settings");
      if (raw) return { ...defaultSettings, ...JSON.parse(raw) };
    } catch {
      // ignore
    }
    return { ...defaultSettings };
  });

  useEffect(() => {
    localStorage.setItem("nothing-widget-settings", JSON.stringify(settings));
  }, [settings]);

  const update = (patch: Partial<WidgetSettings>) =>
    setSettings((prev) => ({ ...prev, ...patch }));

  const reset = () => setSettings({ ...defaultSettings });

  return (
    <WidgetSettingsContext.Provider value={{ settings, update, reset }}>
      {children}
    </WidgetSettingsContext.Provider>
  );
}
