import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AgencyOS — Your AI Specialist Agency',
  description:
    'Access specialized AI agents for product, code, design, sales, strategy, security, and operations. Run tasks, save outputs, and organize your work from one professional dashboard.',
  keywords: ['AI agents', 'specialist agents', 'AI workspace', 'productivity', 'SaaS'],
  authors: [{ name: 'AgencyOS' }],
  openGraph: {
    title: 'AgencyOS — Your AI Specialist Agency',
    description: 'Run specialized AI agents from one professional workspace.',
    type: 'website',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#ffffff',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} bg-background`}>
      <body className="font-sans antialiased bg-background text-foreground">
        {children}
      </body>
    </html>
  )
}
