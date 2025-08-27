import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY



export const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

// Test function to check connectivity
export async function testSupabaseConnection() {
  try {
    console.log('🧪 Testing Supabase connection...')
    const { data, error } = await supabase
      .from('seats')
      .select('count')
      .limit(1)
    
    if (error) {
      console.error('❌ Supabase test failed:', error)
      return false
    }
    
    console.log('✅ Supabase connection successful!')
    return true
  } catch (error) {
    console.error('💥 Supabase test error:', error)
    return false
  }
}

// Database tables structure:
// seats: id, seat_id, doctor_name, practice_email, created_at
// referrals: id, seat_id, patient_name, dob, email, phone, insurer, policy, urgency, summary, consent, created_at
