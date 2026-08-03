/**
 * CRM lead-submission abstraction.
 *
 * Leads are delivered via Web3Forms (web3forms.com) — a free-forever,
 * no-backend form-to-email service. Set WEB3FORMS_ACCESS_KEY in the
 * environment (an access key generated at web3forms.com against
 * Justin.cadenhead@kw.com) and every submitted lead emails there
 * automatically. Until it's set, leads are only logged server-side so the
 * surrounding forms can still be built and tested end-to-end.
 */

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

  const accessKey = process.env.WEB3FORMS_ACCESS_KEY;

  if (!accessKey) {
    // TODO(client): remove this fallback once WEB3FORMS_ACCESS_KEY is set.
    console.log("[crm] (mock) lead captured:", lead);
    return { success: true };
  }

  try {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: accessKey,
        subject: `${LEAD_TYPE_LABEL[lead.type]} — ${lead.name}`,
        from_name: lead.name,
        email: lead.email,
        message: buildLeadMessage(lead),
      }),
    });
    const data = await res.json();
    if (!res.ok || !data.success) {
      return { success: false, error: data.message ?? `Web3Forms responded with ${res.status}` };
    }
    return { success: true };
  } catch (err) {
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
