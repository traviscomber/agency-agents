import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ArrowRight, Sparkles, Shield } from 'lucide-react'

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(15,23,42,0.08),_transparent_30%),linear-gradient(to_bottom,_#f8fafc,_#ffffff_22%,_#f8fafc_100%)]">
      <div className="mx-auto grid min-h-screen max-w-6xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:py-10">
        <section className="overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-950 p-6 text-white shadow-[0_18px_60px_-44px_rgba(15,23,42,0.45)] sm:p-8">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold tracking-tight">
            <span className="flex size-9 items-center justify-center rounded-xl bg-white/10">
              <Sparkles size={15} />
            </span>
            AgencyOS
          </Link>
          <div className="mt-10 max-w-lg">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/8 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-white/80">
              <Shield size={12} className="text-white" />
              Workspace login
            </div>
            <h1 className="mt-5 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
              Sign in to continue structured work.
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/78 sm:text-base">
              Keep your agents, projects, and saved outputs in one place. The workspace is built to stay readable at a glance.
            </p>
          </div>

          <div className="mt-10 grid gap-3 sm:grid-cols-2">
            {[
              ['Specialist flows', 'Focused paths for agents, projects, and saved work.'],
              ['Consistent system', 'Built to stay aligned with the brandbook.'],
            ].map(([title, desc]) => (
              <div key={title} className="rounded-[1.25rem] border border-white/12 bg-white/8 p-4">
                <p className="text-sm font-semibold text-white">{title}</p>
                <p className="mt-2 text-sm leading-relaxed text-white/78">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        <main className="flex items-center justify-center">
          <div className="w-full max-w-md">
            <div className="mb-8">
              <Link href="/" className="mb-6 inline-flex items-center gap-2 text-sm font-semibold tracking-tight text-foreground lg:hidden">
                <Sparkles size={15} className="text-primary" />
                AgencyOS
              </Link>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-600 shadow-sm">
                <Shield size={12} className="text-primary" />
                Secure access
              </div>
              <h2 className="text-3xl font-semibold tracking-tight text-balance text-foreground">Sign in</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                Don&apos;t have an account?{' '}
                <Link href="/signup" className="font-medium text-foreground hover:underline">
                  Start free
                </Link>
              </p>
            </div>

            <form className="space-y-4 rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-[0_12px_36px_-30px_rgba(15,23,42,0.45)]">
              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email
                </Label>
                <Input id="email" type="email" placeholder="you@example.com" className="h-10 rounded-2xl" />
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-sm font-medium">
                    Password
                  </Label>
                  <Link href="/forgot-password" className="text-xs text-slate-600 transition-colors hover:text-slate-950">
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
                <div key={item} className="rounded-[1.15rem] border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 shadow-sm">
                  {item}
                </div>
              ))}
            </div>

            <p className="mt-6 text-center text-xs text-slate-600">
              By signing in you agree to our{' '}
              <Link href="/terms" className="hover:text-slate-950 hover:underline">
                Terms
              </Link>
              {' '}and{' '}
              <Link href="/privacy" className="hover:text-slate-950 hover:underline">
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
