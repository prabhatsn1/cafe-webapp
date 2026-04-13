import type { Metadata } from "next";
import { getContent } from "@/src/lib/content";
import BookingForm from "@/src/components/BookingForm";
import SectionHeader from "@/src/components/SectionHeader";

export async function generateMetadata(): Promise<Metadata> {
  const { seo, site } = getContent();
  return {
    title: seo.reservations.title,
    description: seo.reservations.description,
    openGraph: {
      title: seo.reservations.title,
      description: seo.reservations.description,
      images: [{ url: seo.reservations.ogImage }],
      siteName: site.name,
    },
  };
}

export default function ReservationsPage() {
  const { bookingConfig, locations, site } = getContent();
  const primaryLocation = locations[0];

  return (
    <div className="pt-24 pb-20">
      {/* Header */}
      <div className="bg-hero-bg px-6 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <SectionHeader
            label="We'd love to host you"
            heading="Reserve a Table"
            subheading={`Book online or call us at ${site.phone}. We look forward to welcoming you.`}
            centered
            light
          />
        </div>
      </div>

      {/* Form + info */}
      <div className="mx-auto max-w-6xl px-6 mt-16 grid gap-12 lg:grid-cols-[1fr_380px]">
        {/* Form */}
        <div className="bg-card rounded-2xl border border-border p-8 md:p-10">
          <h2 className="font-display text-2xl font-semibold text-card-fg mb-2">
            Make a reservation
          </h2>
          <p className="text-sm text-muted-fg mb-8">
            Fields marked{" "}
            <span className="text-primary" aria-hidden>
              *
            </span>{" "}
            are required.
          </p>
          <BookingForm config={bookingConfig} />
        </div>

        {/* Side info */}
        <aside className="space-y-6">
          <div className="bg-muted rounded-2xl p-6">
            <h3 className="font-semibold text-foreground mb-4">Good to know</h3>
            <ul className="space-y-3 text-sm text-muted-fg">
              <li className="flex gap-2">
                <span className="text-primary mt-0.5">✓</span>
                Reservations can be made up to 90 days in advance.
              </li>
              <li className="flex gap-2">
                <span className="text-primary mt-0.5">✓</span>
                We hold tables for 15 minutes past reservation time.
              </li>
              <li className="flex gap-2">
                <span className="text-primary mt-0.5">✓</span>
                For parties over {bookingConfig.maxGuests}, please contact us
                directly.
              </li>
              <li className="flex gap-2">
                <span className="text-primary mt-0.5">✓</span>
                24-hour cancellation policy applies.
              </li>
            </ul>
          </div>

          {primaryLocation && (
            <div className="bg-card rounded-2xl border border-border p-6">
              <h3 className="font-semibold text-card-fg mb-4">
                Hours — {primaryLocation.name}
              </h3>
              <dl className="space-y-2 text-sm">
                {Object.entries(primaryLocation.hours).map(([day, hours]) => (
                  <div key={day} className="flex justify-between">
                    <dt className="text-muted-fg capitalize">{day}</dt>
                    <dd className="text-card-fg">
                      {hours.open} – {hours.close}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          )}

          <div className="bg-card rounded-2xl border border-border p-6">
            <h3 className="font-semibold text-card-fg mb-2">
              Phone reservations
            </h3>
            <a
              href={`tel:${site.phone}`}
              className="text-primary font-semibold hover:underline"
            >
              {site.phone}
            </a>
            <p className="text-sm text-muted-fg mt-1">
              Available during opening hours.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
