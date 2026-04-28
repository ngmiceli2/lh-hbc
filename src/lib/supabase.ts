import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY

if (!supabaseUrl || !supabaseKey) {
  console.warn('Supabase credentials are missing. Check your .env file.')
} else {
  console.log('Supabase URL found:', supabaseUrl.substring(0, 10) + '...')
}

export const supabase = createClient(supabaseUrl, supabaseKey);
