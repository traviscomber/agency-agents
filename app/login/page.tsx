import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-background flex">
      {/* Left panel */}
      <div className="hidden lg:flex flex-col justify-between w-96 bg-white border-r border-border p-10">
        <Link href="/" className="text-sm font-semibold text-foreground">AgencyOS</Link>
        <div>
          <blockquote className="text-sm text-muted-foreground leading-relaxed italic mb-3">
            &ldquo;AgencyOS replaced 4 separate tools for me. I run everything from product strategy to
            code review in one place now.&rdquo;
          </blockquote>
          <p className="text-xs font-medium text-foreground">Product Manager, B2B SaaS</p>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-sm">
          <div className="mb-8">
            <Link href="/" className="text-sm font-semibold text-foreground lg:hidden mb-6 inline-block">
              AgencyOS
            </Link>
            <h1 className="text-2xl font-semibold text-foreground mb-2">Sign in</h1>
            <p className="text-sm text-muted-foreground">
              Don&apos;t have an account?{' '}
              <Link href="/signup" className="text-foreground font-medium hover:underline">
                Start free
              </Link>
            </p>
          </div>

          <form className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-sm">Email</Label>
              <Input id="email" type="email" placeholder="you@example.com" className="h-9" />
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-sm">Password</Label>
                <Link href="/forgot-password" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                  Forgot password?
                </Link>
              </div>
              <Input id="password" type="password" placeholder="••••••••" className="h-9" />
            </div>
            <Button className="w-full" type="submit">
              Sign in
            </Button>
          </form>

          <p className="mt-6 text-xs text-muted-foreground text-center">
            By signing in you agree to our{' '}
            <Link href="/terms" className="hover:underline">Terms</Link>
            {' '}and{' '}
            <Link href="/privacy" className="hover:underline">Privacy Policy</Link>.
          </p>
        </div>
      </div>
    </div>
  )
}
