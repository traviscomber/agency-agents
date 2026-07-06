import type { Metadata } from 'next'
import { LocalizedPricingPage } from '@/components/public/LocalizedPricingPage'
import { buildLocaleAlternates } from '@/lib/marketing-i18n'

export const metadata: Metadata = {
  title: 'N3uralia Studio | Planes Twin OS para Chile y Latam',
  description: 'Planes para desplegar trabajo digital por rol con gemelos digitales, memoria, handoffs y reemplazo supervisado en Chile y Latam.',
  alternates: buildLocaleAlternates({
    es: '/es/pricing',
    en: '/en/pricing',
  }),
}

export default function SpanishPricingPage() {
  return <LocalizedPricingPage locale="es" />
}
