import type { Metadata } from 'next'
import { LocalizedIndustriesPage } from '@/components/public/LocalizedIndustriesPage'
import { buildLocaleAlternates, industriesPageCopy } from '@/lib/marketing-i18n'

export const metadata: Metadata = {
  title: industriesPageCopy.en.metaTitle,
  description: industriesPageCopy.en.metaDescription,
  alternates: buildLocaleAlternates({
    es: '/es/industrias',
    en: '/en/industries',
  }),
}

export default function EnglishIndustriesPage() {
  return <LocalizedIndustriesPage locale="en" />
}
