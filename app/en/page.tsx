import type { Metadata } from 'next'
import { LocalizedLandingPage } from '@/components/public/LocalizedLandingPage'
import { buildLocaleAlternates, landingCopy } from '@/lib/marketing-i18n'

export const metadata: Metadata = {
  title: landingCopy.en.metaTitle,
  description: landingCopy.en.metaDescription,
  alternates: buildLocaleAlternates({
    es: '/es',
    en: '/en',
  }),
  openGraph: {
    title: landingCopy.en.metaTitle,
    description: landingCopy.en.metaDescription,
    type: 'website',
  },
}

export default function EnglishLandingPage() {
  return <LocalizedLandingPage locale="en" />
}
