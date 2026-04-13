import type { Metadata } from "next";
import { getContent } from "@/src/lib/content";
import SectionHeader from "@/src/components/SectionHeader";
import MotionSection from "@/src/components/MotionSection";
import ReviewCard, { RatingSummaryBar } from "@/src/components/ReviewCard";

export async function generateMetadata(): Promise<Metadata> {
  const { seo, site } = getContent();
  return {
    title: seo.reviews.title,
    description: seo.reviews.description,
    openGraph: {
      title: seo.reviews.title,
      description: seo.reviews.description,
      images: [{ url: seo.reviews.ogImage }],
      siteName: site.name,
    },
  };
}

export default function ReviewsPage() {
  const { reviews, ratingSummary } = getContent();

  return (
    <div className="pt-24 pb-20">
      <div className="bg-hero-bg px-6 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <SectionHeader
            label="Guest Voices"
            heading="What People Say"
            centered
            light
          />
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-6 mt-16">
        <MotionSection>
          <RatingSummaryBar summary={ratingSummary} />
        </MotionSection>
      </div>

      <div className="mx-auto max-w-7xl px-6 mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {reviews.map((review, i) => (
          <MotionSection key={review.id} delay={i * 0.07}>
            <ReviewCard review={review} />
          </MotionSection>
        ))}
      </div>
    </div>
  );
}
