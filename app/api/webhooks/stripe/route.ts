import { headers } from 'next/headers'
import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', { apiVersion: '2023-10-16' })
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL || '', process.env.SUPABASE_SERVICE_ROLE_KEY || '')

const PLAN_BY_PRICE: Record<string, string> = {
  [process.env.STRIPE_PRICE_STARTER || '']: 'starter',
  [process.env.STRIPE_PRICE_PRO || '']: 'pro',
  [process.env.STRIPE_PRICE_TEAM || '']: 'team',
  [process.env.STRIPE_PRICE_ENTERPRISE || '']: 'enterprise',
}

export async function POST(req: Request) {
  const body = await req.text()
  const headersList = await headers()
  const sig = headersList.get('stripe-signature') || ''

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET || '')
  } catch (err: any) {
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 })
  }

  try {
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session
      const customerId = session.customer as string
      const sub = await stripe.subscriptions.retrieve(session.subscription as string)
      const priceId = sub.items.data[0].price.id
      const plan = PLAN_BY_PRICE[priceId] || 'free'

      await supabase
        .from('users')
        .update({ plan, stripe_customer_id: customerId, stripe_subscription_id: sub.id })
        .eq('stripe_customer_id', customerId)
    }

    if (event.type === 'customer.subscription.updated') {
      const sub = event.data.object as Stripe.Subscription
      const priceId = sub.items.data[0].price.id
      const plan = PLAN_BY_PRICE[priceId] || 'free'

      await supabase
        .from('users')
        .update({ plan })
        .eq('stripe_customer_id', sub.customer as string)
    }

    if (event.type === 'customer.subscription.deleted') {
      const sub = event.data.object as Stripe.Subscription
      await supabase
        .from('users')
        .update({ plan: 'free', stripe_subscription_id: null })
        .eq('stripe_customer_id', sub.customer as string)
    }

    if (event.type === 'invoice.payment_failed') {
      const invoice = event.data.object as Stripe.Invoice
      await supabase
        .from('users')
        .update({ plan: 'free' })
        .eq('stripe_customer_id', invoice.customer as string)
    }

    return NextResponse.json({ received: true }, { status: 200 })
  } catch (err: any) {
    console.error('Webhook processing error:', err)
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 })
  }
}
