import { redirect } from 'next/navigation'
import { SEED_AGENTS } from '@/lib/data/seed-agents'

export async function generateStaticParams() {
  return SEED_AGENTS.map((a) => ({ slug: a.slug }))
}

export default async function PublicAgentDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  redirect(`/es/agents/${slug}`)
}
