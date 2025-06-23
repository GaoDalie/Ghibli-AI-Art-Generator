// /app/api/stripe/webhook/route.js
import { NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
})

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET

export async function POST(request) {
  const body = await request.text()
  const sig = request.headers.get('stripe-signature')

  let event

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret)
    console.log('Webhook event received:', event.type)
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message)
    return NextResponse.json({ error: 'Webhook error' }, { status: 400 })
  }

  // Handle the event
  try {
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object
        console.log('Payment succeeded for session:', session.id)
        
        if (session.mode === 'subscription') {
          await handleSubscriptionPayment(session)
        } else if (session.mode === 'payment') {
          await handleOneTimePayment(session)
        }
        break

      case 'customer.subscription.created':
        const newSubscription = event.data.object
        console.log('New subscription created:', newSubscription.id)
        await handleNewSubscription(newSubscription)
        break

      case 'customer.subscription.updated':
        const updatedSubscription = event.data.object
        console.log('Subscription updated:', updatedSubscription.id)
        await handleSubscriptionUpdate(updatedSubscription)
        break

      case 'customer.subscription.deleted':
        const deletedSubscription = event.data.object
        console.log('Subscription cancelled:', deletedSubscription.id)
        await handleSubscriptionCancellation(deletedSubscription)
        break

      case 'invoice.payment_succeeded':
        const invoice = event.data.object
        console.log('Invoice payment succeeded:', invoice.id)
        await handleInvoicePaymentSucceeded(invoice)
        break

      case 'invoice.payment_failed':
        const failedInvoice = event.data.object
        console.log('Invoice payment failed:', failedInvoice.id)
        await handleInvoicePaymentFailed(failedInvoice)
        break

      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object
        console.log('One-time payment succeeded:', paymentIntent.id)
        await handleOneTimePaymentIntent(paymentIntent)
        break

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Error processing webhook:', error)
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 })
  }
}

// Handle subscription payment (monthly/yearly)
async function handleSubscriptionPayment(session) {
  const planName = session.metadata.planName
  
  try {
    console.log(`Processing subscription payment for user ${session.metadata.userId}, plan: ${planName}`)
    
    // Update user's subscription status in your database
    const creditsToAdd = getCreditsForSubscriptionPlan(planName)
    console.log(`Adding ${creditsToAdd} credits to user ${session.metadata.userId}`)
    
    // Database operations would go here:
    // const userId = session.metadata.userId
    // await updateUserSubscription(userId, {
    //   stripeCustomerId: session.customer,
    //   subscriptionId: session.subscription,
    //   planName: planName,
    //   status: 'active',
    //   startDate: new Date(),
    // })
    // await addCreditsToUser(userId, creditsToAdd)
    
  } catch (error) {
    console.error('Error handling subscription payment:', error)
  }
}

// Handle one-time payment (pay as you go)
async function handleOneTimePayment(session) {
  const planName = session.metadata.planName
  
  try {
    console.log(`Processing one-time payment for user ${session.metadata.userId}, plan: ${planName}`)
    
    // Add credits based on the pack purchased
    const creditsToAdd = getCreditsForOneTimePlan(planName)
    console.log(`Adding ${creditsToAdd} credits to user ${session.metadata.userId}`)
    
    // Database operations would go here:
    // const userId = session.metadata.userId
    // await addCreditsToUser(userId, creditsToAdd)
    // await recordOneTimePayment(userId, {
    //   sessionId: session.id,
    //   planName: planName,
    //   creditsAdded: creditsToAdd,
    //   amount: session.amount_total,
    //   currency: session.currency,
    //   paymentDate: new Date(),
    // })
    
  } catch (error) {
    console.error('Error handling one-time payment:', error)
  }
}

// Handle payment intent for one-time purchases
async function handleOneTimePaymentIntent(paymentIntent) {
  const planName = paymentIntent.metadata.planName
  
  try {
    console.log(`One-time payment intent succeeded for user ${paymentIntent.metadata.userId}`)
    
    // This handles the actual payment completion for one-time purchases
    if (paymentIntent.metadata.paymentType === 'one_time_credits') {
      const creditsToAdd = getCreditsForOneTimePlan(planName)
      console.log(`Payment intent: Adding ${creditsToAdd} credits to user ${paymentIntent.metadata.userId}`)
      
      // Database operations would go here:
      // const userId = paymentIntent.metadata.userId
      // await addCreditsToUser(userId, creditsToAdd)
    }
    
  } catch (error) {
    console.error('Error handling payment intent:', error)
  }
}

