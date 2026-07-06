import type { Metadata } from 'next'

import { LocalizedLegalPage } from '@/components/public/LocalizedLegalPage'
import { buildLocaleAlternates } from '@/lib/marketing-i18n'

export const metadata: Metadata = {
  title: 'Terminos | N3uralia Twin OS',
  description: 'Terminos de uso para sitio, cuentas y workspace de gemelos digitales supervisados.',
  alternates: buildLocaleAlternates({
    es: '/es/terminos',
    en: '/en/terms',
  }),
}

export default function TermsEsPage() {
  return <LocalizedLegalPage locale="es" kind="terms" />
}
