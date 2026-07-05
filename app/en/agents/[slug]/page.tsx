import type { Metadata } from 'next'
import { getAgentBySlug, SEED_AGENTS } from '@/lib/data/seed-agents'
import { buildLocaleAlternates } from '@/lib/marketing-i18n'
import { LocalizedAgentDetailPage } from '@/components/public/LocalizedAgentDetailPage'

export function generateStaticParams() {
  return SEED_AGENTS.map((agent) => ({ slug: agent.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const agent = getAgentBySlug(slug)
  if (!agent) return {}
  return {
    title: `${agent.name} | Digital twin for Chile and Latam`,
    description: agent.shortDescription,
    alternates: buildLocaleAlternates({
      es: `/es/agents/${slug}`,
      en: `/en/agents/${slug}`,
    }),
  }
}

export default async function EnglishAgentDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  return <LocalizedAgentDetailPage locale="en" slug={slug} />
}
