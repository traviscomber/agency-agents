import type { Metadata } from 'next'
import { LocalizedImplementationPage } from '@/components/public/LocalizedImplementationPage'
import { buildLocaleAlternates } from '@/lib/marketing-i18n'

export const metadata: Metadata = {
  title: '30-day Twin OS implementation | N3uralia',
  description:
    'Deployment route to turn a repetitive process into a supervised operating twin with memory, handoffs, safe limits, and measurable ROI.',
  alternates: buildLocaleAlternates({
    es: '/es/implementacion',
    en: '/en/implementation',
  }),
}

export default function EnglishImplementationPage() {
  return <LocalizedImplementationPage locale="en" />
}
