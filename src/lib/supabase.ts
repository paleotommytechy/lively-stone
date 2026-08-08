// Supabase Client Helper for Lively Stone Portfolio & LMS
import { createClient } from '@supabase/supabase-js';

const env = (import.meta as any).env || {};
const supabaseUrl = env.VITE_SUPABASE_URL || 'https://lively-stone-placeholder.supabase.co';
const supabaseAnonKey = env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.placeholder';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});

export type UserRole = 'public' | 'student' | 'admin';

export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  role: UserRole;
  avatar_url?: string;
  current_pillar?: string;
  onboarding_completed?: boolean;
  profile_completion_pct?: number;
  biography?: string;
  phone?: string;
  gender?: string;
  date_of_birth?: string;
  country?: string;
  state?: string;
  city?: string;
  location?: string;
  occupation?: string;
  fellowship?: string;
  created_at?: string;
}
