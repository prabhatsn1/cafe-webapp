"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import type { ScrollStoryItem } from "@/src/types/content";

interface ScrollStoryProps {
  items: ScrollStoryItem[];
  heroHeading: string;
  heroSubheading: string;
}

export default function ScrollStory({
  items,
  heroHeading,
  heroSubheading,
}: ScrollStoryProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });

  // Each segment gets a quarter of the scroll range
  const totalSections = items.length + 1; // +1 for hero
  const segmentSize = 1 / totalSections;

  return (
    <div
      ref={containerRef}
      className="relative"
      style={{ height: `${(totalSections + 0.5) * 100}vh` }}
    >
      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen overflow-hidden bg-transparent">
        {/* Background progress bar */}
        <motion.div
          className="absolute left-0 top-0 h-full w-1 bg-primary/30 origin-top"
          style={{ scaleY: smoothProgress }}
        />

        {/* Hero panel */}
        <StoryPanel
          scrollProgress={smoothProgress}
          rangeIn={[0, segmentSize * 0.3]}
          rangeOut={[segmentSize * 0.7, segmentSize]}
          isFirst
        >
          <div className="flex flex-col items-center justify-center h-full text-center px-6">
            <motion.p
              className="text-accent text-xs font-semibold uppercase tracking-[0.3em] mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Welcome
            </motion.p>
            <motion.h1
              className="font-display text-hero-fg text-5xl md:text-7xl lg:text-8xl font-semibold leading-tight max-w-4xl"
              style={{
                textShadow:
                  "0 2px 24px rgba(0,0,0,0.7), 0 1px 4px rgba(0,0,0,0.5)",
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.9 }}
            >
              {heroHeading}
            </motion.h1>
            <motion.p
              className="mt-6 text-hero-fg/90 text-lg md:text-xl max-w-2xl leading-relaxed"
              style={{ textShadow: "0 1px 12px rgba(0,0,0,0.6)" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              {heroSubheading}
            </motion.p>
            <motion.div
              className="mt-4 text-hero-fg/30 text-sm flex items-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
            >
              <span>Scroll to explore</span>
              <svg
                className="w-4 h-4 animate-bounce"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </motion.div>
          </div>
        </StoryPanel>

        {/* Story panels */}
        {items.map((item, i) => {
          const start = segmentSize * (i + 1);
          const end = segmentSize * (i + 2);
          return (
            <StoryPanel
              key={i}
              scrollProgress={smoothProgress}
              rangeIn={[start, start + segmentSize * 0.3]}
              rangeOut={[end - segmentSize * 0.3, end]}
            >
              <div className="flex flex-col items-center justify-center h-full text-center px-6 max-w-4xl mx-auto">
                <p className="text-accent text-xs font-semibold uppercase tracking-[0.3em] mb-6">
                  {item.accent}
                </p>
                <h2 className="font-display text-hero-fg text-4xl md:text-6xl font-semibold leading-tight mb-6">
                  {item.heading}
                </h2>
                <p className="text-hero-fg/70 text-lg md:text-xl leading-relaxed max-w-2xl">
                  {item.body}
                </p>
              </div>
            </StoryPanel>
          );
        })}

        {/* Scroll progress indicator */}
        <div className="absolute bottom-8 right-8 flex flex-col items-center gap-2">
          {Array.from({ length: totalSections }).map((_, i) => (
            <ProgressDot
              key={i}
              scrollProgress={smoothProgress}
              index={i}
              total={totalSections}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

interface StoryPanelProps {
  children: React.ReactNode;
  scrollProgress: ReturnType<typeof useSpring>;
  rangeIn: [number, number];
  rangeOut: [number, number];
  isFirst?: boolean;
}

function StoryPanel({
  children,
  scrollProgress,
  rangeIn,
  rangeOut,
  isFirst = false,
}: StoryPanelProps) {
  // Always call all hooks in consistent order (Rules of Hooks)
  const opacityFull = useTransform(
    scrollProgress,
    [rangeIn[0], rangeIn[1], rangeOut[0], rangeOut[1]],
    [0, 1, 1, 0],
  );
  const opacityFirstOut = useTransform(scrollProgress, rangeOut, [1, 0]);
  const yFull = useTransform(
    scrollProgress,
    [rangeIn[0], rangeIn[1], rangeOut[0], rangeOut[1]],
    [40, 0, 0, -40],
  );
  const yFirstOut = useTransform(scrollProgress, rangeOut, [0, -40]);

  const opacity = isFirst ? opacityFirstOut : opacityFull;
  const y = isFirst ? yFirstOut : yFull;

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center"
      style={{ opacity, y }}
    >
      {children}
    </motion.div>
  );
}

function ProgressDot({
  scrollProgress,
  index,
  total,
}: {
  scrollProgress: ReturnType<typeof useSpring>;
  index: number;
  total: number;
}) {
  const segmentSize = 1 / total;
  const start = segmentSize * index;
  const end = segmentSize * (index + 1);
  const opacity = useTransform(
    scrollProgress,
    [start, start + segmentSize * 0.5, end],
    [0.3, 1, 0.3],
  );
  const scale = useTransform(
    scrollProgress,
    [start, start + segmentSize * 0.5, end],
    [1, 1.5, 1],
  );

  return (
    <motion.div
      className="w-1.5 h-1.5 rounded-full bg-hero-fg"
      style={{ opacity, scale }}
    />
  );
}
