import type { Metadata } from 'next'
import { LocalizedAgentsPage } from '@/components/public/LocalizedAgentsPage'
import { buildLocaleAlternates } from '@/lib/marketing-i18n'

export const metadata: Metadata = {
  title: 'N3uralia Studio | Role twins for Chile and Latam',
  description: 'Explore digital twins by role for sales, tenders, collections, implementation, and more across Chile and Latam.',
  alternates: buildLocaleAlternates({
    es: '/es/agents',
    en: '/en/agents',
  }),
}

export default function EnglishAgentsPage() {
  return <LocalizedAgentsPage locale="en" />
}
