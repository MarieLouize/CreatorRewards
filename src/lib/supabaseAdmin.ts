import { createClient } from '@supabase/supabase-js';

const supabaseUrl = (import.meta.env.VITE_SUPABASE_URL as string) || 'https://placeholder.supabase.co';
const supabaseServiceKey = (import.meta.env.VITE_SUPABASE_SERVICE_KEY as string) || 'placeholder-service-key';

// WARNING: This client bypasses RLS. Only import this in AdminPage — never in public pages.
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);
