import type { Metadata } from 'next'

import { LocalizedForgotPasswordPage } from '@/components/public/LocalizedForgotPasswordPage'
import { buildLocaleAlternates } from '@/lib/marketing-i18n'

export const metadata: Metadata = {
  title: 'Recuperar acceso | N3uralia Twin OS',
  description: 'Recupera acceso a tu workspace de gemelos digitales y programas operativos.',
  alternates: buildLocaleAlternates({
    es: '/es/forgot-password',
    en: '/en/forgot-password',
  }),
}

export default function ForgotPasswordEsPage() {
  return <LocalizedForgotPasswordPage locale="es" />
}
