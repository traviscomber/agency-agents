import { NextRequest, NextResponse } from 'next/server'

/**
 * Stripe Webhook handler — placeholder.
 *
 * To wire up real Stripe webhooks:
 * 1. Set STRIPE_WEBHOOK_SECRET in your environment variables.
 * 2. Register this endpoint in your Stripe dashboard:
 *    https://dashboard.stripe.com/webhooks → Add endpoint
 *    URL: https://your-domain.com/api/webhooks/stripe
 *    Events: checkout.session.completed, customer.subscription.updated,
 *            customer.subscription.deleted, invoice.payment_failed
 *
 * Example implementation:
 *
 * import Stripe from 'stripe'
 * import { createClient } from '@supabase/supabase-js'
 *
 * const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2023-10-16' })
 * const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)
 *
 * const PLAN_BY_PRICE: Record<string, string> = {
 *   [process.env.STRIPE_PRICE_STARTER!]: 'starter',
 *   [process.env.STRIPE_PRICE_PRO!]:     'pro',
 *   [process.env.STRIPE_PRICE_TEAM!]:    'team',
 * }
 *
 * export async function POST(req: NextRequest) {
 *   const sig = req.headers.get('stripe-signature')!
 *   const body = await req.text()
 *   const event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
 *
 *   if (event.type === 'checkout.session.completed') {
 *     const session = event.data.object as Stripe.Checkout.Session
 *     const customerId = session.customer as string
 *     const sub = await stripe.subscriptions.retrieve(session.subscription as string)
 *     const priceId = sub.items.data[0].price.id
 *     const plan = PLAN_BY_PRICE[priceId] || 'free'
 *
 *     await supabase
 *       .from('users')
 *       .update({ plan, stripe_customer_id: customerId, stripe_subscription_id: sub.id })
 *       .eq('stripe_customer_id', customerId)
 *   }
 *
 *   if (event.type === 'customer.subscription.deleted') {
 *     const sub = event.data.object as Stripe.Subscription
 *     await supabase
 *       .from('users')
 *       .update({ plan: 'free', stripe_subscription_id: null })
 *       .eq('stripe_customer_id', sub.customer as string)
 *   }
 *
 *   return NextResponse.json({ received: true })
 * }
 */

export async function POST() {
  return NextResponse.json(
    { error: 'Stripe webhook not configured. See /app/api/webhooks/stripe/route.ts for setup instructions.' },
    { status: 501 }
  )
}
