import type { Metadata } from 'next'
import { LocalizedPricingPage } from '@/components/public/LocalizedPricingPage'
import { buildLocaleAlternates } from '@/lib/marketing-i18n'

export const metadata: Metadata = {
  title: 'N3uralia Studio | Twin OS pricing for Chile and Latam',
  description: 'Plans to deploy digital labor by role with twins, memory, handoffs, and supervised replacement across Chile and Latam.',
  alternates: buildLocaleAlternates({
    es: '/es/pricing',
    en: '/en/pricing',
  }),
}

export default function EnglishPricingPage() {
  return <LocalizedPricingPage locale="en" />
}
