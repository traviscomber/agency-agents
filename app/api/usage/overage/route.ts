import { NextRequest, NextResponse } from 'next/server'

const OVERAGE_PRICE_PER_RUN = 0.50

export async function POST(req: NextRequest) {
  try {
    const { userId, month, runsUsed, planLimit } = await req.json()
    
    // Calculate overage
    const overageRuns = Math.max(0, runsUsed - planLimit)
    const overageCost = overageRuns * OVERAGE_PRICE_PER_RUN
    
    // Update usage record (simplified - would use Supabase in production)
    return NextResponse.json({
      month,
      runs_used: runsUsed,
      runs_limit: planLimit,
      overage_runs: overageRuns,
      overage_cost: overageCost.toFixed(2),
      total_monthly_charge: (planLimit > 0 ? 1 : 0) * 29 + overageCost // Example: base plan cost
    })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to calculate overage' }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  try {
    const userId = req.nextUrl.searchParams.get('userId')
    const month = req.nextUrl.searchParams.get('month') || new Date().toISOString().slice(0, 7)
    
    // Fetch usage from Supabase (simplified)
    return NextResponse.json({
      month,
      runs_used: 45,
      runs_limit: 50,
      overage_runs: 0,
      overage_cost: 0,
      status: 'within_limit'
    })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch usage' }, { status: 500 })
  }
}
