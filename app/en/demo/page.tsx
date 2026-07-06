import type { Metadata } from 'next'
import { LocalizedDemoPage } from '@/components/public/LocalizedDemoPage'
import { buildLocaleAlternates } from '@/lib/marketing-i18n'

export const metadata: Metadata = {
  title: 'Role-based digital twin demo | N3uralia Studio',
  description: 'Three commercial walkthroughs for deploying digital twins across B2B sales, SME collections, and tenders in Chile.',
  alternates: buildLocaleAlternates({
    es: '/es/demo',
    en: '/en/demo',
  }),
}

export default function EnglishDemoPage() {
  return <LocalizedDemoPage locale="en" />
}
