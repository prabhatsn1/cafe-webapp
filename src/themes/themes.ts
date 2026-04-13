export type ThemeName =
  | "italian_trattoria"
  | "japanese_izakaya"
  | "french_patisserie";

export interface ThemeConfig {
  name: string;
  description: string;
  googleFontQuery: string;
}

export const THEMES: Record<ThemeName, ThemeConfig> = {
  italian_trattoria: {
    name: "Italian Trattoria",
    description: "Warm terracotta tones, earthy textures, serif elegance",
    googleFontQuery:
      "Playfair+Display:wght@400;600;700&family=Lato:wght@300;400;700",
  },
  japanese_izakaya: {
    name: "Japanese Izakaya",
    description: "Deep indigo nights, warm wood, minimal refinement",
    googleFontQuery:
      "Noto+Serif+JP:wght@400;700&family=Noto+Sans+JP:wght@300;400;700",
  },
  french_patisserie: {
    name: "French Patisserie",
    description: "Soft roses, gold accents, Art Deco sophistication",
    googleFontQuery:
      "Cormorant+Garamond:wght@400;600;700&family=Raleway:wght@300;400;600",
  },
};

export const DEFAULT_THEME: ThemeName = "italian_trattoria";

export function getThemeName(): ThemeName {
  const envTheme = process.env.NEXT_PUBLIC_THEME;
  if (envTheme && envTheme in THEMES) {
    return envTheme as ThemeName;
  }
  return DEFAULT_THEME;
}

export function getThemeConfig(): ThemeConfig {
  return THEMES[getThemeName()];
}
