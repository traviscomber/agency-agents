import type { Metadata } from 'next'
import { LocalizedRoiPage } from '@/components/public/LocalizedRoiPage'
import { buildLocaleAlternates, roiPageCopy } from '@/lib/marketing-i18n'

export const metadata: Metadata = {
  title: roiPageCopy.es.metaTitle,
  description: roiPageCopy.es.metaDescription,
  alternates: buildLocaleAlternates({
    es: '/es/calculadora-roi',
    en: '/en/roi',
  }),
}

export default function SpanishRoiPage() {
  return <LocalizedRoiPage locale="es" />
}
