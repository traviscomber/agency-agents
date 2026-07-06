import type { Metadata } from 'next'

import { LocalizedLegalPage } from '@/components/public/LocalizedLegalPage'
import { buildLocaleAlternates } from '@/lib/marketing-i18n'

export const metadata: Metadata = {
  title: 'Terms | N3uralia Twin OS',
  description: 'Terms for using the N3uralia Studio site, accounts, and supervised digital twin workspace.',
  alternates: buildLocaleAlternates({
    es: '/es/terminos',
    en: '/en/terms',
  }),
}

export default function TermsEnPage() {
  return <LocalizedLegalPage locale="en" kind="terms" />
}
