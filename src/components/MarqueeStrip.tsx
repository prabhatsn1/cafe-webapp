"use client";

const WORDS = [
  "Handcrafted",
  "·",
  "Seasonal",
  "·",
  "Locally Sourced",
  "·",
  "Est. 2004",
  "·",
  "Wood-Fired",
  "·",
  "Fresh Daily",
  "·",
  "Made with Love",
  "·",
  "New York",
  "·",
];

export default function MarqueeStrip() {
  const text = [...WORDS, ...WORDS]; // duplicate for seamless loop

  return (
    <div className="overflow-hidden bg-primary py-3 select-none">
      <div className="flex whitespace-nowrap animate-marquee">
        {text.map((word, i) => (
          <span
            key={i}
            className="mx-4 text-primary-fg text-xs font-semibold uppercase tracking-[0.2em]"
          >
            {word}
          </span>
        ))}
      </div>
    </div>
  );
}
