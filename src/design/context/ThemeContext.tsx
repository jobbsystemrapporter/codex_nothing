import { createContext, useCallback, useEffect, useState, type ReactNode } from "react";

type ThemeMode = "light" | "dark";

type ThemeContextValue = {
  mode: ThemeMode;
  isLight: boolean;
  setMode: (mode: ThemeMode) => void;
};

// eslint-disable-next-line react-refresh/only-export-components
export const ThemeContext = createContext<ThemeContextValue>({
  mode: "light",
  isLight: true,
  setMode: () => {},
});

export type { ThemeMode };

type ThemeProviderProps = {
  children: ReactNode;
};

function getInitialMode(): ThemeMode {
  if (typeof window === "undefined") return "light";
  try {
    const stored = localStorage.getItem("nothing-theme");
    if (stored === "light" || stored === "dark") return stored;
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) return "dark";
  } catch {
    // ignore (e.g. jsdom without matchMedia)
  }
  return "light";
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [mode, setModeState] = useState<ThemeMode>(getInitialMode);

  const setMode = useCallback((next: ThemeMode) => {
    setModeState(next);
    localStorage.setItem("nothing-theme", next);
  }, []);

  useEffect(() => {
    if (!window.matchMedia) return;
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e: MediaQueryListEvent) => {
      try {
        const stored = localStorage.getItem("nothing-theme");
        if (!stored) setModeState(e.matches ? "dark" : "light");
      } catch {
        // ignore
      }
    };
    media.addEventListener("change", handler);
    return () => media.removeEventListener("change", handler);
  }, []);

  const value: ThemeContextValue = {
    mode,
    isLight: mode === "light",
    setMode,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
