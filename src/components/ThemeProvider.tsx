"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import { THEMES, DEFAULT_THEME, type ThemeName } from "@/src/themes/themes";

const STORAGE_KEY = "cafe-theme";

interface ThemeContextValue {
  theme: ThemeName;
  setTheme: (theme: ThemeName) => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: DEFAULT_THEME,
  setTheme: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

function applyTheme(theme: ThemeName) {
  const root = document.documentElement;
  root.setAttribute("data-theme", theme);

  // Swap Google Fonts link
  const fontQuery = THEMES[theme].googleFontQuery;
  const href = `https://fonts.googleapis.com/css2?family=${fontQuery}&display=swap`;
  let link = document.getElementById(
    "theme-font-link",
  ) as HTMLLinkElement | null;
  if (!link) {
    link = document.createElement("link");
    link.id = "theme-font-link";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }
  link.href = href;
}

export function ThemeProvider({
  initialTheme,
  children,
}: {
  initialTheme: ThemeName;
  children: ReactNode;
}) {
  const [theme, setThemeState] = useState<ThemeName>(initialTheme);

  // On mount, restore theme from localStorage if available
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as ThemeName | null;
    if (stored && stored in THEMES && stored !== initialTheme) {
      setThemeState(stored);
      applyTheme(stored);
    }
  }, [initialTheme]);

  const setTheme = useCallback((next: ThemeName) => {
    setThemeState(next);
    localStorage.setItem(STORAGE_KEY, next);
    applyTheme(next);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
