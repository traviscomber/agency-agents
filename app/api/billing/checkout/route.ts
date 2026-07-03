import { createClient } from '@supabase/supabase-js'
import { createCheckoutSession, createStripeCustomer } from '@/lib/stripe'
import { NextRequest, NextResponse } from 'next/server'

function getSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !key) {
    throw new Error('Supabase credentials not configured')
  }

  return createClient(url, key)
}

export async function POST(req: NextRequest) {
  try {
    const { priceId, userId } = await req.json()

    if (!priceId || !userId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const supabase = getSupabaseClient()

    // Get user from database
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('stripe_customer_id, email, full_name')
      .eq('id', userId)
      .single()

    if (userError || !user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    let customerId = user.stripe_customer_id

    // Create Stripe customer if doesn't exist
    if (!customerId) {
      const customer = await createStripeCustomer(user.email, user.full_name)
      customerId = customer.id

      // Save customer ID to database
      await supabase.from('users').update({ stripe_customer_id: customerId }).eq('id', userId)
    }

    // Create checkout session
    const session = await createCheckoutSession(customerId, priceId)

    return NextResponse.json({ sessionId: session.id, url: session.url }, { status: 200 })
  } catch (err: any) {
    console.error('Checkout error:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
