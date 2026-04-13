"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { BookingInputSchema, type BookingInput } from "@/src/lib/schemas";
import type { BookingConfig } from "@/src/types/content";

interface BookingFormProps {
  config: BookingConfig;
}

type FormState = "idle" | "submitting" | "error";

const EMPTY: BookingInput = {
  name: "",
  email: "",
  phone: "",
  date: "",
  time: "",
  guests: 2,
  occasion: "",
  notes: "",
};

export default function BookingForm({ config }: BookingFormProps) {
  const router = useRouter();
  const [form, setForm] = useState<BookingInput>(EMPTY);
  const [errors, setErrors] = useState<
    Partial<Record<keyof BookingInput, string>>
  >({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [formState, setFormState] = useState<FormState>("idle");

  // Minimum date: today + minAdvanceHours
  const minDateObj = new Date(
    Date.now() + config.minAdvanceHours * 60 * 60 * 1000,
  );
  const minDate = minDateObj.toISOString().split("T")[0];

  function update<K extends keyof BookingInput>(
    field: K,
    value: BookingInput[K],
  ) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
    setServerError(null);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrors({});
    setServerError(null);

    const payload = { ...form, guests: Number(form.guests) };
    const result = BookingInputSchema.safeParse(payload);

    if (!result.success) {
      const fieldErrors: Partial<Record<keyof BookingInput, string>> = {};
      result.error.issues.forEach((issue) => {
        const key = issue.path[0] as keyof BookingInput;
        if (!fieldErrors[key]) fieldErrors[key] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setFormState("submitting");
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.data),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error((data as { error?: string }).error ?? "Booking failed");
      }

      const data = (await res.json()) as { booking: { id: string } };
      router.push(`/reservations/success?id=${data.booking.id}`);
    } catch (err) {
      setServerError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.",
      );
      setFormState("error");
    }
  }

  const isSubmitting = formState === "submitting";

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      {/* Name & Email */}
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full name" error={errors.name} required>
          <input
            type="text"
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            placeholder="Jane Smith"
            autoComplete="name"
            className={inputClass(!!errors.name)}
            disabled={isSubmitting}
          />
        </Field>
        <Field label="Email address" error={errors.email} required>
          <input
            type="email"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            placeholder="jane@example.com"
            autoComplete="email"
            className={inputClass(!!errors.email)}
            disabled={isSubmitting}
          />
        </Field>
      </div>

      {/* Phone */}
      <Field label="Phone number" error={errors.phone}>
        <input
          type="tel"
          value={form.phone ?? ""}
          onChange={(e) => update("phone", e.target.value)}
          placeholder="+1 (212) 555-0000"
          autoComplete="tel"
          className={inputClass(!!errors.phone)}
          disabled={isSubmitting}
        />
      </Field>

      {/* Date, Time, Guests */}
      <div className="grid gap-5 sm:grid-cols-3">
        <Field label="Date" error={errors.date} required>
          <input
            type="date"
            value={form.date}
            onChange={(e) => update("date", e.target.value)}
            min={minDate}
            className={inputClass(!!errors.date)}
            disabled={isSubmitting}
          />
        </Field>

        <Field label="Time" error={errors.time} required>
          <select
            value={form.time}
            onChange={(e) => update("time", e.target.value)}
            className={inputClass(!!errors.time)}
            disabled={isSubmitting}
          >
            <option value="">Select…</option>
            {config.timeSlots.map((slot) => (
              <option key={slot} value={slot}>
                {slot}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Guests" error={errors.guests} required>
          <select
            value={form.guests}
            onChange={(e) => update("guests", parseInt(e.target.value, 10))}
            className={inputClass(!!errors.guests)}
            disabled={isSubmitting}
          >
            {Array.from(
              { length: config.maxGuests - config.minGuests + 1 },
              (_, i) => i + config.minGuests,
            ).map((n) => (
              <option key={n} value={n}>
                {n} {n === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </Field>
      </div>

      {/* Occasion */}
      {config.occasions.length > 0 && (
        <Field label="Occasion" error={errors.occasion}>
          <select
            value={form.occasion ?? ""}
            onChange={(e) => update("occasion", e.target.value)}
            className={inputClass(!!errors.occasion)}
            disabled={isSubmitting}
          >
            <option value="">Select an occasion (optional)</option>
            {config.occasions.map((occ) => (
              <option key={occ} value={occ}>
                {occ}
              </option>
            ))}
          </select>
        </Field>
      )}

      {/* Notes */}
      <Field label="Special requests" error={errors.notes}>
        <textarea
          value={form.notes ?? ""}
          onChange={(e) => update("notes", e.target.value)}
          placeholder="Dietary requirements, high chair needed, celebration details…"
          rows={4}
          className={`${inputClass(!!errors.notes)} resize-none`}
          disabled={isSubmitting}
          maxLength={500}
        />
        <p className="mt-1 text-xs text-muted-fg text-right">
          {(form.notes ?? "").length}/500
        </p>
      </Field>

      {/* Availability note */}
      <p className="text-xs text-muted-fg">
        For parties larger than {config.maxGuests} guests, please{" "}
        <a href="/contact" className="underline hover:text-primary">
          contact us
        </a>{" "}
        directly.
      </p>

      {/* Server error */}
      {serverError && (
        <div
          role="alert"
          className="rounded-xl bg-red-50 border border-red-200 p-4 text-sm text-red-700"
        >
          {serverError}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-full bg-primary text-primary-fg py-4 font-semibold text-base tracking-wide transition-all hover:opacity-90 hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Confirming reservation…" : "Confirm reservation"}
      </button>
    </form>
  );
}

function Field({
  label,
  error,
  required,
  children,
}: {
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-foreground mb-1.5">
        {label}
        {required && (
          <span className="text-primary ml-1" aria-hidden>
            *
          </span>
        )}
      </label>
      {children}
      {error && (
        <p role="alert" className="mt-1.5 text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

function inputClass(hasError: boolean) {
  return `w-full rounded-xl border bg-card text-card-fg px-4 py-3 text-sm transition-colors placeholder:text-muted-fg focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent disabled:opacity-60 ${
    hasError ? "border-red-400 bg-red-50/30" : "border-border"
  }`;
}
