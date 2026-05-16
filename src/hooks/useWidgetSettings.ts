import { useContext } from "react";
import { WidgetSettingsContext } from "../context/WidgetSettingsContextValue";

export function useWidgetSettings() {
  return useContext(WidgetSettingsContext);
}
