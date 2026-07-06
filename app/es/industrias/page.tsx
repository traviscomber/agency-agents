import type { Metadata } from 'next'
import { LocalizedIndustriesPage } from '@/components/public/LocalizedIndustriesPage'
import { buildLocaleAlternates, industriesPageCopy } from '@/lib/marketing-i18n'

export const metadata: Metadata = {
  title: industriesPageCopy.es.metaTitle,
  description: industriesPageCopy.es.metaDescription,
  alternates: buildLocaleAlternates({
    es: '/es/industrias',
    en: '/en/industries',
  }),
}

export default function SpanishIndustriesPage() {
  return <LocalizedIndustriesPage locale="es" />
}
