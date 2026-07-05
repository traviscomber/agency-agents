import { recommendAgentsForUser } from '@/lib/ai/server'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      pain_points = [],
      business_type = 'general',
      team_size = 1,
      budget = 'medium',
    } = body

    const recommendations = await recommendAgentsForUser({
      pain_points,
      business_type,
      team_size,
      budget,
    })

    return NextResponse.json(recommendations, { status: 200 })
  } catch (error) {
    console.error('[AI] Recommendation error:', error)
    return NextResponse.json(
      { error: 'Failed to generate recommendations' },
      { status: 500 }
    )
  }
}
