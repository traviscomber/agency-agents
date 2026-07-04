import { Globe, Palette, TrendingUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export const metadata = {
  title: 'White Label Program | N3uralia Studio',
  description: 'Resell N3uralia under your own brand.',
}

export default function WhiteLabelPage() {
  const hasPartnership = false

  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      <header className="mb-10 border-b border-[#d8e5e2] pb-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#8fb2aa]">Monetization</p>
        <h1 className="mt-2 text-3xl font-light tracking-tight text-[#173634]">White Label Program</h1>
      </header>

      {!hasPartnership ? (
        <div className="space-y-8">
          <div className="rounded-none border border-[#d8e5e2] bg-[#f1f6f4] p-8">
            <h2 className="text-lg font-semibold text-[#173634]">Resell N3uralia under your brand</h2>
            <p className="mt-2 text-sm text-[#173634]/70">
              Custom domain, branded interface, and $0.30 per transaction. Minimum $299/month.
            </p>
            <Button asChild className="mt-6 rounded-lg bg-[#8fb2aa] text-white hover:bg-[#7a9a91]">
              <Link href="/app/white-label/setup">Set Up Now</Link>
            </Button>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            {[
              {
                icon: Globe,
                title: 'Custom Domain',
                desc: 'Use your own domain (agents.yourcompany.com)',
              },
              {
                icon: Palette,
                title: 'Branded UI',
                desc: 'Full control over colors, logos, and theming',
              },
              {
                icon: TrendingUp,
                title: '70% Revenue Share',
                desc: 'Keep 70% of all transaction fees + $0.30 per run',
              },
            ].map((feature) => (
              <div key={feature.title} className="rounded-none border border-[#d8e5e2] bg-white p-5">
                <feature.icon size={24} className="text-[#8fb2aa]" />
                <h3 className="mt-3 font-semibold text-[#173634]">{feature.title}</h3>
                <p className="mt-1 text-sm text-[#173634]/60">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="rounded-none border border-[#d8e5e2] bg-white p-6">
            <h2 className="font-semibold text-[#173634]">Your Partnership</h2>
            <div className="mt-4 space-y-3">
              <div>
                <p className="text-xs text-[#173634]/60">Brand Name</p>
                <p className="mt-1 font-semibold text-[#173634]">ACME Automation</p>
              </div>
              <div>
                <p className="text-xs text-[#173634]/60">Custom Domain</p>
                <p className="mt-1 font-semibold text-[#173634]">agents.acme.com</p>
              </div>
              <div>
                <p className="text-xs text-[#173634]/60">Monthly Fee</p>
                <p className="mt-1 font-semibold text-[#173634]">$299 + 30% of transaction fees</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
