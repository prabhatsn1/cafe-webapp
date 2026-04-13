import type { Metadata } from "next";
import Link from "next/link";
import { getContent } from "@/src/lib/content";
import SectionHeader from "@/src/components/SectionHeader";
import MotionSection from "@/src/components/MotionSection";
import EventCard from "@/src/components/EventCard";

export async function generateMetadata(): Promise<Metadata> {
  const { seo, site } = getContent();
  return {
    title: seo.events.title,
    description: seo.events.description,
    openGraph: {
      title: seo.events.title,
      description: seo.events.description,
      images: [{ url: seo.events.ogImage }],
      siteName: site.name,
    },
  };
}

export default function EventsPage() {
  const { events, catering } = getContent();

  return (
    <div className="pt-24 pb-20">
      {/* Header */}
      <div className="bg-hero-bg px-6 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <SectionHeader
            label="Gather & Celebrate"
            heading="Events & Catering"
            subheading="From intimate masterclasses to grand celebrations — we do it all."
            centered
            light
          />
        </div>
      </div>

      {/* Events */}
      <section className="section-padding px-6">
        <div className="mx-auto max-w-7xl">
          <MotionSection>
            <SectionHeader label="Upcoming" heading="Events" />
          </MotionSection>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-2">
            {events.map((event, i) => (
              <MotionSection key={event.id} delay={i * 0.08}>
                <EventCard event={event} />
              </MotionSection>
            ))}
          </div>
        </div>
      </section>

      {/* Catering */}
      <section className="section-padding bg-muted px-6">
        <div className="mx-auto max-w-7xl">
          <MotionSection>
            <SectionHeader
              label="Catering"
              heading="Bring La Bella Vita to You"
              subheading={catering.intro}
            />
          </MotionSection>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {catering.packages.map((pkg, i) => (
              <MotionSection key={pkg.id} delay={i * 0.1}>
                <div
                  className={`rounded-2xl border p-8 flex flex-col h-full ${i === 1 ? "bg-primary text-primary-fg border-primary" : "bg-card border-border"}`}
                >
                  <p
                    className={`text-xs font-semibold uppercase tracking-widest mb-2 ${i === 1 ? "text-primary-fg/70" : "text-primary"}`}
                  >
                    {pkg.tagline}
                  </p>
                  <h3
                    className={`font-display text-2xl font-bold mb-1 ${i === 1 ? "text-primary-fg" : "text-card-fg"}`}
                  >
                    {pkg.name}
                  </h3>
                  <p
                    className={`text-sm mb-1 ${i === 1 ? "text-primary-fg/80" : "text-muted-fg"}`}
                  >
                    {pkg.guests} guests
                  </p>
                  <p
                    className={`text-3xl font-bold font-display my-4 ${i === 1 ? "text-primary-fg" : "text-foreground"}`}
                  >
                    ₹{pkg.price}
                    <span
                      className={`text-base font-normal ml-1 ${i === 1 ? "text-primary-fg/70" : "text-muted-fg"}`}
                    >
                      {pkg.priceUnit}
                    </span>
                  </p>
                  <ul className="space-y-2.5 flex-1 mb-8">
                    {pkg.includes.map((item) => (
                      <li
                        key={item}
                        className={`flex gap-2 text-sm ${i === 1 ? "text-primary-fg/90" : "text-muted-fg"}`}
                      >
                        <span
                          className={
                            i === 1 ? "text-primary-fg" : "text-primary"
                          }
                        >
                          ✓
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/contact"
                    className={`mt-auto text-center py-3 rounded-full font-semibold text-sm transition-all ${i === 1 ? "bg-primary-fg text-primary hover:opacity-90" : "border-2 border-primary text-primary hover:bg-primary hover:text-primary-fg"}`}
                  >
                    Enquire now
                  </Link>
                </div>
              </MotionSection>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
