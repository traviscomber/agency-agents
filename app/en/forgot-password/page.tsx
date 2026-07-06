import type { Metadata } from 'next'

import { LocalizedForgotPasswordPage } from '@/components/public/LocalizedForgotPasswordPage'
import { buildLocaleAlternates } from '@/lib/marketing-i18n'

export const metadata: Metadata = {
  title: 'Recover access | N3uralia Twin OS',
  description: 'Recover access to your digital twin workspace and operating programs.',
  alternates: buildLocaleAlternates({
    es: '/es/forgot-password',
    en: '/en/forgot-password',
  }),
}

export default function ForgotPasswordEnPage() {
  return <LocalizedForgotPasswordPage locale="en" />
}
