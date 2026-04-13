"use client";

import { THEMES, type ThemeName } from "@/src/themes/themes";
import { useTheme } from "@/src/components/ThemeProvider";

const THEME_KEYS = Object.keys(THEMES) as ThemeName[];

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-hero-fg/40 uppercase tracking-widest hidden sm:inline">
        Theme
      </span>
      <div className="flex gap-1">
        {THEME_KEYS.map((key) => (
          <button
            key={key}
            onClick={() => setTheme(key)}
            title={THEMES[key].name}
            aria-label={`Switch to ${THEMES[key].name} theme`}
            aria-pressed={theme === key}
            className={`px-2 py-1 rounded text-xs transition-colors cursor-pointer ${
              theme === key
                ? "bg-accent text-accent-fg"
                : "text-hero-fg/40 hover:text-hero-fg/70"
            }`}
          >
            {THEMES[key].name.split(" ")[0]}
          </button>
        ))}
      </div>
    </div>
  );
}
