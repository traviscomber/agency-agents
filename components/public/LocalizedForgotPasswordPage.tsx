import Link from 'next/link'
import { ArrowRight, Mail } from 'lucide-react'

import { getLocalizedHref, type MarketingLocale } from '@/lib/marketing-i18n'

const copy = {
  es: {
    brand: 'N3uralia Studio',
    badge: 'Recuperar acceso',
    title: 'Recupera el acceso a tu Twin OS.',
    body: 'Ingresa tu email y te enviaremos instrucciones para retomar tus gemelos, programas y entregables.',
    email: 'Email',
    placeholder: 'tu@empresa.cl',
    submit: 'Enviar instrucciones',
    back: 'Volver a ingresar',
    note: 'Mantendremos tus programas, memoria operativa y handoffs asociados a la cuenta.',
  },
  en: {
    brand: 'N3uralia Studio',
    badge: 'Recover access',
    title: 'Recover access to your Twin OS.',
    body: 'Enter your email and we will send instructions to resume your twins, programs, and deliverables.',
    email: 'Email',
    placeholder: 'you@company.com',
    submit: 'Send instructions',
    back: 'Back to sign in',
    note: 'Your programs, operating memory, and handoffs remain associated with the account.',
  },
} satisfies Record<MarketingLocale, Record<string, string>>

type LocalizedForgotPasswordPageProps = {
  locale: MarketingLocale
}

export function LocalizedForgotPasswordPage({ locale }: LocalizedForgotPasswordPageProps) {
  const t = copy[locale]

  return (
    <main className="min-h-screen bg-[#f4f0e8] text-[#201a16]">
      <section className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 py-8">
        <Link
          href={getLocalizedHref(locale, '/')}
          className="w-fit rounded-full border border-[#201a16]/15 bg-white/70 px-4 py-2 text-sm font-semibold tracking-tight text-[#201a16] shadow-sm"
        >
          {t.brand}
        </Link>

        <div className="grid flex-1 items-center gap-10 py-16 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="max-w-2xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#d0783f]/25 bg-[#fff8ee] px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-[#9d4f23]">
              <Mail className="h-4 w-4" />
              {t.badge}
            </div>
            <h1 className="text-4xl font-black leading-[0.95] tracking-[-0.05em] text-[#201a16] md:text-6xl">
              {t.title}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-[#5d5047]">{t.body}</p>
            <p className="mt-4 max-w-xl text-sm leading-6 text-[#7b6b60]">{t.note}</p>
          </div>

          <form className="rounded-[2rem] border border-[#201a16]/10 bg-white p-6 shadow-[0_24px_80px_rgba(32,26,22,0.12)]">
            <label className="text-sm font-bold uppercase tracking-[0.18em] text-[#7b6b60]" htmlFor="email">
              {t.email}
            </label>
            <input
              className="mt-3 h-14 w-full rounded-2xl border border-[#201a16]/15 bg-[#fbf7ef] px-4 text-base text-[#201a16] outline-none transition focus:border-[#d0783f] focus:ring-4 focus:ring-[#d0783f]/15"
              id="email"
              name="email"
              placeholder={t.placeholder}
              type="email"
            />
            <button
              className="mt-5 inline-flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-[#201a16] px-5 text-sm font-black uppercase tracking-[0.16em] text-white transition hover:bg-[#3a2c24]"
              type="button"
            >
              {t.submit}
              <ArrowRight className="h-4 w-4" />
            </button>
            <Link
              className="mt-5 inline-flex w-full items-center justify-center text-sm font-bold text-[#9d4f23] transition hover:text-[#201a16]"
              href={getLocalizedHref(locale, '/login')}
            >
              {t.back}
            </Link>
          </form>
        </div>
      </section>
    </main>
  )
}
