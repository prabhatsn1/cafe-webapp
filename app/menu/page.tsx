import type { Metadata } from "next";
import { getContent } from "@/src/lib/content";
import MenuGrid from "@/src/components/MenuGrid";
import SectionHeader from "@/src/components/SectionHeader";

export async function generateMetadata(): Promise<Metadata> {
  const { seo, site } = getContent();
  return {
    title: seo.menu.title,
    description: seo.menu.description,
    openGraph: {
      title: seo.menu.title,
      description: seo.menu.description,
      images: [{ url: seo.menu.ogImage }],
      siteName: site.name,
    },
  };
}

export default function MenuPage() {
  const { menu, site } = getContent();

  return (
    <div className="pt-24 pb-20">
      {/* Header */}
      <div className="bg-hero-bg px-6 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <SectionHeader
            label={site.name}
            heading="Our Menu"
            subheading="All pastas are made daily in-house. Please inform your server of any dietary requirements."
            centered
            light
          />
        </div>
      </div>

      {/* Menu grid with filters */}
      <div className="mx-auto max-w-7xl px-6 mt-12">
        <MenuGrid categories={menu.categories} />
      </div>
    </div>
  );
}
