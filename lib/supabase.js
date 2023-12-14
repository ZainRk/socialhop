import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database
export const supabase =
  globalThis.supabase ||
  createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLIC_ANON_KEY
  );

if (process.env.NODE_ENV !== "production") globalThis.supabase = supabase;
