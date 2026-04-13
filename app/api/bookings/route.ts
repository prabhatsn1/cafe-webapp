import { NextRequest, NextResponse } from "next/server";
import { getAllBookings, addBooking } from "@/src/lib/bookings";
import { BookingInputSchema } from "@/src/lib/schemas";
import { getContent } from "@/src/lib/content";

export async function GET() {
  try {
    const bookings = getAllBookings();
    return NextResponse.json({ bookings });
  } catch {
    return NextResponse.json(
      { error: "Failed to retrieve bookings" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: unknown = await request.json();

    // Validate input
    const parseResult = BookingInputSchema.safeParse(body);
    if (!parseResult.success) {
      return NextResponse.json(
        { error: "Validation failed", issues: parseResult.error.issues },
        { status: 400 },
      );
    }

    const input = parseResult.data;

    // Check date is not in the past
    const { bookingConfig } = getContent();
    const minAllowedTime =
      Date.now() + bookingConfig.minAdvanceHours * 60 * 60 * 1000;
    const bookingDateTime = new Date(`${input.date}T${input.time}`);

    if (isNaN(bookingDateTime.getTime())) {
      return NextResponse.json(
        { error: "Invalid date or time" },
        { status: 400 },
      );
    }

    if (bookingDateTime.getTime() < minAllowedTime) {
      return NextResponse.json(
        {
          error: `Bookings must be made at least ${bookingConfig.minAdvanceHours} hours in advance`,
        },
        { status: 400 },
      );
    }

    // Check guests are within range
    if (
      input.guests < bookingConfig.minGuests ||
      input.guests > bookingConfig.maxGuests
    ) {
      return NextResponse.json(
        {
          error: `Guest count must be between ${bookingConfig.minGuests} and ${bookingConfig.maxGuests}`,
        },
        { status: 400 },
      );
    }

    // Check time slot is valid
    if (!bookingConfig.timeSlots.includes(input.time)) {
      return NextResponse.json(
        { error: "Invalid time slot selected" },
        { status: 400 },
      );
    }

    const booking = addBooking(input);
    return NextResponse.json({ booking }, { status: 201 });
  } catch (err) {
    console.error("[/api/bookings POST]", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
