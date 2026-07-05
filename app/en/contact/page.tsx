import type { Metadata } from 'next'
import { buildLocaleAlternates } from '@/lib/marketing-i18n'
import { LocalizedContactPage } from '@/components/public/LocalizedContactPage'

export const metadata: Metadata = {
  title: 'Contact | N3uralia Studio',
  description: 'Contact N3uralia for diagnosis, implementation, or partnership across Chile and Latam.',
  alternates: buildLocaleAlternates({ es: '/es/contact', en: '/en/contact' }),
}

export default function EnglishContactPage() {
  return <LocalizedContactPage locale="en" />
}
