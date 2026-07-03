import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const userId = req.headers.get('x-user-id')
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  // TODO: Fetch partner details from Supabase
  const partner = {
    id: '1',
    brand_name: 'ACME Automation',
    custom_domain: 'agents.acme.com',
    logo_url: '/partner-logo.png',
    color_primary: '#00a86b',
    monthly_fee: 299,
    revenue_split: 30,
    status: 'active',
  }

  return NextResponse.json({ partner })
}

export async function POST(req: NextRequest) {
  const userId = req.headers.get('x-user-id')
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { brand_name, custom_domain, color_primary } = await req.json()

  // TODO: Validate domain, create DNS records, save to DB
  const partner = {
    id: Math.random().toString(),
    partner_id: userId,
    brand_name,
    custom_domain,
    color_primary,
    monthly_fee: 299,
    revenue_split: 30,
    is_active: true,
  }

  return NextResponse.json({ partner }, { status: 201 })
}
