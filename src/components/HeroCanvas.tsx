"use client";

import dynamic from "next/dynamic";

const ThreeHeroScene = dynamic(
  () => import("@/src/components/ThreeHeroScene"),
  {
    ssr: false,
    loading: () => (
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 60% 40%, #4a1a0f 0%, #2d1b10 50%, #1a0c07 100%)",
        }}
      />
    ),
  },
);

export default function HeroCanvas() {
  return <ThreeHeroScene />;
}
