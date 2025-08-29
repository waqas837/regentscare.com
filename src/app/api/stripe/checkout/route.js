import { NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export async function POST(request) {
  try {
    const { success_url, cancel_url } = await request.json()

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'gbp',
            product_data: {
              name: 'RegentsCare Seat',
              description: 'Monthly subscription for one consultant seat',
            },
            unit_amount: 14900, // £149.00 in pence
            recurring: {
              interval: 'month',
            },
          },
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: success_url || `${process.env.NEXT_PUBLIC_BASE_URL}/billing/success`,
      cancel_url: cancel_url || `${process.env.NEXT_PUBLIC_BASE_URL}/billing/cancel`,
      metadata: {
        product: 'regentscare-seat',
      },
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('Stripe checkout error:', error)
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    )
  }
}
