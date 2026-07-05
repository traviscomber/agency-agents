import { createClient } from '@/lib/supabase/server'
import {
  getUserMetrics,
  getEngagementMetrics,
  getSystemMetrics,
  getRevenueMetrics,
} from '@/lib/analytics/tracker'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Check if user is admin (for now, just check if they have a specific email)
    // In production, implement proper role-based access control
    const { data: profile } = await supabase
      .from('profiles')
      .select('email')
      .eq('id', user.id)
      .single()

    if (!profile?.email?.endsWith('@n3uralia.com')) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    // Fetch all metrics in parallel
    const [userMetrics, engagementMetrics, systemMetrics, revenueMetrics] = await Promise.all([
      getUserMetrics(),
      getEngagementMetrics(),
      getSystemMetrics(),
      getRevenueMetrics(),
    ])

    return NextResponse.json({
      user_metrics: userMetrics,
      engagement_metrics: engagementMetrics,
      system_metrics: systemMetrics,
      revenue_metrics: revenueMetrics,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('[v0] Error fetching metrics:', error)
    return NextResponse.json({ error: 'Failed to fetch metrics' }, { status: 500 })
  }
}
