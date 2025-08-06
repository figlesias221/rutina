-- Supabase Database Setup for Rutina Gym App
-- Run this SQL in your Supabase SQL Editor

-- Create the user_data table
CREATE TABLE IF NOT EXISTS user_data (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL,
  data_type TEXT NOT NULL CHECK (data_type IN ('gym_routine', 'cardio_sessions', 'weekly_plan')),
  data JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, data_type)
);

-- Create an index for faster queries
CREATE INDEX IF NOT EXISTS idx_user_data_lookup ON user_data(user_id, data_type);

-- Enable Row Level Security
ALTER TABLE user_data ENABLE ROW LEVEL SECURITY;

-- Create a simple policy that allows all operations
-- (In production, you'd want more restrictive policies)
CREATE POLICY "Enable all operations for all users" ON user_data
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Create updated_at trigger to automatically update the timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_user_data_updated_at
  BEFORE UPDATE ON user_data
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();