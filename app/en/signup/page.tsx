import type { Metadata } from 'next'
import { buildLocaleAlternates } from '@/lib/marketing-i18n'
import { LocalizedSignupPage } from '@/components/public/LocalizedSignupPage'

export const metadata: Metadata = {
  title: 'Create account | N3uralia Studio',
  description: 'Create your account to deploy digital twins across Chile and Latam.',
  alternates: buildLocaleAlternates({ es: '/es/signup', en: '/en/signup' }),
}

export default function EnglishSignupPage() {
  return <LocalizedSignupPage locale="en" />
}
