import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { getContent, getFeaturedItems } from "@/src/lib/content";
import ReviewCard from "@/src/components/ReviewCard";
import MotionSection from "@/src/components/MotionSection";
import SectionHeader from "@/src/components/SectionHeader";
import MarqueeStrip from "@/src/components/MarqueeStrip";

export async function generateMetadata(): Promise<Metadata> {
  const { seo, site } = getContent();
  return {
    title: seo.home.title,
    description: seo.home.description,
    keywords: seo.home.keywords,
    openGraph: {
      title: seo.home.title,
      description: seo.home.description,
      images: [{ url: seo.home.ogImage }],
      siteName: site.name,
    },
    twitter: { card: "summary_large_image", title: seo.home.title },
  };
}

const PILLARS = [
  {
    num: "01",
    title: "The Coffee",
    desc: "Every cup starts with single-origin beans, roasted in small batches and pulled to perfection by hand.",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h13a2 2 0 0 1 0 4H3v-4zm13 4a4 4 0 1 0 0-4" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 14v3a3 3 0 0 0 3 3h2a3 3 0 0 0 3-3v-3" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "The Food",
    desc: "Seasonal ingredients from local farms, transformed into dishes that are honest, soulful, and memorable.",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h8M12 8v8" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "The Vibe",
    desc: "Warm lighting, unhurried service, and just the right playlist — your neighbourhood corner, elevated.",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m8.66-9h-1M4.34 12h-1m15-6.36-.71.71M5.36 18.36l-.71.71m12.73 0-.71-.71M5.36 5.64l-.71-.71M12 7a5 5 0 1 0 0 10A5 5 0 0 0 12 7z" />
      </svg>
    ),
  },
];

