import Link from "next/link";

interface SuccessPageProps {
  searchParams: Promise<{ id?: string }>;
}

export default async function ReservationSuccessPage({
  searchParams,
}: SuccessPageProps) {
  const params = await searchParams;
  const bookingId = params.id ?? "unknown";

  return (
    <div className="pt-24 pb-20 min-h-screen bg-background flex items-center justify-center px-6">
      <div className="max-w-lg w-full text-center">
        {/* Success icon */}
        <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-10 h-10 text-emerald-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <h1 className="font-display text-4xl font-semibold text-foreground mb-3">
          Reservation confirmed!
        </h1>
        <p className="text-muted-fg leading-relaxed mb-6">
          We&apos;re looking forward to welcoming you. A confirmation has been
          sent to your email.
        </p>

        {bookingId !== "unknown" && (
          <div className="bg-muted rounded-xl p-5 mb-8 text-left">
            <p className="text-xs text-muted-fg uppercase tracking-widest mb-1">
              Booking reference
            </p>
            <p className="font-mono text-foreground font-semibold text-lg break-all">
              {bookingId}
            </p>
          </div>
        )}

        <p className="text-sm text-muted-fg mb-8">
          If you need to modify or cancel your booking, please call us directly.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/"
            className="rounded-full bg-primary text-primary-fg px-8 py-3.5 font-semibold transition-all hover:opacity-90"
          >
            Back to home
          </Link>
          <Link
            href="/menu"
            className="rounded-full border-2 border-border text-foreground px-8 py-3.5 font-semibold transition-all hover:border-primary hover:text-primary"
          >
            Explore our menu
          </Link>
        </div>
      </div>
    </div>
  );
}
