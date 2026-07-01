import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ArrowRight, Sparkles, Shield } from 'lucide-react'

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(15,23,42,0.10),_transparent_32%),radial-gradient(circle_at_top_right,_rgba(201,213,225,0.35),_transparent_30%),linear-gradient(to_bottom,_#f8fafc,_#ffffff_20%,_#f8fafc_100%)]">
      <div className="grid min-h-screen lg:grid-cols-[0.98fr_1.02fr]">
        <aside className="hidden border-r border-border/70 bg-slate-950 p-10 text-white lg:flex lg:flex-col lg:justify-between">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold tracking-tight">
            <span className="flex size-9 items-center justify-center rounded-xl bg-white/10">
              <Sparkles size={15} />
            </span>
            AgencyOS
          </Link>
          <div className="max-w-md">
            <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Workspace login</p>
            <blockquote className="mt-4 text-2xl font-medium leading-tight text-balance">
              "AgencyOS turns agent work into something structured, readable, and easy to revisit."
            </blockquote>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {[
                ['Specialist flows', 'Focused paths for agents, projects, and saved work.'],
                ['Consistent system', 'Built to stay aligned with the brandbook.'],
              ].map(([title, desc]) => (
                <div key={title} className="rounded-[1.25rem] border border-white/10 bg-white/5 p-4">
                  <p className="text-sm font-semibold">{title}</p>
                  <p className="mt-2 text-sm text-slate-300">{desc}</p>
                </div>
              ))}
            </div>
          </div>
          <p className="text-sm text-slate-300">Product Manager, B2B SaaS</p>
        </aside>

        <main className="flex items-center justify-center px-4 py-10 sm:px-6">
          <div className="w-full max-w-md">
            <div className="mb-8">
              <Link href="/" className="mb-6 inline-flex items-center gap-2 text-sm font-semibold tracking-tight text-foreground lg:hidden">
                <Sparkles size={15} className="text-primary" />
                AgencyOS
              </Link>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-muted-foreground shadow-sm">
                <Shield size={12} className="text-primary" />
                Secure access
              </div>
              <h1 className="text-3xl font-semibold tracking-tight text-foreground text-balance">Sign in</h1>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Don&apos;t have an account?{' '}
                <Link href="/signup" className="font-medium text-foreground hover:underline">
                  Start free
                </Link>
              </p>
            </div>

            <form className="space-y-4 rounded-[1.5rem] border border-border bg-white p-6 shadow-[0_12px_36px_-30px_rgba(15,23,42,0.45)]">
              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-sm">
                  Email
                </Label>
                <Input id="email" type="email" placeholder="you@example.com" className="h-10 rounded-2xl" />
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-sm">
                    Password
                  </Label>
                  <Link href="/forgot-password" className="text-xs text-muted-foreground transition-colors hover:text-foreground">
                    Forgot password?
                  </Link>
                </div>
                <Input id="password" type="password" placeholder="Enter your password" className="h-10 rounded-2xl" />
              </div>
              <Button className="w-full" type="submit">
                Sign in <ArrowRight size={12} className="ml-1" />
              </Button>
            </form>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {[
                'Planned structure for specialist teams',
                'A polished, brand-aligned login surface',
              ].map((item) => (
                <div key={item} className="rounded-[1.15rem] border border-border bg-white px-4 py-3 text-sm text-muted-foreground shadow-sm">
                  {item}
                </div>
              ))}
            </div>

            <p className="mt-6 text-center text-xs text-muted-foreground">
              By signing in you agree to our{' '}
              <Link href="/terms" className="hover:text-foreground hover:underline">
                Terms
              </Link>
              {' '}and{' '}
              <Link href="/privacy" className="hover:text-foreground hover:underline">
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </main>
      </div>
    </div>
  )
}
