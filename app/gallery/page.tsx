import type { Metadata } from "next";
import { getContent } from "@/src/lib/content";
import SectionHeader from "@/src/components/SectionHeader";
import GalleryGrid from "@/src/components/GalleryGrid";

export async function generateMetadata(): Promise<Metadata> {
  const { seo, site } = getContent();
  return {
    title: seo.gallery.title,
    description: seo.gallery.description,
    openGraph: {
      title: seo.gallery.title,
      description: seo.gallery.description,
      images: [{ url: seo.gallery.ogImage }],
      siteName: site.name,
    },
  };
}

export default function GalleryPage() {
  const { gallery } = getContent();

  return (
    <div className="pt-24 pb-20">
      <div className="bg-hero-bg px-6 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <SectionHeader
            label="Photography"
            heading="Gallery"
            subheading="A glimpse into our world — the food, the craft, the people."
            centered
            light
          />
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-6 mt-12">
        <GalleryGrid images={gallery} />
      </div>
    </div>
  );
}
