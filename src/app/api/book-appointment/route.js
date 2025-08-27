'use server'

import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { generateBookingPDF } from '@/lib/pdf-generator'
import { renderToBuffer } from '@react-pdf/renderer'
import { ServerClient } from 'postmark'

// Email provider configuration
const EMAIL_PROVIDER = process.env.EMAIL_PROVIDER || 'postmark'

// Initialize Postmark client
const postmarkClient = new ServerClient(process.env.POSTMARK_TOKEN)

export async function POST(request) {
  try {
    const body = await request.json()
    const {
      seat_id,
      name,
      dob,
      email,
      phone,
      insurer,
      policy,
      urgency,
      summary,
      consent
    } = body

    // Validate required fields
    if (!seat_id || !name || !email || !consent) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Fetch seat data from Supabase (with cache busting)
    const { data: seatData, error: seatError } = await supabase
      .from('seats')
      .select('*')
      .eq('seat_id', seat_id)
      .single()
      .abortSignal(new AbortController().signal) // Force fresh data

    if (seatError || !seatData) {
      console.error('Seat not found:', seatError)
      return NextResponse.json(
        { error: 'Invalid booking link' },
        { status: 404 }
      )
    }

    // Log referral to Supabase
    const { error: logError } = await supabase
      .from('referrals')
      .insert({
        seat_id,
        patient_name: name,
        patient_email: email,
        patient_phone: phone,
        patient_dob: dob,
        insurer,
        policy,
        urgency,
        summary,
        consultant_name: seatData.consultant_name,
        booking_email: seatData.booking_email,
        created_at: new Date().toISOString()
      })

    if (logError) {
      console.error('Failed to log referral:', logError)
    }

    // Generate PDF
    const formData = {
      name,
      dob,
      email,
      phone,
      insurer,
      policy,
      urgency,
      summary,
      seat_id
    }
    
    const pdfDoc = generateBookingPDF(formData, seatData)
    const pdfBuffer = await renderToBuffer(pdfDoc)

    // Prepare email content
    const condition = summary ? summary.substring(0, 50) + (summary.length > 50 ? '...' : '') : 'General'
    const urgencyText = urgency === 'urgent' ? 'Urgent' : 'Soon'
    const subject = `New referral — ${condition} — ${urgencyText}`

    const emailContent = `
Dear ${seatData.consultant_name},

A new patient referral has been submitted through your booking link.

Patient Details:
- Name: ${name}
- Date of Birth: ${dob || 'Not provided'}
- Email: ${email}
- Phone: ${phone || 'Not provided'}
- Insurer: ${insurer || 'Not provided'}
- Policy: ${policy || 'Not provided'}
- Urgency: ${urgency || 'Not specified'}
- Summary: ${summary || 'Not provided'}

This referral was submitted on ${new Date().toLocaleString('en-GB', { 
  timeZone: 'Europe/London',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit'
})}.

Please review and respond to the patient directly.

Best regards,
Regents Care Team
    `.trim()

    // Send email based on provider
    let emailResult
    if (EMAIL_PROVIDER === 'postmark') {
      // Send via Postmark
      emailResult = await postmarkClient.sendEmail({
        From: process.env.FROM_EMAIL,
        To: seatData.booking_email,
        Cc: email, // Patient CC'd
        Bcc: process.env.AUDIT_BCC, // Audit BCC
        Subject: subject,
        TextBody: emailContent,
        Attachments: [
          {
            Name: `referral-${seat_id}-${Date.now()}.pdf`,
            Content: pdfBuffer.toString('base64'),
            ContentType: 'application/pdf'
          }
        ],
        MessageStream: process.env.MESSAGE_STREAM || 'outbound'
      })
    } else {
      throw new Error('Invalid email provider configured')
    }



    return NextResponse.json({
      success: true,
      message: 'Appointment request submitted successfully',
      messageId: emailResult?.MessageID || emailResult?.id
    })

  } catch (error) {
    console.error('Error processing booking:', error)
    return NextResponse.json(
      { error: 'Failed to process booking request' },
      { status: 500 }
    )
  }
}
