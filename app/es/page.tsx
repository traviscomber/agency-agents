import type { Metadata } from 'next'
import { LocalizedLandingPage } from '@/components/public/LocalizedLandingPage'
import { buildLocaleAlternates, landingCopy } from '@/lib/marketing-i18n'

export const metadata: Metadata = {
  title: landingCopy.es.metaTitle,
  description: landingCopy.es.metaDescription,
  alternates: buildLocaleAlternates({
    es: '/es',
    en: '/en',
  }),
  openGraph: {
    title: landingCopy.es.metaTitle,
    description: landingCopy.es.metaDescription,
    type: 'website',
  },
}

export default function SpanishLandingPage() {
  return <LocalizedLandingPage locale="es" />
}
