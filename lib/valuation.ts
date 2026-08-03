/**
 * "What's My Home Worth?" lead-capture flow.
 *
 * This intentionally does not generate an automated online estimate.
 * Submitting the form sends the property and contact details to Justin via
 * lib/crm.ts, and he follows up personally with a real valuation.
 */
import { submitLead, type Lead } from "@/lib/crm";

export interface ValuationAddress {
  street: string;
  city: string;
  state: string;
  zip: string;
}

export type ValuationInterest = "buying" | "selling" | "both";

export interface ValuationRequest {
  address: ValuationAddress;
  name: string;
  email: string;
  phone: string;
  interest: ValuationInterest;
  consent: boolean;
}

export async function submitValuationRequest(request: ValuationRequest): Promise<{ leadSubmitted: boolean }> {
  const lead: Lead = {
    type: "valuation",
    name: request.name,
    email: request.email,
    phone: request.phone,
    consent: request.consent,
    message: `Home valuation request for ${request.address.street}, ${request.address.city}, ${request.address.state} ${request.address.zip}`,
    meta: { interest: request.interest },
  };

  const { success } = await submitLead(lead);
  return { leadSubmitted: success };
}