export default function Home() {
  const content = getContent();
  const featuredItems = getFeaturedItems();
  const previewReviews = content.reviews.slice(0, 5);

  return (
    <>
      {/* ── 1. HERO: Split screen ── */}
      <section className="min-h-dvh grid md:grid-cols-2 overflow-hidden">
        {/* Left: brand text panel */}
        <div className="relative flex flex-col justify-center px-8 md:px-14 lg:px-20 py-24 bg-hero-bg overflow-hidden order-2 md:order-1">
          {/* large watermark */}
          <span
            aria-hidden
            className="absolute -right-4 top-1/2 -translate-y-1/2 font-display font-bold text-hero-fg/4 leading-none select-none pointer-events-none"
            style={{ fontSize: "clamp(6rem, 14vw, 14rem)" }}
          >
            CAFÉ
          </span>

          <MotionSection direction="none">
            <p className="text-accent text-xs font-semibold uppercase tracking-[0.3em] mb-6">
              Est. {content.site.founded} &nbsp;·&nbsp; New York
            </p>
            <h1 className="font-display text-hero-fg font-semibold leading-[1.05]" style={{ fontSize: "clamp(2.6rem, 5vw, 5rem)" }}>
              {content.hero.heading}
            </h1>
            <p className="mt-5 text-hero-fg/55 text-base md:text-lg max-w-sm leading-relaxed">
              {content.hero.subheading}
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                href={content.hero.cta.href}
                className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-fg px-7 py-3.5 font-semibold tracking-wide transition-all hover:opacity-90 hover:shadow-xl text-sm"
              >
                {content.hero.cta.label}
              </Link>
              <Link
                href={content.hero.secondaryCta.href}
                className="inline-flex items-center gap-2 rounded-full border border-hero-fg/30 text-hero-fg px-7 py-3.5 font-semibold transition-all hover:border-hero-fg/60 hover:bg-hero-fg/5 text-sm"
              >
                {content.hero.secondaryCta.label}
              </Link>
            </div>

            {/* Rating badge */}
            <div className="mt-10 inline-flex items-center gap-3 border border-hero-fg/15 rounded-full px-4 py-2.5 w-fit">
              <span className="text-accent text-sm tracking-wide">★★★★★</span>
              <span className="text-hero-fg/50 text-xs">
                {content.ratingSummary.average} · {content.ratingSummary.total}+ reviews
              </span>
            </div>
          </MotionSection>
        </div>

        {/* Right: image */}
        <div className="relative min-h-[55vw] md:min-h-full order-1 md:order-2">
          <Image
            src="https://picsum.photos/seed/cafe-interior-warm/900/1100"
            alt="Inside the cafe"
            fill
            priority
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, 50vw"
            unoptimized
          />
          {/* Bleed gradient into dark left panel */}
          <div className="absolute inset-0 bg-linear-to-r from-hero-bg/60 via-hero-bg/10 to-transparent md:block hidden" />
          {/* Floating stat card */}
          <div className="absolute bottom-6 right-6 bg-hero-bg/80 backdrop-blur-sm border border-hero-fg/10 rounded-2xl px-5 py-4 shadow-2xl text-center">
            <p className="font-display text-3xl font-bold text-primary leading-none">20+</p>
            <p className="text-hero-fg/55 text-xs mt-1.5 leading-tight">Years crafting<br />memories</p>
          </div>
        </div>
      </section>

      {/* ── 2. MARQUEE strip ── */}
      <MarqueeStrip />

      {/* ── 3. SIGNATURE DISHES: Bento grid ── */}
      <section className="section-padding bg-background px-6">
        <div className="mx-auto max-w-7xl">
          {/* Header row */}
          <MotionSection direction="none">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
              <div>
                <p className="text-primary text-xs font-semibold uppercase tracking-[0.2em] mb-2">
                  From Our Kitchen
                </p>
                <h2 className="font-display text-foreground font-semibold leading-tight" style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)" }}>
                  Signature Dishes
                </h2>
              </div>
              <Link
                href="/menu"
                className="hidden sm:inline-flex items-center gap-1 text-primary font-semibold text-sm hover:gap-3 transition-all"
              >
                Explore full menu →
              </Link>
            </div>
          </MotionSection>

          {/* Bento grid: large left + 4 right */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 auto-rows-[220px] md:auto-rows-[260px]">
            {/* ── Large feature card: 1 col wide, 2 rows tall ── */}
            {featuredItems[0] && (
              <MotionSection direction="left" className="col-span-2 lg:col-span-1 row-span-2">
                <article className="group relative h-full rounded-2xl overflow-hidden">
                  <Image
                    src={featuredItems[0].image}
                    alt={featuredItems[0].name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/20 to-transparent" />
                  {featuredItems[0].bestSeller && (
                    <span className="absolute top-4 left-4 bg-accent text-accent-fg text-xs font-semibold px-3 py-1 rounded-full">
                      Best Seller
                    </span>
                  )}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <p className="text-white/60 text-xs uppercase tracking-widest mb-1">Chef's Pick</p>
                    <h3 className="font-display text-white text-2xl font-semibold leading-snug">
                      {featuredItems[0].name}
                    </h3>
                    <p className="text-white/60 text-sm mt-1.5 leading-relaxed line-clamp-2">
                      {featuredItems[0].description}
                    </p>
                    <p className="text-accent font-bold text-xl mt-3">₹{featuredItems[0].price}</p>
                  </div>
                </article>
              </MotionSection>
            )}

            {/* ── Four smaller cards ── */}
            {featuredItems.slice(1, 5).map((item, i) => (
              <MotionSection key={item.id} delay={i * 0.07} direction="up">
                <article className="group relative h-full rounded-2xl overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/10 to-transparent" />
                  {item.bestSeller && (
                    <span className="absolute top-3 left-3 bg-accent text-accent-fg text-[10px] font-semibold px-2 py-0.5 rounded-full">
                      Best Seller
                    </span>
                  )}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="font-display text-white text-sm md:text-base font-semibold leading-snug line-clamp-1">
                      {item.name}
                    </h3>
                    <p className="text-accent font-semibold text-sm mt-0.5">₹{item.price}</p>
                  </div>
                </article>
              </MotionSection>
            ))}
          </div>

          {/* Mobile menu link */}
          <div className="mt-8 text-center sm:hidden">
            <Link
              href="/menu"
              className="inline-flex items-center gap-2 rounded-full border border-primary text-primary px-7 py-3 font-semibold text-sm transition-all hover:bg-primary hover:text-primary-fg"
            >
              View full menu →
            </Link>
          </div>
        </div>
      </section>

      {/* ── 4. THREE PILLARS ── */}
      <section className="bg-muted">
        <div className="mx-auto max-w-7xl divide-y md:divide-y-0 md:divide-x divide-border grid grid-cols-1 md:grid-cols-3">
          {PILLARS.map((pillar, i) => (
            <MotionSection key={pillar.num} delay={i * 0.12} direction="up">
              <div className="px-8 lg:px-12 py-14 md:py-16 relative group">
                <p className="font-display font-bold text-primary/10 leading-none select-none mb-4" style={{ fontSize: "clamp(3.5rem, 7vw, 6rem)" }}>
                  {pillar.num}
                </p>
                <div className="text-muted-fg mb-3">{pillar.icon}</div>
                <h3 className="font-display text-foreground text-xl font-semibold mb-3">
                  {pillar.title}
                </h3>
                <p className="text-muted-fg text-sm leading-relaxed">{pillar.desc}</p>
              </div>
            </MotionSection>
          ))}
        </div>
      </section>

      {/* ── 5. STORY: Full-bleed image with text overlay ── */}
      <section className="relative min-h-[70vh] md:min-h-[80vh] flex items-end overflow-hidden">
        <Image
          src="https://picsum.photos/seed/cafe-chef-kitchen/1600/900"
          alt="Our kitchen"
          fill
          className="object-cover object-center"
          sizes="100vw"
          unoptimized
        />
        <div className="absolute inset-0 bg-linear-to-t from-hero-bg via-hero-bg/50 to-transparent" />

        {/* Floating quote on the right (desktop) */}
        <div className="absolute top-8 right-8 md:top-12 md:right-12 hidden md:block max-w-xs bg-hero-bg/60 backdrop-blur-md border border-hero-fg/10 rounded-2xl p-6">
          <p className="text-hero-fg/70 text-sm italic leading-relaxed">
            &ldquo;Food is not just eating energy. It's an experience.&rdquo;
          </p>
          <p className="text-accent text-xs font-semibold mt-3">— The Kitchen</p>
        </div>

        {/* Text overlay: bottom left */}
        <MotionSection direction="up" className="relative z-10 w-full">
          <div className="max-w-7xl mx-auto px-6 md:px-14 py-12 md:py-16 md:max-w-2xl md:mx-0 md:ml-auto md:mr-0 lg:ml-[8%]">
            <p className="text-accent text-xs font-semibold uppercase tracking-[0.25em] mb-4">
              Our Story
            </p>
            <h2 className="font-display text-hero-fg font-semibold leading-tight mb-4" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}>
              {content.site.name}
            </h2>
            <p className="text-hero-fg/65 text-base leading-relaxed max-w-lg">
              {content.about.story.slice(0, 220)}…
            </p>
            <Link
              href="/about"
              className="mt-6 inline-flex items-center gap-2 text-primary font-semibold text-sm hover:gap-4 transition-all"
            >
              Read our full story →
            </Link>
          </div>
        </MotionSection>
      </section>

      {/* ── 6. REVIEWS: Horizontal scroll ── */}
      <section className="section-padding bg-background">
        <div className="mx-auto max-w-7xl px-6 mb-10">
          <MotionSection direction="none">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <p className="text-primary text-xs font-semibold uppercase tracking-[0.2em] mb-2">
                  {content.ratingSummary.average} ★ on Google
                </p>
                <h2 className="font-display text-foreground font-semibold leading-tight" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
                  What Guests Say
                </h2>
              </div>
              <Link
                href="/reviews"
                className="hidden sm:inline-flex items-center gap-1 text-primary font-semibold text-sm hover:gap-3 transition-all shrink-0"
              >
                All {content.ratingSummary.total} reviews →
              </Link>
            </div>
          </MotionSection>
        </div>

        {/* Horizontal scroll strip */}
        <div className="flex gap-5 overflow-x-auto scrollbar-hide px-6 md:px-[calc((100vw-80rem)/2+1.5rem)] pb-4 snap-x snap-mandatory">
          {previewReviews.map((review, i) => (
            <div key={review.id} className="snap-start shrink-0 w-[min(85vw,380px)]">
              <MotionSection delay={i * 0.08}>
                <ReviewCard review={review} />
              </MotionSection>
            </div>
          ))}
          {/* Trailing CTA card */}
          <div className="snap-start shrink-0 w-[min(85vw,240px)] flex items-center justify-center">
            <Link
              href="/reviews"
              className="flex flex-col items-center gap-3 text-center p-8 rounded-2xl border border-dashed border-border text-muted-fg hover:border-primary hover:text-primary transition-colors w-full h-full justify-center"
            >
              <span className="font-display text-3xl font-semibold">
                {content.ratingSummary.total}+
              </span>
              <span className="text-sm font-medium">Read all reviews</span>
            </Link>
          </div>
        </div>

        <div className="mt-6 text-center sm:hidden">
          <Link
            href="/reviews"
            className="text-primary font-semibold text-sm hover:underline"
          >
            All {content.ratingSummary.total} reviews →
          </Link>
        </div>
      </section>

      {/* ── 7. RESERVATION CTA: Split layout ── */}
      <section className="bg-hero-bg overflow-hidden">
        <div className="mx-auto max-w-7xl grid md:grid-cols-2">
          {/* Left: image */}
          <div className="relative min-h-75 md:min-h-130 order-2 md:order-1">
            <Image
              src="https://picsum.photos/seed/cafe-table-setting/800/600"
              alt="Table setting"
              fill
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, 50vw"
              unoptimized
            />
            <div className="absolute inset-0 bg-hero-bg/20" />
          </div>

          {/* Right: text */}
          <div className="flex flex-col justify-center px-8 md:px-14 lg:px-20 py-16 md:py-20 order-1 md:order-2">
            <MotionSection direction="right">
              <SectionHeader
                label="Book a Table"
                heading="Reserve Your Moment"
                subheading="Whether it's a quiet morning coffee or a celebratory dinner — we're saving a seat for you."
                light
              />
              <div className="mt-10 flex flex-wrap gap-3">
                <Link
                  href="/reservations"
                  className="rounded-full bg-primary text-primary-fg px-8 py-3.5 font-semibold tracking-wide transition-all hover:opacity-90 hover:shadow-xl text-sm"
                >
                  {content.navigation.cta.label}
                </Link>
                <Link
                  href="/events"
                  className="rounded-full border border-hero-fg/25 text-hero-fg px-8 py-3.5 font-semibold transition-all hover:border-hero-fg/50 hover:bg-hero-fg/5 text-sm"
                >
                  Private events
                </Link>
              </div>
              <div className="mt-10 space-y-2">
                <a href={`tel:${content.site.phone}`} className="flex items-center gap-2 text-hero-fg/50 hover:text-hero-fg/80 transition-colors text-sm">
                  <span>📞</span> {content.site.phone}
                </a>
                <a href={`mailto:${content.site.email}`} className="flex items-center gap-2 text-hero-fg/50 hover:text-hero-fg/80 transition-colors text-sm">
                  <span>✉️</span> {content.site.email}
                </a>
              </div>
            </MotionSection>
          </div>
        </div>
      </section>
    </>
  );
}
