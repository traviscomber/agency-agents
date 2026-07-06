import type { Metadata } from 'next'
import { LocalizedRolesPage } from '@/components/public/LocalizedRolesPage'
import { buildLocaleAlternates, rolesPageCopy } from '@/lib/marketing-i18n'

export const metadata: Metadata = {
  title: rolesPageCopy.en.metaTitle,
  description: rolesPageCopy.en.metaDescription,
  alternates: buildLocaleAlternates({
    es: '/es/roles',
    en: '/en/roles',
  }),
}

export default function EnglishRolesPage() {
  return <LocalizedRolesPage locale="en" />
}
