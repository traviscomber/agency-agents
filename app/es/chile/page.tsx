import type { Metadata } from 'next'
import { LocalizedChileLatamPage } from '@/components/public/LocalizedChileLatamPage'
import { buildLocaleAlternates, chileLatamPageCopy } from '@/lib/marketing-i18n'

export const metadata: Metadata = {
  title: chileLatamPageCopy.es.metaTitle,
  description: chileLatamPageCopy.es.metaDescription,
  alternates: buildLocaleAlternates({
    es: '/es/chile',
    en: '/en/latam',
  }),
  openGraph: {
    title: chileLatamPageCopy.es.metaTitle,
    description: chileLatamPageCopy.es.metaDescription,
    type: 'website',
  },
}

export default function SpanishChilePage() {
  return <LocalizedChileLatamPage locale="es" />
}
