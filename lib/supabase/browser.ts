import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Public (anon-key) client used from the browser to read approved reviews
 * and subscribe to new ones in real time. Returns null until
 * NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY are set, so the
 * site keeps working (with just the static seed testimonials) before the
 * client's Supabase project is connected.
 */
let client: SupabaseClient | null = null;

export function getSupabaseBrowserClient(): SupabaseClient | null {
  if (client) return client;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) return null;

  client = createClient(url, anonKey);
  return client;
}