// Handle new subscription
async function handleNewSubscription(subscription) {
  try {
    console.log(`New subscription created for user ${subscription.metadata.userId}`)
    
    // Update subscription status
    // const userId = subscription.metadata.userId
    // await updateUserSubscription(userId, {
    //   subscriptionId: subscription.id,
    //   status: subscription.status,
    //   currentPeriodStart: new Date(subscription.current_period_start * 1000),
    //   currentPeriodEnd: new Date(subscription.current_period_end * 1000),
    // })
    
  } catch (error) {
    console.error('Error handling new subscription:', error)
  }
}

// Handle subscription update
async function handleSubscriptionUpdate(subscription) {
  try {
    console.log(`Subscription updated for user ${subscription.metadata.userId}`)
    
    // Update subscription details
    // const userId = subscription.metadata.userId
    // await updateUserSubscription(userId, {
    //   status: subscription.status,
    //   currentPeriodStart: new Date(subscription.current_period_start * 1000),
    //   currentPeriodEnd: new Date(subscription.current_period_end * 1000),
    // })
    
  } catch (error) {
    console.error('Error handling subscription update:', error)
  }
}

// Handle subscription cancellation
async function handleSubscriptionCancellation(subscription) {
  try {
    console.log(`Subscription cancelled for user ${subscription.metadata.userId}`)
    
    // Update user to cancelled status
    // const userId = subscription.metadata.userId
    // await updateUserSubscription(userId, {
    //   status: 'cancelled',
    //   cancelledAt: new Date(),
    // })
    
    // Optionally send cancellation email
    
  } catch (error) {
    console.error('Error handling subscription cancellation:', error)
  }
}

// Handle successful invoice payment (recurring)
async function handleInvoicePaymentSucceeded(invoice) {
  const subscriptionId = invoice.subscription
  
  try {
    console.log(`Invoice payment succeeded for subscription ${subscriptionId}`)
    
    // Add credits for the new billing period
    const subscription = await stripe.subscriptions.retrieve(subscriptionId)
    const planName = subscription.metadata.planName
    
    const creditsToAdd = getCreditsForSubscriptionPlan(planName)
    console.log(`Adding ${creditsToAdd} credits to user ${subscription.metadata.userId} for new billing period`)
    
    // const userId = subscription.metadata.userId
    // await addCreditsToUser(userId, creditsToAdd)
    
  } catch (error) {
    console.error('Error handling invoice payment succeeded:', error)
  }
}

// Handle failed invoice payment
async function handleInvoicePaymentFailed(invoice) {
  const subscriptionId = invoice.subscription
  
  try {
    console.log(`Invoice payment failed for subscription ${subscriptionId}`)
    
    // Get subscription details and notify user of payment failure
    // const subscription = await stripe.subscriptions.retrieve(subscriptionId)
    // const userId = subscription.metadata.userId
    // await sendPaymentFailureEmail(userId)
    
    // Optionally pause user's access after multiple failures
    
  } catch (error) {
    console.error('Error handling invoice payment failed:', error)
  }
}

// Helper function to get credits for subscription plans
function getCreditsForSubscriptionPlan(planName) {
  const subscriptionPlanCredits = {
    // Monthly Plans
    'Pro Monthly': 500,
    'Starter Monthly': 50,
    
    // Yearly Plans  
    'Pro Yearly': 6500,
    'Starter Yearly': 650,
  }
  
  return subscriptionPlanCredits[planName] || 0
}

// Helper function to get credits for one-time plans
function getCreditsForOneTimePlan(planName) {
  const oneTimePlanCredits = {
    // Pay-as-you-go Plans
    'Single Image': 1,
    'Credit Pack: Small': 30,
    'Credit Pack: Large': 300,
  }
  
  return oneTimePlanCredits[planName] || 0
}

// Helper functions you'll need to implement:
// - updateUserSubscription(userId, data)
// - addCreditsToUser(userId, credits)
// - recordOneTimePayment(userId, data)
// - sendPaymentFailureEmail(userId)
// - sendWelcomeEmail(userId)