import type { Metadata } from 'next'
import { LocalizedDiagnosisPage } from '@/components/public/LocalizedDiagnosisPage'
import { buildLocaleAlternates, diagnosisPageCopy } from '@/lib/marketing-i18n'

export const metadata: Metadata = {
  title: diagnosisPageCopy.en.metaTitle,
  description: diagnosisPageCopy.en.metaDescription,
  alternates: buildLocaleAlternates({
    es: '/es/diagnostico',
    en: '/en/diagnosis',
  }),
}

export default function EnglishDiagnosisPage() {
  return <LocalizedDiagnosisPage locale="en" />
}
