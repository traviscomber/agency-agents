import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Sparkles, Mail, ArrowRight } from 'lucide-react'

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(15,23,42,0.08),_transparent_30%),linear-gradient(to_bottom,_#f8fafc,_#ffffff_22%,_#f8fafc_100%)]">
      <div className="mx-auto flex min-h-screen max-w-md items-center px-4 py-10 sm:px-6">
        <div className="w-full">
          <Link href="/" className="mb-6 inline-flex items-center gap-2 text-sm font-semibold tracking-tight text-foreground">
            <Sparkles size={15} className="text-primary" />
            N3uralia Studio
          </Link>
          <div className="mb-8">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-700 shadow-sm">
              <Mail size={12} className="text-primary" />
              Password reset
            </div>
            <h1 className="text-3xl font-semibold tracking-tight text-balance text-foreground">
              Reset your password
            </h1>
            <p className="mt-2 text-sm leading-relaxed text-slate-700">
              Enter your email and we will send you a link to reset your password.
            </p>
          </div>
          <form className="space-y-4 rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-[0_12px_36px_-30px_rgba(15,23,42,0.45)]">
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-sm font-medium">Email</Label>
              <Input id="email" type="email" placeholder="you@example.com" className="h-10 rounded-2xl" />
            </div>
            <Button className="w-full" type="submit">
              Send reset link <ArrowRight size={12} className="ml-1" />
            </Button>
          </form>
          <p className="mt-6 text-center text-sm">
            <Link href="/login" className="text-slate-700 transition-colors hover:text-slate-950">
              Back to sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
