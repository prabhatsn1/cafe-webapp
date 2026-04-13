import { notFound } from "next/navigation";
import { getAllBookings } from "@/src/lib/bookings";
import type { Booking } from "@/src/lib/schemas";

export const dynamic = "force-dynamic";

export default function AdminBookingsPage() {
  // Block in production
  if (process.env.NODE_ENV === "production") {
    notFound();
  }

  let bookings: Booking[] = [];
  let error: string | null = null;

  try {
    bookings = getAllBookings();
  } catch (e) {
    error = e instanceof Error ? e.message : "Failed to load bookings";
  }

  return (
    <div className="pt-24 pb-20 px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="bg-yellow-400 text-yellow-900 text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wide">
                Dev Only
              </span>
            </div>
            <h1 className="font-display text-3xl font-semibold text-foreground">
              Booking Admin
            </h1>
            <p className="text-muted-fg text-sm mt-1">
              This page is not accessible in production.
            </p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-primary">{bookings.length}</p>
            <p className="text-sm text-muted-fg">total bookings</p>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 text-red-700 text-sm">
            Error: {error}
          </div>
        )}

        {bookings.length === 0 && !error ? (
          <div className="text-center py-20 text-muted-fg">
            No bookings yet. Make a reservation to see it here.
          </div>
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-border">
            <table className="w-full text-sm">
              <thead className="bg-muted text-left">
                <tr>
                  {[
                    "ID",
                    "Name",
                    "Email",
                    "Date",
                    "Time",
                    "Guests",
                    "Occasion",
                    "Created",
                  ].map((h) => (
                    <th
                      key={h}
                      className="px-4 py-3 font-semibold text-foreground whitespace-nowrap"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border bg-card">
                {bookings
                  .slice()
                  .reverse()
                  .map((booking) => (
                    <tr
                      key={booking.id}
                      className="hover:bg-muted/50 transition-colors"
                    >
                      <td className="px-4 py-3 font-mono text-xs text-muted-fg max-w-[120px] truncate">
                        {booking.id.slice(0, 8)}…
                      </td>
                      <td className="px-4 py-3 text-card-fg font-medium">
                        {booking.name}
                      </td>
                      <td className="px-4 py-3 text-muted-fg">
                        {booking.email}
                      </td>
                      <td className="px-4 py-3 text-card-fg whitespace-nowrap">
                        {booking.date}
                      </td>
                      <td className="px-4 py-3 text-card-fg">{booking.time}</td>
                      <td className="px-4 py-3 text-card-fg">
                        {booking.guests}
                      </td>
                      <td className="px-4 py-3 text-muted-fg">
                        {booking.occasion || "—"}
                      </td>
                      <td className="px-4 py-3 text-muted-fg whitespace-nowrap text-xs">
                        {new Date(booking.createdAt).toLocaleString("en-US", {
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}

        <p className="mt-6 text-xs text-muted-fg">
          Data stored in{" "}
          <code className="bg-muted px-1.5 py-0.5 rounded">
            src/content/bookings.json
          </code>
          . Swap with a real database using{" "}
          <code className="bg-muted px-1.5 py-0.5 rounded">
            src/lib/bookings.ts
          </code>
          .
        </p>
      </div>
    </div>
  );
}
