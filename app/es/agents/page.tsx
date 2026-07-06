import type { Metadata } from 'next'
import { LocalizedAgentsPage } from '@/components/public/LocalizedAgentsPage'
import { buildLocaleAlternates } from '@/lib/marketing-i18n'

export const metadata: Metadata = {
  title: 'N3uralia Studio | Gemelos digitales por rol para Chile y Latam',
  description: 'Explora gemelos digitales por rol para ventas, licitaciones, cobranza, implementacion y mas, con foco en Chile y Latam.',
  alternates: buildLocaleAlternates({
    es: '/es/agents',
    en: '/en/agents',
  }),
}

export default function SpanishAgentsPage() {
  return <LocalizedAgentsPage locale="es" />
}
