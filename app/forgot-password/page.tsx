import Link from 'next/link'
import { Mail, ArrowRight } from 'lucide-react'
import { H2Section, Body, Eyebrow } from '@/components/shared/Typography'
import { Button } from '@/components/shared/ButtonStyled'
import { Card } from '@/components/shared/CardStyled'
import { Badge } from '@/components/shared/BadgeStyled'

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#fbfbfa' }}>
      <div className="mx-auto flex min-h-screen max-w-md items-center px-6 py-10 sm:px-8">
        <div className="w-full">
          <Link href="/" className="mb-8 inline-flex items-center gap-2 text-sm font-semibold tracking-tight text-[#173634]">
            <span className="flex h-8 w-8 items-center justify-center border border-[#d8e5e2] bg-[#f1f6f4] text-[11px] font-semibold tracking-tight text-[#173634]">
              N3
            </span>
            N3uralia Studio
          </Link>

          <div className="mb-8">
            <Badge variant="light" size="md" className="mb-4 inline-flex items-center gap-2">
              <Mail size={12} />
              Password reset
            </Badge>
            <H2Section className="text-[#173634]">Reset your password</H2Section>
            <Body variant="light" className="mt-3">
              Enter your email and we will send you a link to reset your password.
            </Body>
          </div>

          <form className="space-y-4">
            <Card variant="light" className="p-6">
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label htmlFor="email" className="text-xs font-semibold uppercase tracking-[0.18em] text-[#52605d]">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    className="h-10 w-full border border-[#d8e5e2] bg-white px-3 text-sm text-[#173634] outline-none placeholder:text-[#a7b9b4] focus:border-[#8fb2aa]"
                  />
                </div>
                <Button type="submit" variant="primary" size="md" className="w-full inline-flex items-center justify-center gap-2">
                  Send reset link <ArrowRight size={13} />
                </Button>
              </div>
            </Card>
          </form>

          <p className="mt-6 text-center text-xs text-[#a7b9b4]">
            <Link href="/login" className="text-[#173634] transition-colors hover:text-[#8fb2aa]">
              Back to sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
