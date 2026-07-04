import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { PublicFooter } from '@/components/public/PublicFooter'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'N3uralia Studio — Agent Factory & Workspace',
  description:
    'Build, deploy, and manage specialized AI agents. Agent studio with project management, fine-tuning, marketplace, team collaboration, and enterprise controls.',
  keywords: ['AI agents', 'agent factory', 'agent studio', 'AI workspace', 'agent builder', 'N3uralia'],
  authors: [{ name: 'N3uralia' }],
  openGraph: {
    title: 'N3uralia Studio — Agent Factory & Workspace',
    description: 'Build and manage AI agents with N3uralia Studio.',
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
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`} style={{ backgroundColor: '#fbfbfa' }}>
      <body className="font-sans antialiased" style={{ backgroundColor: '#fbfbfa', color: '#173634' }}>
        {children}
        <PublicFooter />
      </body>
    </html>
  )
}
