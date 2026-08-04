/**
 * CRM lead-submission abstraction.
 *
 * Leads are delivered via FormSubmit (formsubmit.co) — a free-forever,
 * no-signup, no-API-key form-to-email service; the destination email is
 * just part of the request URL. Delivers to agent.email (Justin's inbox).
 *
 * IMPORTANT: the first submission to a brand-new destination email
 * triggers a one-time confirmation email from FormSubmit — Justin needs to
 * click "Activate Form" in that email before any lead actually arrives.
 * Every submission after that delivers immediately.
 *
 * In development (NODE_ENV !== "production") submissions are only logged
 * server-side instead of actually posting to FormSubmit, so local testing
 * never spams the real inbox or re-triggers the activation email.
 */
import { agent } from "@/data/agent";

export type LeadType = "valuation" | "contact" | "newsletter" | "listing-inquiry" | "showing-request";

export interface Lead {
  type: LeadType;
  name: string;
  email: string;
  phone?: string;
  message?: string;
  consent: boolean;
  meta?: Record<string, string | number | boolean | undefined>;
}

export interface CrmSubmitResult {
  success: boolean;
  error?: string;
}

const LEAD_TYPE_LABEL: Record<LeadType, string> = {
  valuation: "Home Valuation Request",
  contact: "Contact Form Message",
  newsletter: "Newsletter Signup",
  "listing-inquiry": "Listing Inquiry",
  "showing-request": "Showing Request",
};

function buildLeadMessage(lead: Lead): string {
  const lines = [
    lead.phone && `Phone: ${lead.phone}`,
    ...Object.entries(lead.meta ?? {}).map(([key, value]) => `${key}: ${value}`),
    "",
    lead.message ?? "",
  ].filter((line): line is string => Boolean(line) || line === "");
  return lines.join("\n");
}

export async function submitLead(lead: Lead): Promise<CrmSubmitResult> {
  if (!lead.consent) {
    return { success: false, error: "Consent is required before a lead can be submitted." };
  }

  if (process.env.NODE_ENV !== "production") {
    console.log("[crm] (mock, dev-only) lead captured:", lead);
    return { success: true };
  }

  try {
    // A hard timeout matters here: if FormSubmit ever hangs, an un-timed-out
    // fetch can run past Vercel's own function execution limit, which kills
    // the function at the platform level (a raw HTML 502) before our own
    // try/catch ever gets a chance to return a clean JSON error.
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);

    let res: Response;
    try {
      res = await fetch(`https://formsubmit.co/ajax/${agent.email}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: `${LEAD_TYPE_LABEL[lead.type]} — ${lead.name}`,
          _replyto: lead.email,
          _template: "table",
          name: lead.name,
          email: lead.email,
          phone: lead.phone ?? "",
          message: buildLeadMessage(lead),
        }),
        signal: controller.signal,
      });
    } finally {
      clearTimeout(timeout);
    }

    const rawBody = await res.text();
    let data: { success?: boolean | string; message?: string } = {};
    try {
      data = JSON.parse(rawBody);
    } catch {
      // FormSubmit occasionally responds with a non-JSON body (e.g. an HTML
      // redirect page while a brand-new destination email is still pending
      // activation) — treat that as a soft failure instead of throwing.
      return { success: false, error: `FormSubmit returned a non-JSON response: ${rawBody.slice(0, 200)}` };
    }

    if (!res.ok || data.success === false || data.success === "false") {
      return { success: false, error: data.message ?? `FormSubmit responded with ${res.status}` };
    }
    return { success: true };
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") {
      return { success: false, error: "FormSubmit did not respond in time. Please try again." };
    }
    return { success: false, error: err instanceof Error ? err.message : "Unknown error submitting lead" };
  }
}

/**
 * Standard opt-in copy required on every lead form. Keep this centralized so
 * the consent language stays identical across the valuation tool, contact
 * form, newsletter signup, and "get more info" modal.
 */
export const CRM_CONSENT_TEXT =
  "By submitting this form, I agree to be contacted by Cadenhead Realty Group / Keller Williams via call, text, and email regarding real estate services. Message/data rates may apply. Consent is not a condition of purchase and can be revoked at any time.";
