/**
 * CRM lead-submission abstraction.
 *
 * TODO(client): Wire this to the real destination once available — either a
 * KW Command webhook/API, or the client's chosen CRM. Set CRM_WEBHOOK_URL in
 * the environment and implement the fetch call below; until then, leads are
 * only logged server-side so the surrounding forms can be built and tested.
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

export async function submitLead(lead: Lead): Promise<CrmSubmitResult> {
  if (!lead.consent) {
    return { success: false, error: "Consent is required before a lead can be submitted." };
  }

  const webhookUrl = process.env.CRM_WEBHOOK_URL;

  if (!webhookUrl) {
    // TODO(client): remove this fallback once CRM_WEBHOOK_URL / KW Command
    // credentials are supplied. For now leads are only logged so the forms
    // can be developed and demoed end-to-end.
    console.log("[crm] (mock) lead captured:", lead);
    return { success: true };
  }

  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(lead),
    });
    if (!res.ok) {
      return { success: false, error: `CRM responded with ${res.status}` };
    }
    return { success: true };
  } catch (err) {
    return { success: false, error: err instanceof Error ? err.message : "Unknown CRM error" };
  }
}

/**
 * Standard opt-in copy required on every lead form. Keep this centralized so
 * the consent language stays identical across the valuation tool, contact
 * form, newsletter signup, and "get more info" modal.
 */
export const CRM_CONSENT_TEXT =
  "By submitting this form, I agree to be contacted by Cadenhead Realty Group / Keller Williams via call, text, and email regarding real estate services. Message/data rates may apply. Consent is not a condition of purchase and can be revoked at any time.";
