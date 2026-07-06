import type { Metadata } from 'next'
import { LocalizedPlaybooksPage } from '@/components/public/LocalizedPlaybooksPage'
import { buildLocaleAlternates } from '@/lib/marketing-i18n'

export const metadata: Metadata = {
  title: 'Playbooks de gemelos digitales por cargo | N3uralia Studio',
  description: 'Playbooks operativos para desplegar gemelos digitales en ventas, cobranza, licitaciones, implementacion y reclutamiento en Chile.',
  alternates: buildLocaleAlternates({
    es: '/es/playbooks',
    en: '/en/playbooks',
  }),
}

export default function SpanishPlaybooksPage() {
  return <LocalizedPlaybooksPage locale="es" />
}
