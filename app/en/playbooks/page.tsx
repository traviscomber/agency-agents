import type { Metadata } from 'next'
import { LocalizedPlaybooksPage } from '@/components/public/LocalizedPlaybooksPage'
import { buildLocaleAlternates } from '@/lib/marketing-i18n'

export const metadata: Metadata = {
  title: 'Role-based digital twin playbooks | N3uralia Studio',
  description: 'Operating playbooks for deploying digital twins across sales, collections, tenders, implementation, and recruiting in Chile.',
  alternates: buildLocaleAlternates({
    es: '/es/playbooks',
    en: '/en/playbooks',
  }),
}

export default function EnglishPlaybooksPage() {
  return <LocalizedPlaybooksPage locale="en" />
}
