import type { Metadata } from "next";
import { getContent } from "@/src/lib/content";
import SectionHeader from "@/src/components/SectionHeader";
import FaqAccordion from "@/src/components/FaqAccordion";

export async function generateMetadata(): Promise<Metadata> {
  const { seo, site } = getContent();
  return {
    title: seo.faq.title,
    description: seo.faq.description,
    openGraph: {
      title: seo.faq.title,
      description: seo.faq.description,
      images: [{ url: seo.faq.ogImage }],
      siteName: site.name,
    },
  };
}

export default function FaqPage() {
  const { faq, site } = getContent();

  return (
    <div className="pt-24 pb-20">
      <div className="bg-hero-bg px-6 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <SectionHeader
            label="Answers"
            heading="Frequently Asked Questions"
            centered
            light
          />
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-6 mt-16">
        <FaqAccordion items={faq} />

        <div className="mt-16 bg-muted rounded-2xl p-8 text-center">
          <p className="font-semibold text-foreground mb-2">
            Still have questions?
          </p>
          <p className="text-sm text-muted-fg mb-6">
            Our team is happy to help — reach out by phone or email.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-fg px-8 py-3 font-semibold transition-all hover:opacity-90"
          >
            Contact us
          </a>
        </div>
      </div>
    </div>
  );
}
