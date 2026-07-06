import type { Metadata } from 'next'
import { LocalizedDemoPage } from '@/components/public/LocalizedDemoPage'
import { buildLocaleAlternates } from '@/lib/marketing-i18n'

export const metadata: Metadata = {
  title: 'Demo de gemelos digitales por cargo | N3uralia Studio',
  description: 'Tres recorridos comerciales para desplegar gemelos digitales en ventas B2B, cobranza pyme y licitaciones en Chile.',
  alternates: buildLocaleAlternates({
    es: '/es/demo',
    en: '/en/demo',
  }),
}

export default function SpanishDemoPage() {
  return <LocalizedDemoPage locale="es" />
}
