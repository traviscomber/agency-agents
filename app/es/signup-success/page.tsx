import type { Metadata } from 'next'

import { LocalizedSignupSuccessPage } from '@/components/public/LocalizedSignupSuccessPage'
import { buildLocaleAlternates } from '@/lib/marketing-i18n'

export const metadata: Metadata = {
  title: 'Confirma tu cuenta | N3uralia Twin OS',
  description: 'Confirma tu email para entrar al workspace de N3uralia Twin OS.',
  alternates: buildLocaleAlternates({
    es: '/es/signup-success',
    en: '/en/signup-success',
  }),
}

export default function SignupSuccessEsPage() {
  return <LocalizedSignupSuccessPage locale="es" />
}
