import type { Metadata } from 'next'
import { LocalizedTrustPage } from '@/components/public/LocalizedTrustPage'
import { buildLocaleAlternates } from '@/lib/marketing-i18n'

export const metadata: Metadata = {
  title: 'Seguridad y supervisión | N3uralia Twin OS',
  description:
    'Como N3uralia Twin OS controla gemelos digitales con fuentes declaradas, aprobación humana, logs, handoffs y límites seguros para Chile y Latam.',
  alternates: buildLocaleAlternates({
    es: '/es/seguridad',
    en: '/en/trust',
  }),
}

export default function SpanishTrustPage() {
  return <LocalizedTrustPage locale="es" />
}
