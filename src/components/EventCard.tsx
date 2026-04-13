import Image from "next/image";
import Link from "next/link";
import type { Event } from "@/src/types/content";

interface EventCardProps {
  event: Event;
}

export default function EventCard({ event }: EventCardProps) {
  const eventDate = new Date(`${event.date}T${event.time}`);
  const formatted = eventDate.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <article className="group rounded-2xl overflow-hidden border border-border bg-card flex flex-col">
      <div className="relative aspect-[16/9] overflow-hidden">
        <Image
          src={event.image}
          alt={event.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {event.price !== null && (
          <div className="absolute top-4 right-4 bg-primary text-primary-fg text-sm font-semibold px-3 py-1.5 rounded-full">
            ₹{event.price}
            {event.price > 0 ? " / person" : ""}
          </div>
        )}
        {event.price === null && (
          <div className="absolute top-4 right-4 bg-accent text-accent-fg text-sm font-semibold px-3 py-1.5 rounded-full">
            Free entry
          </div>
        )}
      </div>

      <div className="flex flex-col flex-1 p-6">
        <div className="flex flex-wrap gap-2 mb-3">
          {event.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs font-medium px-2.5 py-1 rounded-full bg-muted text-muted-fg"
            >
              {tag}
            </span>
          ))}
        </div>

        <h3 className="font-display text-xl font-semibold text-card-fg mb-2 leading-snug group-hover:text-primary transition-colors">
          {event.title}
        </h3>

        <p className="text-sm text-muted-fg mb-1">
          {formatted} at {event.time}
        </p>
        {event.seats !== null && (
          <p className="text-sm text-muted-fg mb-4">
            {event.seats} seats available
          </p>
        )}

        <p className="text-sm text-card-fg/80 leading-relaxed flex-1 mb-6">
          {event.description}
        </p>

        <Link
          href={event.bookingLink}
          className="mt-auto inline-flex items-center justify-center gap-2 rounded-full border-2 border-primary text-primary px-5 py-2.5 text-sm font-semibold transition-all hover:bg-primary hover:text-primary-fg focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring"
        >
          Book this event
        </Link>
      </div>
    </article>
  );
}
