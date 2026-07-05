import Link from 'next/link'
import { PublicNavbar } from '@/components/public/PublicNavbar'
import { Button } from '@/components/ui/button'
import { ArrowRight, Mail, MessageCircle, Phone, ShieldCheck, Workflow, Shield } from 'lucide-react'

const CONTACT_CHANNELS = [
  {
    icon: Mail,
    title: 'Email',
    detail: 'hello@n3uralia.com',
    body: 'Best for product questions, partnership requests, and implementation follow-up.',
    href: 'mailto:hello@n3uralia.com',
    cta: 'Send email',
  },
  {
    icon: MessageCircle,
    title: 'WhatsApp',
    detail: '+56 9 6316 0187',
    body: 'Best for urgent coordination or time-sensitive questions.',
    href: 'https://wa.me/56963160187',
    cta: 'Chat on WhatsApp',
  },
  {
    icon: Phone,
    title: 'Diagnosis',
    detail: 'Book an operating review',
    body: 'Use this if you want a guided walkthrough, fit check, or a scoped conversation around the first workflow to build.',
    href: 'mailto:hello@n3uralia.com?subject=N3uralia%20operating%20diagnosis',
    cta: 'Request diagnosis',
  },
]

const CONTACT_SIGNALS = [
  ['Response time', 'We aim to answer in under 24 business hours.'],
  ['Best for', 'Diagnosis, onboarding, implementation questions, and partnership requests.'],
  ['Privacy', 'We only use your message to respond and handle the request.'],
  ['Fit check', 'If needed, we route the conversation to the right specialist path.'],
]

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(15,23,42,0.08),_transparent_30%),linear-gradient(to_bottom,_#f8fafc,_#ffffff_22%,_#f8fafc_100%)]">
      <PublicNavbar />

      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        <section className="overflow-hidden border border-slate-200 bg-[linear-gradient(135deg,#ffffff_0%,#ffffff_54%,#f8fafc_100%)] shadow-[0_18px_60px_-44px_rgba(15,23,42,0.45)]">
          <div className="grid gap-8 p-6 lg:grid-cols-[1.05fr_0.95fr] lg:p-8">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 border border-slate-200 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-700">
                <ShieldCheck size={12} className="text-primary" />
                Contact N3uralia
              </div>
              <h1 className="mt-4 text-4xl font-semibold tracking-tight text-balance text-foreground sm:text-5xl">
                Reach the team through the channel that matches the operational pressure.
              </h1>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-700 sm:text-base">
                N3uralia is built around diagnosis, build, and operating continuity. Reach out with the problem, and we
                route the conversation to the right specialist path quickly.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Button asChild>
                  <Link href="mailto:hello@n3uralia.com">
                    Email us <ArrowRight size={12} className="ml-1" />
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/pricing">See plans</Link>
                </Button>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {[
                  {
                    icon: Workflow,
                    title: 'Route by pressure',
                    body: 'Product, diagnosis, and implementation requests are directed to the right starting point.',
                  },
                  {
                    icon: Shield,
                    title: 'Operational fit first',
                    body: 'The first conversation is scoped around risk, ownership, and the next useful layer to build.',
                  },
                ].map(({ icon: Icon, title, body }) => (
                  <div key={title} className="rounded-[1.25rem] border border-slate-200 bg-white p-4 shadow-sm">
                    <div className="flex items-center gap-2">
                      <div className="flex h-9 w-9 items-center justify-center bg-slate-100 text-slate-800">
                        <Icon size={15} />
                      </div>
                      <p className="text-sm font-semibold text-foreground">{title}</p>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-slate-700">{body}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              {CONTACT_CHANNELS.map(({ icon: Icon, title, detail, body, href, cta }) => (
                <div key={title} className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center2xl bg-slate-950 text-white">
                      <Icon size={16} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-foreground">{title}</p>
                      <p className="mt-1 text-sm text-slate-700">{detail}</p>
                      <p className="mt-2 text-sm leading-relaxed text-slate-700">{body}</p>
                      <div className="mt-4">
                        <Button variant="outline" size="sm" asChild>
                          <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noreferrer' : undefined}>
                            {cta}
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-4 lg:grid-cols-4">
          {CONTACT_SIGNALS.map(([title, body]) => (
            <div key={title} className="rounded-[1.35rem] border border-slate-200 bg-white p-5 shadow-[0_12px_36px_-30px_rgba(15,23,42,0.35)]">
              <p className="text-sm font-semibold text-foreground">{title}</p>
              <p className="mt-2 text-sm leading-relaxed text-slate-700">{body}</p>
            </div>
          ))}
        </section>

        <section className="mt-8 border border-slate-200 bg-white p-6 shadow-[0_12px_36px_-30px_rgba(15,23,42,0.35)] sm:p-8">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-700">Book a diagnosis</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-balance text-foreground">
                If you need a clearer path, we will help you decide what to build next.
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-slate-700">
                The first conversation is not a sales pitch. It is a filter for fit, scope, and the right starting point.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {[
                'Operational diagnosis',
                'Pricing and plan guidance',
                'Partnership opportunities',
                'Implementation questions',
              ].map((item) => (
                <div key={item} className="rounded-[1.15rem] border border-slate-200 bg-gradient-to-b from-slate-50 to-white px-4 py-3 text-sm text-slate-700">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
