interface SectionHeaderProps {
  label?: string;
  heading: string;
  subheading?: string;
  centered?: boolean;
  light?: boolean;
}

export default function SectionHeader({
  label,
  heading,
  subheading,
  centered = false,
  light = false,
}: SectionHeaderProps) {
  return (
    <div className={centered ? "text-center" : ""}>
      {label && (
        <p
          className={`text-xs font-semibold uppercase tracking-[0.2em] mb-3 ${
            light ? "text-accent" : "text-primary"
          }`}
        >
          {label}
        </p>
      )}
      <h2
        className={`font-display text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight ${
          light ? "text-hero-fg" : "text-foreground"
        }`}
      >
        {heading}
      </h2>
      {subheading && (
        <p
          className={`mt-4 text-lg leading-relaxed max-w-2xl ${
            centered ? "mx-auto" : ""
          } ${light ? "text-hero-fg/70" : "text-muted-fg"}`}
        >
          {subheading}
        </p>
      )}
    </div>
  );
}
