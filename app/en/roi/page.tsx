import type { Metadata } from 'next'
import { LocalizedRoiPage } from '@/components/public/LocalizedRoiPage'
import { buildLocaleAlternates, roiPageCopy } from '@/lib/marketing-i18n'

export const metadata: Metadata = {
  title: roiPageCopy.en.metaTitle,
  description: roiPageCopy.en.metaDescription,
  alternates: buildLocaleAlternates({
    es: '/es/calculadora-roi',
    en: '/en/roi',
  }),
}

export default function EnglishRoiPage() {
  return <LocalizedRoiPage locale="en" />
}
