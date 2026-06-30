import { NextRequest, NextResponse } from 'next/server'

/**
 * Stripe Checkout route — placeholder.
 *
 * To wire up real Stripe:
 * 1. Install: pnpm add stripe @stripe/stripe-js
 * 2. Set env vars: STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET, NEXT_PUBLIC_APP_URL
 * 3. Add price IDs: STRIPE_PRICE_STARTER, STRIPE_PRICE_PRO, STRIPE_PRICE_TEAM
 * 4. Replace this handler with the Stripe checkout session creation below.
 *
 * Example implementation:
 *
 * import Stripe from 'stripe'
 * const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2023-10-16' })
 *
 * const PRICE_IDS: Record<string, string | undefined> = {
 *   starter: process.env.STRIPE_PRICE_STARTER,
 *   pro:     process.env.STRIPE_PRICE_PRO,
 *   team:    process.env.STRIPE_PRICE_TEAM,
 * }
 *
 * export async function GET(req: NextRequest) {
 *   const plan = req.nextUrl.searchParams.get('plan')
 *   const priceId = PRICE_IDS[plan ?? '']
 *   if (!priceId) return NextResponse.json({ error: 'Invalid plan' }, { status: 400 })
 *
 *   const session = await stripe.checkout.sessions.create({
 *     mode: 'subscription',
 *     line_items: [{ price: priceId, quantity: 1 }],
 *     success_url: `${process.env.NEXT_PUBLIC_APP_URL}/app/billing?success=1`,
 *     cancel_url:  `${process.env.NEXT_PUBLIC_APP_URL}/app/billing`,
 *     // customer: stripeCustomerId, // pass from user session
 *   })
 *
 *   return NextResponse.redirect(session.url!)
 * }
 */

export async function GET(req: NextRequest) {
  const plan = req.nextUrl.searchParams.get('plan') || 'pro'

  // In demo mode: redirect back to billing with a notice
  const url = new URL('/app/billing', req.nextUrl.origin)
  url.searchParams.set('demo', 'stripe_not_configured')
  url.searchParams.set('plan', plan)
  return NextResponse.redirect(url)
}
