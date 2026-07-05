'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowRight, Shield } from 'lucide-react'
import { H1Hero, H2Section, H3, Eyebrow, Body } from '@/components/shared/Typography'
import { Button } from '@/components/shared/ButtonStyled'
import { Card } from '@/components/shared/CardStyled'
import { Badge } from '@/components/shared/BadgeStyled'
import { createClient } from '@/lib/supabase/client'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const supabase = createClient()
      const { error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (authError) {
        setError(authError.message)
        setLoading(false)
        return
      }

      router.push('/app')
    } catch (err) {
      setError('An unexpected error occurred')
      setLoading(false)
    }
  }
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#060a10' }}>
      <div className="mx-auto grid min-h-screen max-w-6xl gap-px px-0 lg:grid-cols-[0.95fr_1.05fr] lg:items-stretch">
        <aside
          className="hidden flex-col justify-between border-r border-[#1e3431] px-10 py-14 lg:flex"
          style={{ backgroundColor: '#060a10' }}
        >
          <Link href="/" className="inline-flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center border border-[#28413d] bg-[#0d1f1d] text-[11px] font-semibold tracking-tight text-[#8fb2aa]">
              N3
            </span>
            <div className="leading-tight">
              <span className="block text-sm font-semibold text-[#f5fbfa]">N3uralia Studio</span>
              <span className="block text-[9px] uppercase tracking-[0.26em] text-[#789b96]">Operating workspace</span>
            </div>
          </Link>

          <div className="max-w-xs">
            <Eyebrow className="text-[#789b96]">Command access</Eyebrow>
            <H2Section className="mt-4 text-[#f5fbfa]">
              Sign in to resume the next operating sequence.
            </H2Section>
            <Body variant="dark" className="mt-4 !text-[#9db7b1]">
              Specialists, workflows, and deliverables stay linked so your team can recover context without re-briefing
              the system.
            </Body>

            <div className="mt-10 space-y-3">
              {[
                ['Operational continuity', 'Each run stays attached to owners, handoffs, and the current step.'],
                ['Traceable by default', 'Deliverables, memory, and workflow state stay visible after the run ends.'],
              ].map(([title, desc]) => (
                <Card key={title} variant="dark" className="p-4">
                  <p className="text-xs font-semibold text-[#d9e3e0]">{title}</p>
                  <p className="mt-1 text-xs leading-6 text-[#9db7b1]">{desc}</p>
                </Card>
              ))}
            </div>
          </div>

          <p className="text-xs text-[#52605d]">&copy; {new Date().getFullYear()} N3uralia Studio</p>
        </aside>

        <main
          className="flex min-h-screen items-center justify-center px-6 py-16 lg:px-12"
          style={{ backgroundColor: '#fbfbfa' }}
        >
          <div className="w-full max-w-sm">
            <Link href="/" className="mb-8 flex items-center gap-3 lg:hidden">
              <span className="flex h-8 w-8 items-center justify-center border border-[#d8e5e2] bg-[#f1f6f4] text-[11px] font-semibold tracking-tight text-[#173634]">
                N3
              </span>
              <span className="text-sm font-semibold text-[#173634]">N3uralia Studio</span>
            </Link>

            <div className="mb-8">
              <Badge variant="light" size="md" className="mb-4 inline-flex items-center gap-2">
                <Shield size={11} />
                Secure access
              </Badge>
              <H2Section className="text-[#173634]">Sign in</H2Section>
              <p className="mt-2 text-sm text-[#65706d]">
                No account?{' '}
                <Link href="/signup" className="font-semibold text-[#173634] hover:text-[#8fb2aa]">Start free</Link>
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
            <Card variant="light" className="p-6">
              {error && (
                <div className="mb-4 rounded border border-red-300 bg-red-50 px-3 py-2 text-xs text-red-700">
                  {error}
                </div>
              )}
              <div className="space-y-1.5">
                <label htmlFor="email" className="text-xs font-semibold uppercase tracking-[0.18em] text-[#52605d]">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  className="h-10 w-full border border-[#d8e5e2] bg-[#fbfbfa] px-3 text-sm text-[#173634] outline-none placeholder:text-[#a7b9b4] focus:border-[#8fb2aa] disabled:opacity-50"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="text-xs font-semibold uppercase tracking-[0.18em] text-[#52605d]">
                    Password
                  </label>
                  <Link href="/forgot-password" className="text-xs text-[#789b96] hover:text-[#173634]">
                    Forgot?
                  </Link>
                </div>
                <input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                  className="h-10 w-full border border-[#d8e5e2] bg-[#fbfbfa] px-3 text-sm text-[#173634] outline-none placeholder:text-[#a7b9b4] focus:border-[#8fb2aa] disabled:opacity-50"
                  required
                />
              </div>
              <Button 
                type="submit" 
                variant="primary" 
                size="md" 
                disabled={loading}
                className="w-full inline-flex items-center justify-center gap-2"
              >
                {loading ? 'Signing in...' : <>Sign in <ArrowRight size={13} /></>}
              </Button>
            </Card>
            </form>

            <p className="mt-6 text-center text-xs text-[#a7b9b4]">
              By signing in you agree to our{' '}
              <Link href="/terms" className="hover:text-[#173634] hover:underline">Terms</Link>
              {' '}and{' '}
              <Link href="/privacy" className="hover:text-[#173634] hover:underline">Privacy Policy</Link>.
            </p>
          </div>
        </main>
      </div>
    </div>
  )
}
