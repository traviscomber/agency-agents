import type { Metadata } from 'next'

import { LocalizedLegalPage } from '@/components/public/LocalizedLegalPage'
import { buildLocaleAlternates } from '@/lib/marketing-i18n'

export const metadata: Metadata = {
  title: 'Privacy | N3uralia Twin OS',
  description: 'Privacy for N3uralia Studio accounts, diagnoses, operating programs, and supervised twins.',
  alternates: buildLocaleAlternates({
    es: '/es/privacidad',
    en: '/en/privacy',
  }),
}

export default function PrivacyEnPage() {
  return <LocalizedLegalPage locale="en" kind="privacy" />
}
