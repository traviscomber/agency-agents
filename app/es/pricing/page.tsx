import type { Metadata } from 'next'
import { LocalizedPricingPage } from '@/components/public/LocalizedPricingPage'

export const metadata: Metadata = {
  title: 'N3uralia Studio | Planes Twin OS para Chile y Latam',
  description: 'Planes para desplegar trabajo digital por rol con twins, memoria, handoffs y replacement supervisado en Chile y Latam.',
}

export default function SpanishPricingPage() {
  return <LocalizedPricingPage locale="es" />
}
