import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const userId = req.headers.get('x-user-id')
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  // TODO: Fetch batch jobs from Supabase
  const jobs = [
    {
      id: '1',
      agent_slug: 'content-writer',
      status: 'complete',
      total_items: 500,
      processed: 500,
      cost: 75.00,
      created_at: new Date().toISOString(),
    },
    {
      id: '2',
      agent_slug: 'seo-optimizer',
      status: 'processing',
      total_items: 1000,
      processed: 342,
      cost: 427.50,
      created_at: new Date().toISOString(),
    },
  ]

  return NextResponse.json({ jobs })
}

export async function POST(req: NextRequest) {
  const userId = req.headers.get('x-user-id')
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { agent_slug, file_url, total_items } = await req.json()

  // Calculate cost: $0.50 base + $0.01 per item for batch processing
  const batch_cost = (0.50 + total_items * 0.01).toFixed(2)

  // TODO: Queue job with Bull, update DB
  const job = {
    id: Math.random().toString(),
    user_id: userId,
    agent_slug,
    file_url,
    status: 'pending',
    total_items,
    processed: 0,
    cost: parseFloat(batch_cost),
    created_at: new Date().toISOString(),
  }

  return NextResponse.json({ job }, { status: 201 })
}
