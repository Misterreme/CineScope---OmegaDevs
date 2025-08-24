-- Cines Scope Database Schema for Supabase
-- This script creates the necessary tables for user movie lists

-- Create user_movie_lists table
CREATE TABLE IF NOT EXISTS user_movie_lists (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    imdb_id VARCHAR(20) NOT NULL,
    title VARCHAR(500) NOT NULL,
    year VARCHAR(10),
    poster TEXT,
    list_type VARCHAR(20) NOT NULL CHECK (list_type IN ('watchlist', 'watched', 'saved', 'favorites')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Ensure a user can't have the same movie in multiple lists
    UNIQUE(user_id, imdb_id)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_user_movie_lists_user_id ON user_movie_lists(user_id);
CREATE INDEX IF NOT EXISTS idx_user_movie_lists_list_type ON user_movie_lists(list_type);
CREATE INDEX IF NOT EXISTS idx_user_movie_lists_imdb_id ON user_movie_lists(imdb_id);

-- Enable Row Level Security
ALTER TABLE user_movie_lists ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
-- Users can only see their own movie lists
CREATE POLICY "Users can view their own movie lists" ON user_movie_lists
    FOR SELECT TO authenticated USING (auth.uid() = user_id);

-- Users can insert their own movie lists
CREATE POLICY "Users can insert their own movie lists" ON user_movie_lists
    FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

-- Users can update their own movie lists
CREATE POLICY "Users can update their own movie lists" ON user_movie_lists
    FOR UPDATE TO authenticated USING (auth.uid() = user_id);

-- Users can delete their own movie lists
CREATE POLICY "Users can delete their own movie lists" ON user_movie_lists
    FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_user_movie_lists_updated_at 
    BEFORE UPDATE ON user_movie_lists 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();