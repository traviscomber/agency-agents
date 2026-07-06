import type { Metadata } from 'next'
import { LocalizedDiagnosisPage } from '@/components/public/LocalizedDiagnosisPage'
import { buildLocaleAlternates, diagnosisPageCopy } from '@/lib/marketing-i18n'

export const metadata: Metadata = {
  title: diagnosisPageCopy.es.metaTitle,
  description: diagnosisPageCopy.es.metaDescription,
  alternates: buildLocaleAlternates({
    es: '/es/diagnostico',
    en: '/en/diagnosis',
  }),
}

export default function SpanishDiagnosisPage() {
  return <LocalizedDiagnosisPage locale="es" />
}
