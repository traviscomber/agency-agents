import Link from 'next/link'
import { ArrowRight, CheckCircle2 } from 'lucide-react'

import { getLocalizedHref, type MarketingLocale } from '@/lib/marketing-i18n'

const copy = {
  es: {
    badge: 'Cuenta creada',
    title: 'Revisa tu email para confirmar el acceso.',
    body: 'La cuenta fue creada. Confirma tu correo para entrar al workspace y desplegar el primer twin supervisado.',
    primary: 'Ingresar',
    secondary: 'Ver implementacion',
    proof: 'El siguiente paso es activar un programa operativo con memoria, entregables y handoffs auditables.',
  },
  en: {
    badge: 'Account created',
    title: 'Check your email to confirm access.',
    body: 'Your account was created. Confirm your email to enter the workspace and deploy the first supervised twin.',
    primary: 'Sign in',
    secondary: 'View implementation',
    proof: 'The next step is activating an operating program with memory, deliverables, and auditable handoffs.',
  },
} satisfies Record<MarketingLocale, Record<string, string>>

type LocalizedSignupSuccessPageProps = {
  locale: MarketingLocale
}

export function LocalizedSignupSuccessPage({ locale }: LocalizedSignupSuccessPageProps) {
  const t = copy[locale]

  return (
    <main className="min-h-screen bg-[#f4f0e8] px-6 py-8 text-[#201a16]">
      <section className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-4xl items-center justify-center">
        <div className="w-full rounded-[2.5rem] border border-[#201a16]/10 bg-white p-8 text-center shadow-[0_24px_90px_rgba(32,26,22,0.14)] md:p-12">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#d0783f]/12 text-[#9d4f23]">
            <CheckCircle2 className="h-8 w-8" />
          </div>
          <div className="mx-auto mb-5 w-fit rounded-full border border-[#d0783f]/25 bg-[#fff8ee] px-4 py-2 text-xs font-black uppercase tracking-[0.24em] text-[#9d4f23]">
            {t.badge}
          </div>
          <h1 className="mx-auto max-w-2xl text-4xl font-black leading-[0.98] tracking-[-0.05em] md:text-6xl">
            {t.title}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-[#5d5047]">{t.body}</p>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-[#7b6b60]">{t.proof}</p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              className="inline-flex h-14 items-center justify-center gap-2 rounded-2xl bg-[#201a16] px-6 text-sm font-black uppercase tracking-[0.16em] text-white transition hover:bg-[#3a2c24]"
              href={getLocalizedHref(locale, '/login')}
            >
              {t.primary}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              className="inline-flex h-14 items-center justify-center rounded-2xl border border-[#201a16]/15 bg-[#fbf7ef] px-6 text-sm font-black uppercase tracking-[0.16em] text-[#201a16] transition hover:border-[#d0783f]"
              href={getLocalizedHref(locale, '/implementation')}
            >
              {t.secondary}
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
