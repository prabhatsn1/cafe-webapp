import type { Metadata } from "next";
import { getContent } from "@/src/lib/content";
import SectionHeader from "@/src/components/SectionHeader";
import ContactForm from "@/src/components/ContactForm";
import MotionSection from "@/src/components/MotionSection";

export async function generateMetadata(): Promise<Metadata> {
  const { seo, site } = getContent();
  return {
    title: seo.contact.title,
    description: seo.contact.description,
    openGraph: {
      title: seo.contact.title,
      description: seo.contact.description,
      images: [{ url: seo.contact.ogImage }],
      siteName: site.name,
    },
  };
}

export default function ContactPage() {
  const { contact, site, locations } = getContent();
  const primaryLocation = locations[0];

  return (
    <div className="pt-24 pb-20">
      <div className="bg-hero-bg px-6 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <SectionHeader
            label="Get in Touch"
            heading="Contact Us"
            subheading="For reservations, please use our dedicated reservations page."
            centered
            light
          />
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 mt-16 grid gap-12 lg:grid-cols-[1fr_360px]">
        <MotionSection>
          <ContactForm
            enquiryTypes={contact.enquiryTypes}
            formNote={contact.formNote}
          />
        </MotionSection>

        <aside className="space-y-6">
          {locations.map((loc) => (
            <div
              key={loc.id}
              className="bg-card border border-border rounded-2xl p-6"
            >
              <h3 className="font-semibold text-card-fg mb-3">{loc.name}</h3>
              <address className="not-italic text-sm text-muted-fg space-y-1">
                <p>{loc.address}</p>
                <p>
                  {loc.city}, {loc.state} {loc.zip}
                </p>
                <a
                  href={`tel:${loc.phone}`}
                  className="block hover:text-primary transition-colors"
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
            </div>
          ))}

          {primaryLocation && (
            <div className="bg-muted rounded-2xl p-6">
              <h3 className="font-semibold text-foreground mb-4">
                Opening Hours
              </h3>
              <dl className="space-y-1.5 text-sm">
                {Object.entries(primaryLocation.hours).map(([day, h]) => (
                  <div key={day} className="flex justify-between gap-4">
                    <dt className="text-muted-fg capitalize">{day}</dt>
                    <dd className="text-foreground">
                      {h.open} – {h.close}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          )}

          <div className="bg-card border border-border rounded-2xl overflow-hidden">
            <iframe
              src={primaryLocation?.mapEmbedUrl}
              width="100%"
              height="200"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`Map for ${primaryLocation?.name}`}
              aria-label={`Map showing location of ${primaryLocation?.name}`}
            />
          </div>
        </aside>
      </div>
    </div>
  );
}
