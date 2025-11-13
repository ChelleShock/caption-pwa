import { createClient, SupabaseClient } from '@supabase/supabase-js'

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || ''
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

// If the env vars are present, create a normal Supabase client.
// Otherwise expose a safe stub so the UI doesn't throw while Supabase is down.
let supabase: SupabaseClient | any

if (SUPABASE_URL && SUPABASE_ANON_KEY) {
  supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
} else {
  console.warn('Supabase not configured — using local stub. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to enable remote features.')
  // Minimal stub implementation used during offline development or when Supabase is unavailable.
  supabase = {
    auth: {
      getSession: async () => ({ data: { session: null }, error: null }),
      onAuthStateChange: (_cb: any) => ({ subscription: { unsubscribe() {} } }),
      signInWithOtp: async (_: any) => ({ data: null, error: new Error('Supabase not configured') }),
      signOut: async () => ({ error: new Error('Supabase not configured') })
    },
    from: (_table: string) => ({
      upsert: async (_rows: any) => ({ data: null, error: new Error('Supabase not configured') }),
      insert: async (_rows: any) => ({ data: null, error: new Error('Supabase not configured') }),
      select: async () => ({ data: [], error: null })
    })
  }
}

export { supabase }
export default supabase
