import type { Metadata, Viewport } from 'next'
import './globals.css'
import { PublicFooter } from '@/components/public/PublicFooter'

export const metadata: Metadata = {
  title: 'N3uralia Studio | Twin OS for Chile and Latam work roles',
  description:
    'N3uralia Studio turns digital twins, workflow state, project memory, and reusable deliverables into one operating system for deployable work roles in Chile and Latam.',
  keywords: ['AI workspace', 'digital twins', 'Chile', 'Latam', 'operating system', 'workflow continuity', 'project memory', 'N3uralia'],
  authors: [{ name: 'N3uralia' }],
  openGraph: {
    title: 'N3uralia Studio | Twin OS for Chile and Latam work roles',
    description: 'Digital twins, handoffs, workflow state, and reusable deliverables in one operating layer for Chile and Latam.',
    type: 'website',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#fbfbfa',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" style={{ backgroundColor: '#fbfbfa' }}>
      <body className="font-sans antialiased" style={{ backgroundColor: '#fbfbfa', color: '#173634' }}>
        {children}
        <PublicFooter />
      </body>
    </html>
  )
}
