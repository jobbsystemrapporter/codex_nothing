import { createContext, useContext, type ReactNode } from "react";

type ThemeMode = "light" | "dark";

type ThemeContextValue = {
  mode: ThemeMode;
  isLight: boolean;
};

export const ThemeContext = createContext<ThemeContextValue>({
  mode: "light",
  isLight: true,
});

export function useTheme() {
  return useContext(ThemeContext);
}

type ThemeProviderProps = {
  mode: ThemeMode;
  children: ReactNode;
};

export function ThemeProvider({ mode, children }: ThemeProviderProps) {
  const value = {
    mode,
    isLight: mode === "light",
  };
  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}