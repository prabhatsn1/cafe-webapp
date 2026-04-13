import fs from "fs";
import path from "path";
import type { Booking, BookingInput } from "@/src/lib/schemas";

const BOOKINGS_PATH = path.join(
  process.cwd(),
  "src",
  "content",
  "bookings.json",
);

function ensureFile(): void {
  if (!fs.existsSync(BOOKINGS_PATH)) {
    fs.mkdirSync(path.dirname(BOOKINGS_PATH), { recursive: true });
    fs.writeFileSync(BOOKINGS_PATH, "[]", "utf-8");
  }
}

export function getAllBookings(): Booking[] {
  ensureFile();
  try {
    const raw = fs.readFileSync(BOOKINGS_PATH, "utf-8");
    return JSON.parse(raw) as Booking[];
  } catch {
    return [];
  }
}

export function addBooking(input: BookingInput): Booking {
  ensureFile();
  const bookings = getAllBookings();

  const booking: Booking = {
    ...input,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };

  bookings.push(booking);

  // Atomic write: write to temp file then rename
  const tmpPath = `${BOOKINGS_PATH}.tmp`;
  fs.writeFileSync(tmpPath, JSON.stringify(bookings, null, 2), "utf-8");
  fs.renameSync(tmpPath, BOOKINGS_PATH);

  return booking;
}
