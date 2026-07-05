import type { Metadata } from 'next'
import { LocalizedAgentsPage } from '@/components/public/LocalizedAgentsPage'

export const metadata: Metadata = {
  title: 'N3uralia Studio | Role twins for Chile and Latam',
  description: 'Explore digital twins by role for sales, tenders, collections, implementation, and more across Chile and Latam.',
}

export default function EnglishAgentsPage() {
  return <LocalizedAgentsPage locale="en" />
}
