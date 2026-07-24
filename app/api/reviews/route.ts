import { NextResponse } from "next/server";
import { submitReview, type NewReviewInput } from "@/lib/reviews";

export async function POST(request: Request) {
  const body = (await request.json()) as NewReviewInput;

  if (!body.consent) {
    return NextResponse.json({ error: "Consent is required." }, { status: 400 });
  }
  if (!body.author || !body.quote || !body.rating) {
    return NextResponse.json({ error: "Name, rating, and review text are required." }, { status: 400 });
  }

  const result = await submitReview(body);
  if (!result.success) {
    return NextResponse.json({ error: result.error ?? "Unable to submit." }, { status: 502 });
  }
  return NextResponse.json({ success: true });
}
