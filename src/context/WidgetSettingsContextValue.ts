import { createContext } from "react";
import type { WidgetSettings } from "./WidgetSettingsContext";

export type WidgetSettingsContextValue = {
  settings: WidgetSettings;
  update: (patch: Partial<WidgetSettings>) => void;
  reset: () => void;
};

export const WidgetSettingsContext = createContext<WidgetSettingsContextValue>({
  settings: { opacity: 1, showBorder: true, showShadow: true, glassEffect: false },
  update: () => {},
  reset: () => {},
});
