import type { Metadata } from 'next'
import { LocalizedPricingPage } from '@/components/public/LocalizedPricingPage'

export const metadata: Metadata = {
  title: 'N3uralia Studio | Twin OS pricing for Chile and Latam',
  description: 'Plans to deploy digital labor by role with twins, memory, handoffs, and supervised replacement across Chile and Latam.',
}

export default function EnglishPricingPage() {
  return <LocalizedPricingPage locale="en" />
}
