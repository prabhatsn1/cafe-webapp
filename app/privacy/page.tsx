import type { Metadata } from "next";
import { getContent } from "@/src/lib/content";
import SectionHeader from "@/src/components/SectionHeader";

export async function generateMetadata(): Promise<Metadata> {
  const { seo, site } = getContent();
  return {
    title: seo.privacy.title,
    description: seo.privacy.description,
    openGraph: { title: seo.privacy.title, siteName: site.name },
  };
}

export default function PrivacyPage() {
  const { privacy, site } = getContent();

  return (
    <div className="pt-24 pb-20">
      <div className="bg-hero-bg px-6 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <SectionHeader
            label={site.name}
            heading="Privacy Policy"
            centered
            light
          />
          <p className="mt-4 text-hero-fg/60 text-sm">
            Last updated:{" "}
            {new Date(privacy.lastUpdated).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-6 mt-16 prose prose-neutral max-w-none">
        {privacy.sections.map((section) => (
          <section key={section.title} className="mb-10">
            <h2 className="font-display text-xl font-semibold text-foreground mb-3">
              {section.title}
            </h2>
            <p className="text-muted-fg leading-relaxed">{section.body}</p>
          </section>
        ))}
      </div>
    </div>
  );
}
