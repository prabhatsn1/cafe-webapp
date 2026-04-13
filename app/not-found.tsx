import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6 pt-20">
      <div className="text-center max-w-lg">
        <p className="font-display text-8xl font-bold text-primary/20 leading-none select-none">
          404
        </p>
        <h1 className="font-display text-3xl font-semibold text-foreground mt-4 mb-3">
          Page not found
        </h1>
        <p className="text-muted-fg leading-relaxed mb-8">
          The page you&apos;re looking for doesn&apos;t seem to exist. It may
          have been moved, renamed, or perhaps never existed.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/"
            className="rounded-full bg-primary text-primary-fg px-8 py-3.5 font-semibold transition-all hover:opacity-90"
          >
            Go home
          </Link>
          <Link
            href="/menu"
            className="rounded-full border-2 border-border text-foreground px-8 py-3.5 font-semibold transition-all hover:border-primary hover:text-primary"
          >
            View our menu
          </Link>
        </div>
      </div>
    </div>
  );
}
