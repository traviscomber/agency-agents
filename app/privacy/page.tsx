import Link from 'next/link'
import { PublicNavbar } from '@/components/public/PublicNavbar'

const SECTIONS = [
  {
    title: 'Information we collect',
    body:
      'We may collect basic account details, usage data, and technical logs needed to operate the site and improve the product experience.',
  },
  {
    title: 'How we use information',
    body:
      'Information is used to deliver the product, maintain security, analyze usage, and support product development.',
  },
  {
    title: 'Sharing',
    body:
      'We do not sell personal information. We may share data with service providers that help us run the product, or when required by law.',
  },
  {
    title: 'Your choices',
    body:
      'You can contact us through the contact page to request access, correction, or deletion of information where applicable.',
  },
]

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(15,23,42,0.08),_transparent_30%),linear-gradient(to_bottom,_#f8fafc,_#ffffff_22%,_#f8fafc_100%)]">
      <PublicNavbar />

      <main className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-20">
        <section className="overflow-hidden rounded-[2rem] border border-slate-200 bg-[linear-gradient(135deg,#ffffff_0%,#ffffff_56%,#f8fafc_100%)] p-6 shadow-[0_18px_60px_-44px_rgba(15,23,42,0.45)] sm:p-8">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-slate-600">Legal</p>
          <h1 className="text-4xl font-semibold tracking-tight text-balance text-foreground">Privacy policy</h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-700">
            This page explains how AgencyOS handles information on the website, signup flow, and product demo.
          </p>
        </section>

        <div className="mt-8 space-y-4">
          {SECTIONS.map((section) => (
            <section
              key={section.title}
              className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-[0_12px_36px_-30px_rgba(15,23,42,0.35)]"
            >
              <h2 className="text-lg font-semibold text-foreground">{section.title}</h2>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-700">{section.body}</p>
            </section>
          ))}
        </div>

        <section className="mt-8 rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-[0_12px_36px_-30px_rgba(15,23,42,0.35)]">
          <h2 className="text-sm font-semibold text-foreground">Contact</h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-700">
            For privacy questions, email{' '}
            <a href="mailto:hello@agencyos.app" className="font-medium text-foreground hover:underline">
              hello@agencyos.app
            </a>
            {' '}or use the{' '}
            <Link href="/contact" className="font-medium text-foreground hover:underline">
              contact page
            </Link>
            .
          </p>
        </section>
      </main>
    </div>
  )
}
