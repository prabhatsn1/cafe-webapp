import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { getContent } from "@/src/lib/content";
import { getThemeName, getThemeConfig } from "@/src/themes/themes";
import Navbar from "@/src/components/Navbar";
import Footer from "@/src/components/Footer";
import { ThemeProvider } from "@/src/components/ThemeProvider";

const theme = getThemeName();
const themeConfig = getThemeConfig();
const content = getContent();

export const metadata: Metadata = {
  title: {
    default: content.seo.home.title,
    template: `%s | ${content.site.name}`,
  },
  description: content.site.description,
  openGraph: {
    siteName: content.site.name,
    type: "website",
  },
};

const GOOGLE_FONTS_URL = `https://fonts.googleapis.com/css2?family=${themeConfig.googleFontQuery}&display=swap`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { navigation, site, socials, locations } = content;

  return (
    <html
      lang="en"
      data-theme={theme}
      data-scroll-behavior="smooth"
      className="h-full"
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link href={GOOGLE_FONTS_URL} rel="stylesheet" />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <ThemeProvider initialTheme={theme}>
          <Navbar
            links={navigation.links}
            cta={navigation.cta}
            siteName={site.name}
          />
          <main className="flex-1">{children}</main>
          <Footer
            siteName={site.name}
            tagline={site.tagline}
            links={navigation.links}
            socials={socials}
            locations={locations}
            email={site.email}
            phone={site.phone}
          />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
