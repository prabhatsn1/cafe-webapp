"use client";

import { useState } from "react";
import { ContactFormSchema, type ContactFormInput } from "@/src/lib/schemas";

interface ContactFormProps {
  enquiryTypes: string[];
  formNote: string;
}

type FormState = "idle" | "submitting" | "success" | "error";

export default function ContactForm({
  enquiryTypes,
  formNote,
}: ContactFormProps) {
  const [state, setState] = useState<FormState>("idle");
  const [errors, setErrors] = useState<
    Partial<Record<keyof ContactFormInput, string>>
  >({});
  const [form, setForm] = useState<ContactFormInput>({
    name: "",
    email: "",
    enquiryType: "",
    message: "",
  });

  function update<K extends keyof ContactFormInput>(
    field: K,
    value: ContactFormInput[K],
  ) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrors({});

    const result = ContactFormSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof ContactFormInput, string>> = {};
      result.error.issues.forEach((issue) => {
        const key = issue.path[0] as keyof ContactFormInput;
        fieldErrors[key] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setState("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.data),
      });
      if (!res.ok) throw new Error("Submission failed");
      setState("success");
    } catch {
      setState("error");
    }
  }

  if (state === "success") {
    return (
      <div className="rounded-2xl bg-card border border-border p-10 text-center">
        <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-emerald-600"
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
        <h3 className="font-display text-2xl font-semibold text-card-fg mb-2">
          Message sent!
        </h3>
        <p className="text-muted-fg">We&apos;ll be in touch within 24 hours.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      {formNote && (
        <p className="text-sm text-muted-fg italic border-l-2 border-primary pl-4">
          {formNote}
        </p>
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Your name" error={errors.name} required>
          <input
            type="text"
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            placeholder="Jane Smith"
            autoComplete="name"
            className={inputClass(!!errors.name)}
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
          />
        </Field>
      </div>

      <Field label="Type of enquiry" error={errors.enquiryType} required>
        <select
          value={form.enquiryType}
          onChange={(e) => update("enquiryType", e.target.value)}
          className={inputClass(!!errors.enquiryType)}
        >
          <option value="">Select a type…</option>
          {enquiryTypes.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Message" error={errors.message} required>
        <textarea
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
          placeholder="How can we help?"
          rows={6}
          className={`${inputClass(!!errors.message)} resize-none`}
        />
      </Field>

      {state === "error" && (
        <p role="alert" className="text-sm text-red-600">
          Something went wrong. Please try again or email us directly.
        </p>
      )}

      <button
        type="submit"
        disabled={state === "submitting"}
        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-primary text-primary-fg px-8 py-3.5 font-semibold transition-all hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {state === "submitting" ? "Sending…" : "Send message"}
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
  return `w-full rounded-xl border bg-card text-card-fg px-4 py-3 text-sm transition-colors placeholder:text-muted-fg focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent ${
    hasError ? "border-red-400" : "border-border"
  }`;
}
