import type { Metadata } from 'next'
import { buildLocaleAlternates } from '@/lib/marketing-i18n'
import { LocalizedLoginPage } from '@/components/public/LocalizedLoginPage'

export const metadata: Metadata = {
  title: 'Ingresar | N3uralia Studio',
  description: 'Ingresa para retomar twins, workflows y entregables en tu workspace.',
  alternates: buildLocaleAlternates({ es: '/es/login', en: '/en/login' }),
}

export default function SpanishLoginPage() {
  return <LocalizedLoginPage locale="es" />
}
