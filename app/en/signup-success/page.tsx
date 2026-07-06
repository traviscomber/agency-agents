import type { Metadata } from 'next'

import { LocalizedSignupSuccessPage } from '@/components/public/LocalizedSignupSuccessPage'
import { buildLocaleAlternates } from '@/lib/marketing-i18n'

export const metadata: Metadata = {
  title: 'Confirm your account | N3uralia Twin OS',
  description: 'Confirm your email to enter the N3uralia Twin OS workspace.',
  alternates: buildLocaleAlternates({
    es: '/es/signup-success',
    en: '/en/signup-success',
  }),
}

export default function SignupSuccessEnPage() {
  return <LocalizedSignupSuccessPage locale="en" />
}
