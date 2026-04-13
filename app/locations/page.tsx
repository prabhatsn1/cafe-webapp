import type { Metadata } from "next";
import { getContent } from "@/src/lib/content";
import SectionHeader from "@/src/components/SectionHeader";
import MotionSection from "@/src/components/MotionSection";

export async function generateMetadata(): Promise<Metadata> {
  const { seo, site } = getContent();
  return {
    title: seo.locations.title,
    description: seo.locations.description,
    openGraph: {
      title: seo.locations.title,
      description: seo.locations.description,
      images: [{ url: seo.locations.ogImage }],
      siteName: site.name,
    },
  };
}

const DAYS_ORDER = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

export default function LocationsPage() {
  const { locations } = getContent();

  return (
    <div className="pt-24 pb-20">
      <div className="bg-hero-bg px-6 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <SectionHeader
            label="Find Us"
            heading="Our Locations"
            subheading="Two locations in New York City, each with its own character and charm."
            centered
            light
          />
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 mt-16 grid gap-12 md:grid-cols-2">
        {locations.map((loc, i) => (
          <MotionSection key={loc.id} delay={i * 0.1}>
            <div className="bg-card border border-border rounded-2xl overflow-hidden">
              {/* Map */}
              <iframe
                src={loc.mapEmbedUrl}
                width="100%"
                height="220"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`Map for ${loc.name}`}
              />
              <div className="p-8">
                <h2 className="font-display text-2xl font-semibold text-card-fg mb-4">
                  {loc.name}
                </h2>
                <address className="not-italic text-sm text-muted-fg space-y-1 mb-6">
                  <p>{loc.address}</p>
                  <p>
                    {loc.city}, {loc.state} {loc.zip}
                  </p>
                  <a
                    href={`tel:${loc.phone}`}
                    className="block hover:text-primary transition-colors mt-2"
                  >
                    {loc.phone}
                  </a>
                  <a
                    href={`mailto:${loc.email}`}
                    className="block hover:text-primary transition-colors"
                  >
                    {loc.email}
                  </a>
                </address>

                <h3 className="font-semibold text-card-fg mb-3 text-sm">
                  Opening Hours
                </h3>
                <dl className="space-y-1.5 text-sm mb-6">
                  {DAYS_ORDER.map((day) => {
                    const h = loc.hours[day];
                    if (!h) return null;
                    return (
                      <div key={day} className="flex justify-between gap-4">
                        <dt className="text-muted-fg capitalize">{day}</dt>
                        <dd className="text-card-fg">
                          {h.open} – {h.close}
                        </dd>
                      </div>
                    );
                  })}
                </dl>

                {loc.features.length > 0 && (
                  <>
                    <h3 className="font-semibold text-card-fg mb-3 text-sm">
                      Features
                    </h3>
                    <ul className="flex flex-wrap gap-2">
                      {loc.features.map((f) => (
                        <li
                          key={f}
                          className="text-xs bg-muted text-muted-fg px-3 py-1.5 rounded-full"
                        >
                          {f}
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </div>
          </MotionSection>
        ))}
      </div>
    </div>
  );
}
