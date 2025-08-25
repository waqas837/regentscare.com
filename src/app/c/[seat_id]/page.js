import BookingForm from '@/components/BookingForm'
import { supabase } from '@/lib/supabase'
import { notFound } from 'next/navigation'

async function getSeatData(seatId) {
  try {
    console.log('🔍 [Dynamic Route] Fetching seat data for:', seatId)
    console.log('📡 [Dynamic Route] Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL)
    console.log('🔑 [Dynamic Route] Supabase Key exists:', !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
    
    const { data, error } = await supabase
      .from('seats')
      .select('*')
      .eq('seat_id', seatId)
      .single()

    console.log('📊 [Dynamic Route] Supabase response:', { data, error })

    if (error) {
      console.error('❌ [Dynamic Route] Supabase error:', error)
      return null
    }

    if (!data) {
      console.log('⚠️ [Dynamic Route] No data found for seat_id:', seatId)
      return null
    }

    console.log('✅ [Dynamic Route] Successfully fetched seat data:', data)
    return data
  } catch (error) {
    console.error('💥 [Dynamic Route] Unexpected error:', error)
    return null
  }
}

export default async function BookingPage({ params }) {
  const { seat_id } = params
  console.log('🎯 [Dynamic Route] Page params:', params)
  
  const seatData = await getSeatData(seat_id)

  if (!seatData) {
    console.log('🚫 [Dynamic Route] Calling notFound() for seat_id:', seat_id)
    notFound()
  }

  return (
    <div className="min-h-screen bg-white py-8">
      <BookingForm seatId={seat_id} seatData={seatData} />
    </div>
  )
}
