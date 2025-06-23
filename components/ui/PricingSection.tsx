"use client"

import { useState } from "react"
import { useUser } from "@clerk/nextjs"
import { useRouter } from 'next/navigation'

// Define types for component props
interface ButtonProps {
 children: React.ReactNode
 className?: string
 onClick?: () => void
 style?: React.CSSProperties
 disabled?: boolean
}

interface BadgeProps {
 children: React.ReactNode
 className?: string
 style?: React.CSSProperties
}

interface IconProps {
 className?: string
}

// Simple inline components to replace shadcn
const Button = ({ children, className, style, disabled, ...props }: ButtonProps) => (
 <button 
   className={`px-4 py-2 rounded-lg font-medium transition-colors ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`} 
   style={style} 
   disabled={disabled}
   {...props}
 >
   {children}
 </button>
)

const Badge = ({ children, className, style }: BadgeProps) => (
 <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${className}`} style={style}>
   {children}
 </span>
)

// Simple check icon component
const Check = ({ className }: IconProps) => (
 <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
 </svg>
)

// Simple zap icon component  
const Zap = ({ className }: IconProps) => (
 <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
 </svg>
)

// Define plan interface
interface Plan {
 name: string
 price: string
 priceId: string // Stripe Price ID
 currency?: string
 description: string
 subDescription?: string
 features: string[]
 buttonText: string
 buttonVariant: "outline" | "default"
 popular: boolean
 note?: string
 badge?: string
 paymentType: "subscription" | "payment" // subscription for monthly/yearly, payment for one-time
}

export default function PricingSection() {
 const { user, isSignedIn } = useUser()
 const router = useRouter()
 const [selectedPlan, setSelectedPlan] = useState<"monthly" | "yearly" | "payasyougo">("yearly")
 const [loadingPlan, setLoadingPlan] = useState<string | null>(null)

 const monthlyPlans: Plan[] = [
   {
     name: "Free Trial",
     price: "Free",
     priceId: "", // No price ID for free trial
     description: "3 Free Credits for New Users",
     features: ["1 credit per image generation", "High-resolution output", "Limited Support", "Watermarked images"],
     buttonText: "Try Studio Ghibli AI Now!",
     buttonVariant: "outline",
     popular: false,
     paymentType: "payment"
   },
   {
     name: "Pro Monthly",
     price: "$19.99",
     priceId: "price_1234567890pro_monthly", // Replace with your actual Stripe Price ID
     currency: "USD",
     description: "500 images per month",
     features: ["500 credits monthly", "High-resolution output", "24/7 priority support", "No watermark"],
     buttonText: "Get Pro",
     buttonVariant: "default",
     popular: true,
     note: "Best value!",
     paymentType: "subscription"
   },
   {
     name: "Starter Monthly",
     price: "$9.99",
     priceId: "price_1234567890starter_monthly", // Replace with your actual Stripe Price ID
     currency: "USD",
     description: "50 images per month",
     features: ["50 credits monthly", "High-resolution output", "Priority support", "No watermark"],
     buttonText: "Get Starter",
     buttonVariant: "default",
     popular: false,
     note: "Perfect for hobbyists!",
     paymentType: "subscription"
   },
 ]

 const yearlyPlans: Plan[] = [
   {
     name: "Free Trial",
     price: "Free",
     priceId: "", // No price ID for free trial
     description: "3 Free Credits for New Users",
     features: ["1 credit per image generation", "High-resolution output", "Limited Support", "Watermarked images"],
     buttonText: "Try Studio Ghibli AI Now!",
     buttonVariant: "outline",
     popular: false,
     paymentType: "payment"
   },
   {
     name: "Pro Yearly",
     price: "$199.99",
     priceId: "price_1234567890pro_yearly", // Replace with your actual Stripe Price ID
     currency: "USD",
     description: "6500 images per year",
     features: [
       "6500 credits yearly (500+ per month)",
       "High-resolution output",
       "24/7 priority support",
       "No watermark",
     ],
     buttonText: "Get Pro",
     buttonVariant: "default",
     popular: true,
     note: "Save $39.89 yearly!",
     badge: "Best Deal",
     paymentType: "subscription"
   },
   {
     name: "Starter Yearly",
     price: "$99.99",
     priceId: "price_1234567890starter_yearly", // Replace with your actual Stripe Price ID
     currency: "USD",
     description: "650 images per year",
     features: ["650 credits yearly (50+ per month)", "High resolution output", "Priority support", "No watermark"],
     buttonText: "Get Starter",
     buttonVariant: "default",
     popular: false,
     note: "Save $19.89 yearly!",
     paymentType: "subscription"
   },
 ]

 const payAsYouGoPlans: Plan[] = [
   {
     name: "Single Image",
     price: "$0.90",
     priceId: "price_1234567890single", // Replace with your actual Stripe Price ID
     currency: "USD",
     description: "Try before you subscribe",
     features: [
       "1 credit",
       "One-time purchase",
       "High-resolution output",
       "Email support",
       "No watermark",
       "Credits never expire",
     ],
     buttonText: "Get Credit",
     buttonVariant: "default",
     popular: false,
     paymentType: "payment"
   },
   {
     name: "Credit Pack: Large",
     price: "$29.99",
     priceId: "price_1234567890large_pack", // Replace with your actual Stripe Price ID
     currency: "USD",
     description: "$0.10 per image",
     subDescription: "Everything in Small pack, plus",
     features: [
       "300 credits",
       "One-time purchase",
       "High-resolution output",
       "24/7 support",
       "No watermark",
       "Credits never expire",
     ],
     buttonText: "Get Credits",
     buttonVariant: "default",
     popular: true,
     paymentType: "payment"
   },
   {
     name: "Credit Pack: Small",
     price: "$8.99",
     priceId: "price_1234567890small_pack", // Replace with your actual Stripe Price ID
     currency: "USD",
     description: "$0.30 per image",
     features: [
       "30 credits",
       "One-time purchase",
       "High-resolution output",
       "Priority support",
       "No watermark",
       "Credits never expire",
     ],
     buttonText: "Get Credits",
     buttonVariant: "default",
     popular: false,
     paymentType: "payment"
   },
 ]

 const getCurrentPlans = (): Plan[] => {
   switch (selectedPlan) {
     case "monthly":
       return monthlyPlans
     case "yearly":
       return yearlyPlans
     case "payasyougo":
       return payAsYouGoPlans
     default:
       return yearlyPlans
   }
 }

 const handlePlanSelect = async (plan: Plan) => {
   console.log('Plan selected:', plan.name)

   // Handle free trial
   if (plan.name === "Free Trial") {
     if (!isSignedIn) {
       router.push('/sign-up')
       return
     }
     // Redirect to generate page for free trial
     router.push('/generate')
     return
   }

   // Redirect to sign up if not signed in
   if (!isSignedIn) {
     console.log('User not signed in, redirecting to sign-up')
     router.push('/sign-up')
     return
   }

   if (!plan.priceId) {
     console.error('No price ID for plan:', plan.name)
     alert('Plan configuration error. Please contact support.')
     return
   }

   setLoadingPlan(plan.name)

   try {
     console.log('Creating checkout session for:', plan.name, 'Type:', plan.paymentType)

     // Create checkout session
     const response = await fetch('/api/create-checkout-session', {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json',
       },
       body: JSON.stringify({
         priceId: plan.priceId,
         quantity: 1,
         userId: user?.id,
         planName: plan.name,
         paymentType: plan.paymentType // subscription or payment
       }),
     })

     if (!response.ok) {
       const errorData = await response.json()
       throw new Error(errorData.error || 'Failed to create checkout session')
     }

     const { url, sessionId } = await response.json()
     console.log('Checkout session created:', sessionId)

     if (url) {
       console.log('Redirecting to Stripe Checkout:', url)
       // Redirect to Stripe Checkout
       window.location.href = url
     } else {
       throw new Error('No checkout URL returned')
     }

   } catch (error: unknown) {
     console.error('Payment error:', error)
     const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred'
     alert(`Payment failed: ${errorMessage}. Please try again.`)
   } finally {
     setLoadingPlan(null)
   }
 }

 return (
   <section className="py-20 px-4" style={{ backgroundColor: '#FFF8F4' }}>
     <div className="max-w-7xl mx-auto">
       {/* Header */}
       <div className="text-center mb-12">
         <h2 className="text-5xl font-bold text-gray-900 mb-4">Pricing</h2>
         <p className="text-xl text-gray-600 max-w-3xl mx-auto">
           Experience the full power of Studio Ghibli AI. Choose the plan that is right for you.
         </p>
       </div>

       {/* Plan Toggle */}
       <div className="flex justify-center mb-12">
         <div className="p-1 rounded-lg flex" style={{ backgroundColor: 'rgba(64, 93, 233, 0.1)' }}>
           <button
             onClick={() => setSelectedPlan("monthly")}
             className={`px-6 py-3 rounded-md text-sm font-medium transition-all ${
               selectedPlan === "monthly" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"
             }`}
           >
             Subscribe Monthly
           </button>
           <button
             onClick={() => setSelectedPlan("yearly")}
             className={`px-6 py-3 rounded-md text-sm font-medium transition-all relative ${
               selectedPlan === "yearly" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"
             }`}
           >
             Subscribe Yearly
             <Badge className="absolute -top-2 -right-2 text-white text-xs" style={{ backgroundColor: '#405DE9' }}>Save 17%</Badge>
           </button>
           <button
             onClick={() => setSelectedPlan("payasyougo")}
             className={`px-6 py-3 rounded-md text-sm font-medium transition-all ${
               selectedPlan === "payasyougo" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"
             }`}
           >
             Pay as you go
           </button>
         </div>
       </div>

       {/* Pricing Cards */}
       <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
         {getCurrentPlans().map((plan) => (
           <div
             key={plan.name}
             className={`relative bg-white rounded-2xl p-8 border-2 transition-all hover:shadow-lg ${
               plan.popular ? "shadow-md" : "border-gray-200"
             }`}
             style={plan.popular ? { borderColor: '#405DE9' } : {}}
           >
             {plan.badge && (
               <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 text-white" style={{ backgroundColor: '#405DE9' }}>
                 {plan.badge}
               </Badge>
             )}
             {plan.popular && !plan.badge && (
               <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 text-white" style={{ backgroundColor: '#405DE9' }}>
                 Popular
               </Badge>
             )}

             <div className="text-center mb-6">
               <h3 className="text-xl font-semibold text-gray-900 mb-2">{plan.name}</h3>
               <div className="mb-2">
                 <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                 {plan.currency && <span className="text-lg text-gray-600 ml-1">{plan.currency}</span>}
               </div>
               <p className="text-gray-600">{plan.description}</p>
               {plan.subDescription && <p className="text-gray-600 text-sm mt-1">{plan.subDescription}</p>}
             </div>

             <div className="mb-8">
               <h4 className="font-semibold text-gray-900 mb-4">Includes</h4>
               <ul className="space-y-3">
                 {plan.features.map((feature, featureIndex) => (
                   <li key={featureIndex} className="flex items-start">
                     <Check className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                     <span className="text-gray-700">{feature}</span>
                   </li>
                 ))}
               </ul>
             </div>

             <Button
               onClick={() => handlePlanSelect(plan)}
               disabled={loadingPlan === plan.name}
               className={`w-full py-3 font-semibold transition-colors ${
                 plan.buttonVariant === "outline"
                   ? "bg-transparent border-2"
                   : "text-white hover:opacity-90"
               }`}
               style={
                 plan.buttonVariant === "outline"
                   ? { borderColor: '#405DE9', color: '#405DE9' }
                   : { backgroundColor: '#405DE9' }
               }
             >
               {loadingPlan === plan.name ? (
                 <>
                   <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2 inline-block"></div>
                   Processing...
                 </>
               ) : (
                 <>
                   {plan.buttonText}
                   <Zap className="w-4 h-4 ml-2 inline-block" />
                 </>
               )}
             </Button>

             {plan.note && <p className="text-center text-sm text-gray-600 mt-4">{plan.note}</p>}
           </div>
         ))}
       </div>

       {/* Trust Indicators */}
       <div className="text-center mt-12">
         <div className="flex justify-center items-center space-x-8 text-sm text-gray-500 flex-wrap">
           <div className="flex items-center mb-4">
             <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
               <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
             </svg>
             Secure Payment
           </div>
           <div className="flex items-center mb-4">
             <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
               <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
             </svg>
             Money Back Guarantee
           </div>
           <div className="flex items-center mb-4">
             <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
               <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
             </svg>
             24/7 Support
           </div>
           <div className="flex items-center mb-4">
             <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
               <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
             </svg>
             Cancel Anytime
           </div>
         </div>
       </div>
     </div>
   </section>
 )
}