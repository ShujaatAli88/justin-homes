/**
 * Automated Valuation Model (AVM) abstraction for the "What's My Home Worth?"
 * tool.
 *
 * TODO(client): Replace `mockAvmProvider` with a real AVM once selected —
 * options include an IDX/MLS comp-based estimate, or a third-party AVM API.
 * Set AVM_API_KEY / AVM_API_URL in the environment and implement the fetch
 * call in `RealAvmProvider` (stubbed below) without touching call sites.
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

export interface ValuationResult {
  address: ValuationAddress;
  estimate: number;
  rangeLow: number;
  rangeHigh: number;
  confidence: "low" | "medium" | "high";
}

export interface AvmProvider {
  getEstimate(address: ValuationAddress): Promise<ValuationResult>;
}

function hashString(input: string): number {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    hash = (hash << 5) - hash + input.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

class MockAvmProvider implements AvmProvider {
  async getEstimate(address: ValuationAddress): Promise<ValuationResult> {
    const seed = hashString(`${address.street}${address.city}${address.zip}`);
    const base = 180_000 + (seed % 260_000); // rough Brownwood-area band for placeholder purposes
    const estimate = Math.round(base / 1000) * 1000;
    return {
      address,
      estimate,
      rangeLow: Math.round((estimate * 0.93) / 1000) * 1000,
      rangeHigh: Math.round((estimate * 1.07) / 1000) * 1000,
      confidence: "medium",
    };
  }
}

export const avmProvider: AvmProvider = new MockAvmProvider();

export async function getHomeValuation(address: ValuationAddress): Promise<ValuationResult> {
  return avmProvider.getEstimate(address);
}

export async function submitValuationRequest(
  request: ValuationRequest
): Promise<{ result: ValuationResult; leadSubmitted: boolean }> {
  const result = await getHomeValuation(request.address);

  const lead: Lead = {
    type: "valuation",
    name: request.name,
    email: request.email,
    phone: request.phone,
    consent: request.consent,
    message: `Home valuation request for ${request.address.street}, ${request.address.city}, ${request.address.state} ${request.address.zip}`,
    meta: {
      interest: request.interest,
      estimate: result.estimate,
    },
  };

  const { success } = await submitLead(lead);
  return { result, leadSubmitted: success };
}
