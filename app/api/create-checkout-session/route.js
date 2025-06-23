// /app/api/create-checkout-session/route.js
import { NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
})

export async function POST(request) {
  try {
    const { priceId, quantity = 1, userId, planName, paymentType = 'subscription' } = await request.json()

    if (!priceId) {
      return NextResponse.json({ error: 'Price ID is required' }, { status: 400 })
    }

    console.log('Creating checkout session for:', { priceId, userId, planName, paymentType })

    // Base session configuration
    const sessionConfig = {
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: quantity,
        },
      ],
      success_url: `${request.headers.get('origin')}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.headers.get('origin')}/?canceled=true`,
      metadata: {
        userId: userId || 'anonymous',
        planName: planName || 'unknown',
        paymentType: paymentType,
      },
      // Automatic tax calculation (optional)
      automatic_tax: {
        enabled: true,
      },
      // Customer email (if available)
      ...(userId && { 
        customer_email: `user-${userId}@glorify.com` // You can get actual email from Clerk
      }),
      // Allow promotion codes
      allow_promotion_codes: true,
      // Billing address collection
      billing_address_collection: 'required',
    }

    // Configure based on payment type
    if (paymentType === 'subscription') {
      // Monthly/Yearly subscriptions
      sessionConfig.mode = 'subscription'
      sessionConfig.subscription_data = {
        metadata: {
          userId: userId || 'anonymous',
          planName: planName || 'unknown',
        },
        // Optional: Add trial period for subscriptions
        ...(planName?.includes('Monthly') || planName?.includes('Yearly') ? {
          trial_period_days: 7 // 7-day free trial
        } : {}),
      }
      
      // Phone number collection for subscriptions
      sessionConfig.phone_number_collection = {
        enabled: true,
      }
      
    } else {
      // One-time payments (Pay as you go)
      sessionConfig.mode = 'payment'
      sessionConfig.payment_intent_data = {
        metadata: {
          userId: userId || 'anonymous',
          planName: planName || 'unknown',
          paymentType: 'one_time_credits',
        },
        // Setup future usage for stored payment methods (optional)
        setup_future_usage: 'off_session',
      }
    }

    // Create Checkout Session
    const session = await stripe.checkout.sessions.create(sessionConfig)

    console.log('Checkout session created successfully:', {
      sessionId: session.id,
      mode: session.mode,
      planName: planName,
      userId: userId
    })

    return NextResponse.json({ 
      sessionId: session.id, 
      url: session.url,
      mode: session.mode,
      success: true
    })

  } catch (error) {
    console.error('Stripe checkout error:', error)
    
    // Handle specific Stripe errors
    let errorMessage = 'Error creating checkout session'
    
    if (error.type === 'StripeInvalidRequestError') {
      if (error.param === 'line_items[0].price') {
        errorMessage = 'Invalid price ID. Please contact support.'
      } else {
        errorMessage = `Invalid request: ${error.message}`
      }
    } else if (error.type === 'StripeAPIError') {
      errorMessage = 'Payment service temporarily unavailable. Please try again.'
    } else if (error.type === 'StripeConnectionError') {
      errorMessage = 'Network error. Please check your connection and try again.'
    } else if (error.type === 'StripeAuthenticationError') {
      errorMessage = 'Payment service configuration error. Please contact support.'
    } else {
      errorMessage = error.message || 'Unknown error occurred'
    }
    
    return NextResponse.json(
      { 
        error: errorMessage,
        type: error.type || 'unknown_error',
        success: false
      },
      { status: 500 }
    )
  }
}