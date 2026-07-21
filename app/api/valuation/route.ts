import { NextResponse } from "next/server";
import { submitValuationRequest, type ValuationRequest } from "@/lib/valuation";

export async function POST(request: Request) {
  const body = (await request.json()) as ValuationRequest;

  if (!body.consent) {
    return NextResponse.json({ error: "Consent is required." }, { status: 400 });
  }
  if (!body.address?.street || !body.address?.city || !body.address?.zip) {
    return NextResponse.json({ error: "A complete address is required." }, { status: 400 });
  }
  if (!body.name || !body.email || !body.phone) {
    return NextResponse.json({ error: "Name, email, and phone are required." }, { status: 400 });
  }

  const { result, leadSubmitted } = await submitValuationRequest(body);
  return NextResponse.json({ result, leadSubmitted });
}
