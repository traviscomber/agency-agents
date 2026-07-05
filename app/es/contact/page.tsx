import type { Metadata } from 'next'
import { buildLocaleAlternates } from '@/lib/marketing-i18n'
import { LocalizedContactPage } from '@/components/public/LocalizedContactPage'

export const metadata: Metadata = {
  title: 'Contacto | N3uralia Studio',
  description: 'Contacta a N3uralia para diagnóstico, implementación o partnership en Chile y Latam.',
  alternates: buildLocaleAlternates({ es: '/es/contact', en: '/en/contact' }),
}

export default function SpanishContactPage() {
  return <LocalizedContactPage locale="es" />
}
