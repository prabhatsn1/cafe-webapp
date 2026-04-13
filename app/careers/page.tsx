import type { Metadata } from "next";
import { getContent } from "@/src/lib/content";
import SectionHeader from "@/src/components/SectionHeader";
import MotionSection from "@/src/components/MotionSection";

export async function generateMetadata(): Promise<Metadata> {
  const { seo, site } = getContent();
  return {
    title: seo.careers.title,
    description: seo.careers.description,
    openGraph: {
      title: seo.careers.title,
      description: seo.careers.description,
      images: [{ url: seo.careers.ogImage }],
      siteName: site.name,
    },
  };
}

export default function CareersPage() {
  const { careers, site } = getContent();

  return (
    <div className="pt-24 pb-20">
      <div className="bg-hero-bg px-6 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <SectionHeader
            label="Join the Team"
            heading={`Work at ${site.name}`}
            subheading="We hire people who are passionate about food, hospitality, and making every guest feel at home."
            centered
            light
          />
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-6 mt-16 space-y-8">
        {careers.map((job, i) => (
          <MotionSection key={job.id} delay={i * 0.07}>
            <article className="bg-card border border-border rounded-2xl p-8">
              <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                <div>
                  <h2 className="font-display text-2xl font-semibold text-card-fg">
                    {job.title}
                  </h2>
                  <div className="flex gap-3 mt-1.5 flex-wrap">
                    <span className="text-xs font-medium bg-primary/10 text-primary px-2.5 py-1 rounded-full">
                      {job.type}
                    </span>
                    <span className="text-xs text-muted-fg">
                      {job.location}
                    </span>
                  </div>
                </div>
                <a
                  href={`mailto:careers@labellavita.com?subject=Application: ${job.title}`}
                  className="flex-shrink-0 rounded-full bg-primary text-primary-fg px-6 py-2.5 text-sm font-semibold transition-all hover:opacity-90"
                >
                  Apply now
                </a>
              </div>
              <p className="text-muted-fg leading-relaxed mb-6">
                {job.description}
              </p>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h3 className="font-semibold text-card-fg text-sm mb-3">
                    Requirements
                  </h3>
                  <ul className="space-y-2">
                    {job.requirements.map((req) => (
                      <li
                        key={req}
                        className="flex gap-2 text-sm text-muted-fg"
                      >
                        <span className="text-primary mt-0.5">•</span> {req}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-card-fg text-sm mb-3">
                    Benefits
                  </h3>
                  <ul className="space-y-2">
                    {job.benefits.map((benefit) => (
                      <li
                        key={benefit}
                        className="flex gap-2 text-sm text-muted-fg"
                      >
                        <span className="text-accent mt-0.5">✓</span> {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          </MotionSection>
        ))}
      </div>

      <div className="mx-auto max-w-4xl px-6 mt-16 text-center">
        <p className="text-muted-fg">
          Don&apos;t see the right role?{" "}
          <a
            href="mailto:careers@labellavita.com"
            className="text-primary font-medium hover:underline"
          >
            Send us your CV
          </a>{" "}
          and we&apos;ll keep you in mind for future openings.
        </p>
      </div>
    </div>
  );
}
