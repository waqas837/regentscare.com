-- Regents Care Database Setup
-- Run these SQL commands in your Supabase SQL editor

-- Create seats table
CREATE TABLE IF NOT EXISTS seats (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    seat_id VARCHAR(255) UNIQUE NOT NULL,
    doctor_name VARCHAR(255) NOT NULL,
    practice_email VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create referrals table
CREATE TABLE IF NOT EXISTS referrals (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    seat_id VARCHAR(255) NOT NULL,
    patient_name VARCHAR(255) NOT NULL,
    dob DATE NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    insurer VARCHAR(255),
    policy VARCHAR(255),
    urgency VARCHAR(50) DEFAULT 'routine',
    summary TEXT NOT NULL,
    consent BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    FOREIGN KEY (seat_id) REFERENCES seats(seat_id) ON DELETE CASCADE
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_seats_seat_id ON seats(seat_id);
CREATE INDEX IF NOT EXISTS idx_referrals_seat_id ON referrals(seat_id);
CREATE INDEX IF NOT EXISTS idx_referrals_created_at ON referrals(created_at);

-- Enable Row Level Security (RLS)
ALTER TABLE seats ENABLE ROW LEVEL SECURITY;
ALTER TABLE referrals ENABLE ROW LEVEL SECURITY;

-- Create policies for seats table
CREATE POLICY "Allow public read access to seats" ON seats
    FOR SELECT USING (true);

CREATE POLICY "Allow authenticated insert to seats" ON seats
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow authenticated update to seats" ON seats
    FOR UPDATE USING (true);

CREATE POLICY "Allow authenticated delete from seats" ON seats
    FOR DELETE USING (true);

-- Create policies for referrals table
CREATE POLICY "Allow public insert to referrals" ON referrals
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow authenticated read access to referrals" ON referrals
    FOR SELECT USING (true);

-- Insert demo seat for testing
INSERT INTO seats (seat_id, doctor_name, practice_email) 
VALUES ('demo-doctor', 'Dr. Jane Smith', 'demo@regentscare.com')
ON CONFLICT (seat_id) DO NOTHING;

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for seats table
CREATE TRIGGER update_seats_updated_at 
    BEFORE UPDATE ON seats 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();
