import type { Metadata } from "next";
import Image from "next/image";
import { getContent } from "@/src/lib/content";
import SectionHeader from "@/src/components/SectionHeader";
import MotionSection from "@/src/components/MotionSection";

export async function generateMetadata(): Promise<Metadata> {
  const { seo, site } = getContent();
  return {
    title: seo.about.title,
    description: seo.about.description,
    openGraph: {
      title: seo.about.title,
      description: seo.about.description,
      images: [{ url: seo.about.ogImage }],
      siteName: site.name,
    },
  };
}

export default function AboutPage() {
  const { about, site } = getContent();

  return (
    <div className="pt-24 pb-20">
      {/* Header */}
      <div className="bg-hero-bg px-6 py-24">
        <div className="mx-auto max-w-4xl text-center">
          <SectionHeader
            label="Since 2004"
            heading="Our Story"
            subheading={about.story.slice(0, 160) + "…"}
            centered
            light
          />
        </div>
      </div>

      {/* Story */}
      <section className="section-padding px-6">
        <div className="mx-auto max-w-4xl">
          <MotionSection>
            <p className="text-foreground text-lg leading-relaxed">
              {about.story}
            </p>
            <blockquote className="mt-8 border-l-4 border-primary pl-6 italic text-xl text-muted-fg font-display leading-relaxed">
              &ldquo;{about.sourcingNote}&rdquo;
            </blockquote>
          </MotionSection>
        </div>
      </section>

      {/* Team */}
      <section className="section-padding bg-muted px-6">
        <div className="mx-auto max-w-7xl">
          <MotionSection>
            <SectionHeader
              label="The Team"
              heading="Meet the people behind the kitchen"
              centered
            />
          </MotionSection>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {about.chefs.map((chef, i) => (
              <MotionSection key={chef.id} delay={i * 0.1}>
                <div className="bg-card rounded-2xl overflow-hidden border border-border">
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src={chef.image}
                      alt={chef.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-xl font-semibold text-card-fg">
                      {chef.name}
                    </h3>
                    <p className="text-sm text-primary font-medium mt-0.5 mb-3">
                      {chef.title}
                    </p>
                    <p className="text-sm text-muted-fg leading-relaxed">
                      {chef.bio}
                    </p>
                    <p className="mt-3 text-xs text-muted-fg">
                      From {chef.origin}
                    </p>
                  </div>
                </div>
              </MotionSection>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding px-6">
        <div className="mx-auto max-w-4xl">
          <MotionSection>
            <SectionHeader
              label="Our Journey"
              heading={`20 Years of ${site.name}`}
              centered
            />
          </MotionSection>
          <div className="mt-12 relative">
            <div
              className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border"
              aria-hidden
            />
            {about.timeline.map((entry, i) => (
              <MotionSection key={entry.year} delay={i * 0.07}>
                <div
                  className={`relative flex gap-8 mb-10 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                >
                  <div className="flex-1 md:text-right hidden md:block">
                    {i % 2 === 0 && (
                      <div className="bg-card border border-border rounded-xl p-5">
                        <p className="font-display text-primary text-2xl font-bold">
                          {entry.year}
                        </p>
                        <p className="text-sm text-muted-fg mt-1">
                          {entry.event}
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary border-4 border-background flex items-center justify-center relative z-10 ml-0 md:ml-0"></div>
                  <div className="flex-1">
                    <div className="md:hidden bg-card border border-border rounded-xl p-5">
                      <p className="font-display text-primary text-2xl font-bold">
                        {entry.year}
                      </p>
                      <p className="text-sm text-muted-fg mt-1">
                        {entry.event}
                      </p>
                    </div>
                    {i % 2 !== 0 && (
                      <div className="hidden md:block bg-card border border-border rounded-xl p-5">
                        <p className="font-display text-primary text-2xl font-bold">
                          {entry.year}
                        </p>
                        <p className="text-sm text-muted-fg mt-1">
                          {entry.event}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </MotionSection>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
