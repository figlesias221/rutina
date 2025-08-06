import { createClient } from '@supabase/supabase-js';

// Database types
export interface UserData {
  id?: string;
  user_id: string;
  data_type: 'gym_routine' | 'cardio_sessions' | 'weekly_plan';
  data: any; // This will be our JSON data (GymRoutine, CardioSessions, WeeklyPlan)
  updated_at?: string;
  created_at?: string;
}

// Get environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Check if we have valid credentials
const hasValidCredentials = 
  supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl !== 'your_supabase_project_url' &&
  supabaseAnonKey !== 'your_supabase_anon_key';

// Create Supabase client only if we have valid credentials
export const supabase = hasValidCredentials
  ? createClient(supabaseUrl!, supabaseAnonKey!)
  : null;

// Helper to check if Supabase is configured
export const isSupabaseConfigured = () => {
  return supabase !== null;
};

// Get or create a user ID (stored in localStorage)
export const getUserId = (): string => {
  if (typeof window === 'undefined') return 'default';
  
  let userId = localStorage.getItem('rutina-user-id');
  if (!userId) {
    // Generate a simple user ID (could be email or random string)
    userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem('rutina-user-id', userId);
  }
  return userId;
};