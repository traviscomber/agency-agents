import type { Metadata } from 'next'
import { LocalizedTrustPage } from '@/components/public/LocalizedTrustPage'
import { buildLocaleAlternates } from '@/lib/marketing-i18n'

export const metadata: Metadata = {
  title: 'Trust and supervision | N3uralia Twin OS',
  description:
    'How N3uralia Twin OS controls digital twins with declared sources, human approval, logs, handoffs, and safe limits for Chile and Latam.',
  alternates: buildLocaleAlternates({
    es: '/es/seguridad',
    en: '/en/trust',
  }),
}

export default function EnglishTrustPage() {
  return <LocalizedTrustPage locale="en" />
}
