import BookingForm from '@/components/BookingForm'
import { supabase } from '@/lib/supabase'
import { notFound } from 'next/navigation'

async function getSeatData(seatId) {
  try {
    const { data, error } = await supabase
      .from('seats')
      .select('*')
      .eq('seat_id', seatId)
      .single()

    if (error) {
      return null
    }

    if (!data) {
      return null
    }

    return data
  } catch (error) {
    return null
  }
}

export default async function BookingPage({ params }) {
  const { seat_id } = params
  
  const seatData = await getSeatData(seat_id)

  if (!seatData) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-white py-8">
      <BookingForm seatId={seat_id} seatData={seatData} />
    </div>
  )
}
