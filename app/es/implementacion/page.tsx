import type { Metadata } from 'next'
import { LocalizedImplementationPage } from '@/components/public/LocalizedImplementationPage'
import { buildLocaleAlternates } from '@/lib/marketing-i18n'

export const metadata: Metadata = {
  title: 'Implementación Twin OS en 30 días | N3uralia',
  description:
    'Ruta de despliegue para convertir un proceso repetitivo en un twin operativo supervisado con memoria, handoffs, límites seguros y ROI medible.',
  alternates: buildLocaleAlternates({
    es: '/es/implementacion',
    en: '/en/implementation',
  }),
}

export default function SpanishImplementationPage() {
  return <LocalizedImplementationPage locale="es" />
}
