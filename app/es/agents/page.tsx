import type { Metadata } from 'next'
import { LocalizedAgentsPage } from '@/components/public/LocalizedAgentsPage'

export const metadata: Metadata = {
  title: 'N3uralia Studio | Twins por rol para Chile y Latam',
  description: 'Explora twins digitales por rol para ventas, licitaciones, cobranza, implementación y más, con foco en Chile y Latam.',
}

export default function SpanishAgentsPage() {
  return <LocalizedAgentsPage locale="es" />
}
