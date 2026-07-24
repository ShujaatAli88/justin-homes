import { getSupabaseServerClient } from "@/lib/supabase/server";

/**
 * Customer-review submission, backed by Supabase.
 *
 * TODO(client): create a `reviews` table in your Supabase project and set
 * NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, and
 * SUPABASE_SERVICE_ROLE_KEY in the environment. SQL + setup steps are in
 * README.md. Until those are set, submissions are only logged server-side
 * (same pattern as lib/crm.ts) so the form can be built/tested end-to-end.
 */

export interface CustomerReview {
  id: string;
  author: string;
  role: string | null;
  location: string | null;
  rating: number;
  quote: string;
  createdAt: string;
}

export interface NewReviewInput {
  author: string;
  role?: string;
  location?: string;
  rating: number;
  quote: string;
  consent: boolean;
}

export interface ReviewSubmitResult {
  success: boolean;
  error?: string;
}

export async function submitReview(input: NewReviewInput): Promise<ReviewSubmitResult> {
  if (!input.consent) {
    return { success: false, error: "Consent is required before a review can be published." };
  }
  if (!input.author?.trim() || !input.quote?.trim()) {
    return { success: false, error: "Name and review text are required." };
  }
  if (!Number.isInteger(input.rating) || input.rating < 1 || input.rating > 5) {
    return { success: false, error: "Rating must be between 1 and 5." };
  }

  const supabase = getSupabaseServerClient();

  if (!supabase) {
    // TODO(client): remove this fallback once Supabase credentials are supplied.
    console.log("[reviews] (mock) review captured:", input);
    return { success: true };
  }

  const { error } = await supabase.from("reviews").insert({
    author: input.author.trim(),
    role: input.role?.trim() || null,
    location: input.location?.trim() || null,
    rating: input.rating,
    quote: input.quote.trim(),
    is_approved: true,
  });

  if (error) {
    return { success: false, error: error.message };
  }
  return { success: true };
}

export const REVIEW_CONSENT_TEXT =
  "By submitting, you confirm this review reflects your genuine experience with Cadenhead Realty Group and give us permission to publish it on this website.";
