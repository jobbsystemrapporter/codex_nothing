import { useTheme } from "./useTheme";

export function useWidgetTheme(explicitLight?: boolean): boolean {
  const theme = useTheme();
  return explicitLight !== undefined ? explicitLight : theme.isLight;
}
