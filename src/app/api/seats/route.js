import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// GET - List all seats
export async function GET() {
  try {
    const { data, error } = await supabase
      .from('seats')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      return NextResponse.json(
        { error: 'Failed to fetch seats', details: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({ seats: data })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    )
  }
}

// POST - Add new seat
export async function POST(request) {
  try {
    const body = await request.json()
    const { seat_id, consultant_name, booking_email, specialty, hospitals, logo_url } = body

    // Validate required fields
    if (!seat_id || !consultant_name || !booking_email) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Check if seat_id already exists
    const { data: existingSeat } = await supabase
      .from('seats')
      .select('id')
      .eq('seat_id', seat_id)
      .single()

    if (existingSeat) {
      return NextResponse.json(
        { error: 'Seat ID already exists' },
        { status: 400 }
      )
    }

    // Insert new seat
    const { data, error } = await supabase
      .from('seats')
      .insert({
        seat_id,
        consultant_name,
        booking_email,
        specialty,
        hospitals,
        logo_url
      })
      .select()
      .single()

    if (error) {
      return NextResponse.json(
        { error: 'Failed to create seat' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      seat: data
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// PUT - Update seat
export async function PUT(request) {
  try {
    const body = await request.json()
    const { id, seat_id, consultant_name, booking_email, specialty, hospitals, logo_url } = body

    if (!id) {
      return NextResponse.json(
        { error: 'Seat ID is required' },
        { status: 400 }
      )
    }

    const updateData = {}
    if (seat_id) updateData.seat_id = seat_id
    if (consultant_name) updateData.consultant_name = consultant_name
    if (booking_email) updateData.booking_email = booking_email
    if (specialty) updateData.specialty = specialty
    if (hospitals) updateData.hospitals = hospitals
    if (logo_url) updateData.logo_url = logo_url

    const { data, error } = await supabase
      .from('seats')
      .update(updateData)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      return NextResponse.json(
        { error: 'Failed to update seat' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      seat: data
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// DELETE - Delete seat
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'Seat ID is required' },
        { status: 400 }
      )
    }

    const { error } = await supabase
      .from('seats')
      .delete()
      .eq('id', id)

    if (error) {
      return NextResponse.json(
        { error: 'Failed to delete seat' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Seat deleted successfully'
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
