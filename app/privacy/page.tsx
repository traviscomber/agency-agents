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
    <div className="min-h-screen bg-background">
      <PublicNavbar />

      <main className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="mb-10">
          <p className="mb-4 text-xs font-medium uppercase tracking-widest text-slate-500">
            Legal
          </p>
          <h1 className="mb-4 text-balance text-4xl font-semibold text-foreground">
            Privacy policy
          </h1>
          <p className="max-w-2xl leading-relaxed text-slate-600">
            This page explains how AgencyOS handles information on the website, signup flow, and product demo.
          </p>
        </div>

        <div className="space-y-8">
          {SECTIONS.map((section) => (
            <section key={section.title} className="border-b border-slate-200 pb-8 last:border-0">
              <h2 className="mb-2 text-lg font-semibold text-foreground">{section.title}</h2>
              <p className="max-w-3xl text-sm leading-relaxed text-slate-600">
                {section.body}
              </p>
            </section>
          ))}
        </div>

        <div className="mt-12 rounded-lg border border-slate-200 bg-white p-6">
          <h2 className="mb-2 text-sm font-semibold text-foreground">Contact</h2>
          <p className="text-sm leading-relaxed text-slate-600">
            For privacy questions, email{' '}
            <a href="mailto:hello@agencyos.app" className="text-foreground hover:underline">
              hello@agencyos.app
            </a>
            {' '}or use the{' '}
            <Link href="/contact" className="text-foreground hover:underline">
              contact page
            </Link>
            .
          </p>
        </div>
      </main>
    </div>
  )
}
