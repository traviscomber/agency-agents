import type { Metadata } from 'next'

import { LocalizedLegalPage } from '@/components/public/LocalizedLegalPage'
import { buildLocaleAlternates } from '@/lib/marketing-i18n'

export const metadata: Metadata = {
  title: 'Privacidad | N3uralia Twin OS',
  description: 'Privacidad para cuentas, diagnosticos, programas operativos y twins supervisados de N3uralia Studio.',
  alternates: buildLocaleAlternates({
    es: '/es/privacidad',
    en: '/en/privacy',
  }),
}

export default function PrivacyEsPage() {
  return <LocalizedLegalPage locale="es" kind="privacy" />
}
