import { z } from "zod";

export const BookingInputSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name is too long"),
  email: z.string().email("Please enter a valid email address"),
  phone: z
    .string()
    .regex(/^[+\d\s\-()]{7,20}$/, "Please enter a valid phone number")
    .optional()
    .or(z.literal("")),
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format (YYYY-MM-DD)"),
  time: z.string().regex(/^\d{2}:\d{2}$/, "Invalid time format (HH:MM)"),
  guests: z
    .number()
    .int()
    .min(1, "Minimum 1 guest")
    .max(12, "Maximum 12 guests — please contact us for larger parties"),
  occasion: z.string().optional().or(z.literal("")),
  notes: z
    .string()
    .max(500, "Notes must be 500 characters or fewer")
    .optional()
    .or(z.literal("")),
});

export type BookingInput = z.infer<typeof BookingInputSchema>;

export interface Booking extends BookingInput {
  id: string;
  createdAt: string;
}

export const ContactFormSchema = z.object({
  name: z.string().min(2, "Name is required").max(100),
  email: z.string().email("Please enter a valid email"),
  enquiryType: z.string().min(1, "Please select an enquiry type"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(2000, "Message must be 2000 characters or fewer"),
});

export type ContactFormInput = z.infer<typeof ContactFormSchema>;
