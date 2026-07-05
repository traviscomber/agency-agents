import type { Metadata } from 'next'
import { buildLocaleAlternates } from '@/lib/marketing-i18n'
import { LocalizedSignupPage } from '@/components/public/LocalizedSignupPage'

export const metadata: Metadata = {
  title: 'Crear cuenta | N3uralia Studio',
  description: 'Crea tu cuenta para desplegar twins digitales con foco en Chile y Latam.',
  alternates: buildLocaleAlternates({ es: '/es/signup', en: '/en/signup' }),
}

export default function SpanishSignupPage() {
  return <LocalizedSignupPage locale="es" />
}
