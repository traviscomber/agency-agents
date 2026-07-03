import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { agentSlug, frequency, cronExpr, name } = await req.json()
    
    // Validate frequency
    const validFrequencies = ['daily', 'weekly', 'monthly', 'custom']
    if (!validFrequencies.includes(frequency)) {
      return NextResponse.json({ error: 'Invalid frequency' }, { status: 400 })
    }
    
    // Generate next run time
    const now = new Date()
    const nextRun = calculateNextRun(frequency, now)
    
    return NextResponse.json({
      id: Math.random().toString(36),
      agent_slug: agentSlug,
      frequency,
      cron_expr: cronExpr || getDefaultCron(frequency),
      name,
      is_active: true,
      next_run_at: nextRun.toISOString(),
      created_at: now.toISOString()
    }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create scheduled run' }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  try {
    // Fetch user's scheduled runs (simplified)
    return NextResponse.json({
      scheduled_runs: [
        {
          id: '1',
          agent_slug: 'content-writer',
          frequency: 'daily',
          name: 'Daily Blog Post',
          is_active: true,
          next_run_at: new Date(Date.now() + 86400000).toISOString()
        }
      ]
    })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch scheduled runs' }, { status: 500 })
  }
}

function getDefaultCron(frequency: string): string {
  const cronMap: Record<string, string> = {
    daily: '0 9 * * *',
    weekly: '0 9 * * 1',
    monthly: '0 9 1 * *'
  }
  return cronMap[frequency] || '0 9 * * *'
}

function calculateNextRun(frequency: string, now: Date): Date {
  const next = new Date(now)
  switch (frequency) {
    case 'daily':
      next.setDate(next.getDate() + 1)
      break
    case 'weekly':
      next.setDate(next.getDate() + 7)
      break
    case 'monthly':
      next.setMonth(next.getMonth() + 1)
      break
  }
  next.setHours(9, 0, 0, 0)
  return next
}
