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
      'You can contact us to request access, correction, or deletion of information where applicable.',
  },
]

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <PublicNavbar />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <div className="mb-10">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-4">
            Legal
          </p>
          <h1 className="text-4xl font-semibold text-foreground mb-4 text-balance">
            Privacy policy
          </h1>
          <p className="text-muted-foreground leading-relaxed max-w-2xl">
            This page explains how AgencyOS handles information on the website and product demo.
          </p>
        </div>

        <div className="space-y-8">
          {SECTIONS.map((section) => (
            <section key={section.title} className="border-b border-border pb-8 last:border-0">
              <h2 className="text-lg font-semibold text-foreground mb-2">{section.title}</h2>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl">
                {section.body}
              </p>
            </section>
          ))}
        </div>

        <div className="mt-12 rounded-lg border border-border bg-white p-6">
          <h2 className="text-sm font-semibold text-foreground mb-2">Contact</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            For privacy questions, email{' '}
            <a href="mailto:hello@agencyos.app" className="text-foreground hover:underline">
              hello@agencyos.app
            </a>
            .
          </p>
        </div>
      </main>
    </div>
  )
}
