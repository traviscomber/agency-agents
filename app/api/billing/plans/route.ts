import { getSubscriptionPlans } from '@/lib/billing/utils'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const plans = await getSubscriptionPlans()
    return NextResponse.json(plans)
  } catch (error) {
    console.error('[v0] Error fetching plans:', error)
    return NextResponse.json({ error: 'Failed to fetch plans' }, { status: 500 })
  }
}
