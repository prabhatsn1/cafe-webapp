import Image from "next/image";
import type { Review, RatingSummary } from "@/src/types/content";

interface ReviewCardProps {
  review: Review;
  featured?: boolean;
}

export function StarRating({
  rating,
  max = 5,
}: {
  rating: number;
  max?: number;
}) {
  return (
    <div
      className="flex gap-0.5"
      aria-label={`Rating: ${rating} out of ${max}`}
    >
      {Array.from({ length: max }).map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i < rating ? "text-accent" : "text-border"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function ReviewCard({
  review,
  featured = false,
}: ReviewCardProps) {
  return (
    <article
      className={`rounded-2xl p-6 border border-border ${
        featured ? "bg-card shadow-lg" : "bg-card"
      }`}
    >
      <StarRating rating={review.rating} />

      <blockquote className="mt-4 text-card-fg leading-relaxed text-sm md:text-base">
        &ldquo;{review.text}&rdquo;
      </blockquote>

      <footer className="mt-5 flex items-center gap-3">
        <div className="relative w-10 h-10 rounded-full overflow-hidden bg-muted flex-shrink-0">
          <Image
            src={review.avatar}
            alt={review.name}
            fill
            className="object-cover"
            sizes="40px"
          />
        </div>
        <div>
          <p className="text-sm font-semibold text-card-fg">{review.name}</p>
          <p className="text-xs text-muted-fg">
            {review.platform} ·{" "}
            {new Date(review.date).toLocaleDateString("en-US", {
              month: "short",
              year: "numeric",
            })}
          </p>
        </div>
      </footer>
    </article>
  );
}

export function RatingSummaryBar({ summary }: { summary: RatingSummary }) {
  const total = summary.total || 1;
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8">
      <div className="text-center">
        <p className="font-display text-6xl font-bold text-foreground">
          {summary.average.toFixed(1)}
        </p>
        <StarRating rating={Math.round(summary.average)} />
        <p className="mt-1 text-sm text-muted-fg">
          {summary.total.toLocaleString()} reviews
        </p>
      </div>
      <div className="flex-1 min-w-0 w-full">
        {[5, 4, 3, 2, 1].map((star) => {
          const count = summary.breakdown[String(star)] ?? 0;
          const pct = (count / total) * 100;
          return (
            <div key={star} className="flex items-center gap-3 mb-2">
              <span className="text-xs text-muted-fg w-3">{star}</span>
              <svg
                className="w-3 h-3 text-accent flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <div className="flex-1 bg-muted rounded-full h-2 overflow-hidden">
                <div
                  className="h-full bg-accent rounded-full transition-all duration-700"
                  style={{ width: `${pct}%` }}
                />
              </div>
              <span className="text-xs text-muted-fg w-8 text-right">
                {count}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
