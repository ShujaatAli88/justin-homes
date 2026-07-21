import { NextResponse } from "next/server";
import { submitLead, type Lead } from "@/lib/crm";

export async function POST(request: Request) {
  const body = (await request.json()) as Lead;

  if (!body.consent) {
    return NextResponse.json({ error: "Consent is required." }, { status: 400 });
  }
  if (!body.name || !body.email) {
    return NextResponse.json({ error: "Name and email are required." }, { status: 400 });
  }

  const result = await submitLead(body);
  if (!result.success) {
    return NextResponse.json({ error: result.error ?? "Unable to submit." }, { status: 502 });
  }
  return NextResponse.json({ success: true });
}
