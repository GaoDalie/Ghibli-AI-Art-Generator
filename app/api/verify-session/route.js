// /app/api/verify-session/route.js
import { NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
})

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const sessionId = searchParams.get('session_id')

    if (!sessionId) {
      return NextResponse.json({ error: 'Session ID is required' }, { status: 400 })
    }

    console.log('Verifying session:', sessionId)

    // Retrieve the checkout session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['line_items', 'customer', 'subscription', 'payment_intent']
    })

    if (!session) {
      return NextResponse.json({ error: 'Session not found' }, { status: 404 })
    }

    // Check if payment was successful
    const isSuccessful = session.payment_status === 'paid'

    // Return session details
    const response = {
      id: session.id,
      payment_status: session.payment_status,
      customer_email: session.customer_details?.email,
      amount_total: session.amount_total,
      currency: session.currency,
      mode: session.mode, // 'subscription' or 'payment'
      metadata: session.metadata,
      subscription: session.subscription,
      payment_intent: session.payment_intent,
      created: session.created,
      success: isSuccessful,
      // Additional session details
      status: session.status,
      customer: session.customer,
      line_items: session.line_items?.data || [],
    }

    console.log('Session verified successfully:', {
      id: session.id,
      status: session.payment_status,
      mode: session.mode,
      planName: session.metadata?.planName
    })

    return NextResponse.json(response)

  } catch (error) {
    console.error('Error verifying session:', error)
    
    // Handle specific Stripe errors
    if (error.type === 'StripeInvalidRequestError') {
      return NextResponse.json(
        { error: 'Invalid session ID' },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: `Error retrieving session: ${error.message}` },
      { status: 500 }
    )
  }
}