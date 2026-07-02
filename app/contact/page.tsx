import Link from 'next/link'
import { PublicNavbar } from '@/components/public/PublicNavbar'
import { Button } from '@/components/ui/button'
import { ArrowRight, Mail, MessageCircle, Phone, ShieldCheck, Sparkles, Workflow, Shield } from 'lucide-react'

const CONTACT_CHANNELS = [
  {
    icon: Mail,
    title: 'Email',
    detail: 'hello@agencyos.app',
    body: 'Best for product questions, partnerships, and general support.',
    href: 'mailto:hello@agencyos.app',
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
    title: 'Sales',
    detail: 'Book a call',
    body: 'Use this if you want a guided walkthrough for your team or a scoped implementation conversation.',
    href: 'mailto:hello@agencyos.app?subject=AgencyOS%20sales%20conversation',
    cta: 'Start a conversation',
  },
]

const CONTACT_SIGNALS = [
  ['Response time', 'We aim to answer in under 24 business hours.'],
  ['Best for', 'Product questions, onboarding, pricing, and partnership requests.'],
  ['Privacy', 'We only use your message to respond and handle the request.'],
  ['Fit check', 'If needed, we will route you to the right specialist.'],
]

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(15,23,42,0.10),_transparent_32%),radial-gradient(circle_at_top_right,_rgba(201,213,225,0.35),_transparent_30%),linear-gradient(to_bottom,_#f8fafc,_#ffffff_20%,_#f8fafc_100%)]">
      <PublicNavbar />

      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        <section className="overflow-hidden rounded-[2rem] border border-slate-900/10 bg-slate-950 text-white shadow-[0_18px_60px_-44px_rgba(15,23,42,0.45)]">
          <div className="grid gap-8 p-6 lg:grid-cols-[1.05fr_0.95fr] lg:p-8">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/8 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-white/82">
                <ShieldCheck size={12} className="text-white" />
                Contact AgencyOS
              </div>
              <h1 className="mt-4 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
                Reach the team without hunting through the app.
              </h1>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/80 sm:text-base">
                Use the direct channel that fits your request. Product, billing, and partnership questions all land in the
                same place so we can route them quickly.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Button asChild className="bg-white text-slate-950 hover:bg-slate-100">
                  <Link href="mailto:hello@agencyos.app">
                    Email us <ArrowRight size={12} className="ml-1" />
                  </Link>
                </Button>
                <Button variant="outline" asChild className="border-white/24 bg-white/8 text-white hover:bg-white/12 hover:text-white">
                  <Link href="/pricing">See plans</Link>
                </Button>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {[
                  {
                    icon: Workflow,
                    title: 'Route by intent',
                    body: 'Product, billing, and partnership questions are directed to the right place.',
                  },
                  {
                    icon: Shield,
                    title: 'No friction loops',
                    body: 'You do not need to chase the app to find the correct contact path.',
                  },
                ].map(({ icon: Icon, title, body }) => (
                  <div key={title} className="rounded-[1.25rem] border border-white/12 bg-white/7 p-4">
                    <div className="flex items-center gap-2">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-slate-950">
                        <Icon size={15} />
                      </div>
                      <p className="text-sm font-semibold">{title}</p>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-white/80">{body}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              {CONTACT_CHANNELS.map(({ icon: Icon, title, detail, body, href, cta }) => (
                <div key={title} className="rounded-[1.5rem] border border-white/12 bg-white/7 p-5">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white text-slate-950">
                      <Icon size={16} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-white">{title}</p>
                      <p className="mt-1 text-sm text-white/90">{detail}</p>
                      <p className="mt-2 text-sm leading-relaxed text-white/80">{body}</p>
                      <div className="mt-4">
                        <Button variant="outline" size="sm" asChild className="border-white/20 bg-white/8 text-white hover:bg-white/12 hover:text-white">
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
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{body}</p>
            </div>
          ))}
        </section>

        <section className="mt-8 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_12px_36px_-30px_rgba(15,23,42,0.35)] sm:p-8">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Book a diagnosis</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground text-balance">
                If you need a clearer path, we will help you decide what to build next.
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-slate-600">
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
                <div key={item} className="rounded-[1.15rem] border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
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
