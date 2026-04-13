import { NextRequest, NextResponse } from "next/server";
import { ContactFormSchema } from "@/src/lib/schemas";

export async function POST(request: NextRequest) {
  try {
    const body: unknown = await request.json();

    const parseResult = ContactFormSchema.safeParse(body);
    if (!parseResult.success) {
      return NextResponse.json(
        { error: "Validation failed", issues: parseResult.error.issues },
        { status: 400 },
      );
    }

    // In a real app, send an email or store the enquiry here.
    // For this demo, we just acknowledge receipt.
    console.log("[Contact form submission]", {
      name: parseResult.data.name,
      email: parseResult.data.email,
      enquiryType: parseResult.data.enquiryType,
    });

    return NextResponse.json(
      { success: true, message: "Enquiry received" },
      { status: 200 },
    );
  } catch (err) {
    console.error("[/api/contact POST]", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
