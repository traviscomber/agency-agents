import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Sparkles } from 'lucide-react'

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="grid min-h-screen lg:grid-cols-[0.95fr_1.05fr]">
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
              "AgencyOS replaced 4 separate tools for me. I run everything from product strategy to code review in one place now."
            </blockquote>
            <p className="mt-4 text-sm text-slate-300">Product Manager, B2B SaaS</p>
          </div>
        </aside>

        <main className="flex items-center justify-center px-4 py-10 sm:px-6">
          <div className="w-full max-w-sm">
            <div className="mb-8">
              <Link href="/" className="mb-6 inline-flex items-center gap-2 text-sm font-semibold tracking-tight text-foreground lg:hidden">
                <Sparkles size={15} className="text-primary" />
                AgencyOS
              </Link>
              <h1 className="text-3xl font-semibold tracking-tight text-foreground text-balance">Sign in</h1>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Don&apos;t have an account?{' '}
                <Link href="/signup" className="font-medium text-foreground hover:underline">
                  Start free
                </Link>
              </p>
            </div>

            <form className="space-y-4 rounded-2xl border border-border bg-white p-6 shadow-sm">
              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-sm">
                  Email
                </Label>
                <Input id="email" type="email" placeholder="you@example.com" className="h-10" />
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-sm">
                    Password
                  </Label>
                  <Link href="/forgot-password" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                    Forgot password?
                  </Link>
                </div>
                <Input id="password" type="password" placeholder="Enter your password" className="h-10" />
              </div>
              <Button className="w-full" type="submit">
                Sign in
              </Button>
            </form>

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
