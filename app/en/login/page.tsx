import type { Metadata } from 'next'
import { buildLocaleAlternates } from '@/lib/marketing-i18n'
import { LocalizedLoginPage } from '@/components/public/LocalizedLoginPage'

export const metadata: Metadata = {
  title: 'Sign in | N3uralia Studio',
  description: 'Sign in to resume twins, workflows, and deliverables in your workspace.',
  alternates: buildLocaleAlternates({ es: '/es/login', en: '/en/login' }),
}

export default function EnglishLoginPage() {
  return <LocalizedLoginPage locale="en" />
}
