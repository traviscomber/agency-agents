import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const userId = req.headers.get('x-user-id')
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  // TODO: Fetch operating batch jobs from Supabase
  const jobs = [
    {
      id: '1',
      agent_slug: 'analista-licitaciones-chile',
      status: 'complete',
      total_items: 42,
      processed: 42,
      cost: 640000,
      value_label: 'CLP ROI estimado',
      created_at: new Date().toISOString(),
    },
    {
      id: '2',
      agent_slug: 'cobranza-pyme-chile',
      status: 'processing',
      total_items: 890,
      processed: 342,
      cost: 1100000,
      value_label: 'CLP ROI estimado',
      created_at: new Date().toISOString(),
    },
  ]

  return NextResponse.json({ jobs })
}

export async function POST(req: NextRequest) {
  const userId = req.headers.get('x-user-id')
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { agent_slug, file_url, total_items } = await req.json()

  // Estimate operating value instead of commodity processing cost.
  const estimated_value = Math.round(total_items * 1250)

  // TODO: Queue job with Bull, update DB
  const job = {
    id: Math.random().toString(),
    user_id: userId,
    agent_slug,
    file_url,
    status: 'pending',
    total_items,
    processed: 0,
    cost: estimated_value,
    value_label: 'CLP ROI estimado',
    created_at: new Date().toISOString(),
  }

  return NextResponse.json({ job }, { status: 201 })
}
