import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { PublicFooter } from '@/components/public/PublicFooter'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'N3uralia Nano Agent Factory — AI Specialist Platform',
  description:
    'Access specialized nano AI agents for product, code, design, sales, strategy, security, and operations. Run tasks, save outputs, and organize your work from one professional dashboard.',
  keywords: ['AI agents', 'nano agents', 'agent factory', 'AI workspace', 'productivity', 'N3uralia'],
  authors: [{ name: 'N3uralia' }],
  openGraph: {
    title: 'N3uralia Nano Agent Factory — AI Specialist Platform',
    description: 'Run specialized nano agents from one professional workspace.',
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
