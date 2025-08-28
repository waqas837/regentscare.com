-- Add demo seat for client requirements
-- Run this in your Supabase SQL editor

INSERT INTO seats (seat_id, consultant_name, booking_email, specialty, hospitals, logo_url) 
VALUES (
    'demo', 
    'Prof Demo Consultant', 
    'info@regentscare.com', 
    'ENT', 
    'The London Clinic', 
    ''
)
ON CONFLICT (seat_id) DO UPDATE SET
    consultant_name = 'Prof Demo Consultant',
    booking_email = 'info@regentscare.com',
    specialty = 'ENT',
    hospitals = 'The London Clinic',
    updated_at = NOW();
