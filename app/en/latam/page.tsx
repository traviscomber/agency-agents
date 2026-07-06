import type { Metadata } from 'next'
import { LocalizedChileLatamPage } from '@/components/public/LocalizedChileLatamPage'
import { buildLocaleAlternates, chileLatamPageCopy } from '@/lib/marketing-i18n'

export const metadata: Metadata = {
  title: chileLatamPageCopy.en.metaTitle,
  description: chileLatamPageCopy.en.metaDescription,
  alternates: buildLocaleAlternates({
    es: '/es/chile',
    en: '/en/latam',
  }),
  openGraph: {
    title: chileLatamPageCopy.en.metaTitle,
    description: chileLatamPageCopy.en.metaDescription,
    type: 'website',
  },
}

export default function EnglishLatamPage() {
  return <LocalizedChileLatamPage locale="en" />
}
