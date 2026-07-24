import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Server-only client used to insert new reviews with the service-role key,
 * bypassing RLS so the public anon key never needs insert access. Returns
 * null until SUPABASE_SERVICE_ROLE_KEY is set — see lib/reviews.ts for the
 * console-log fallback used until then.
 */
let client: SupabaseClient | null = null;

export function getSupabaseServerClient(): SupabaseClient | null {
  if (client) return client;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) return null;

  client = createClient(url, serviceKey, { auth: { persistSession: false } });
  return client;
}
