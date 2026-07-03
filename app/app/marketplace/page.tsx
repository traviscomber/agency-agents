import { Star, Download, TrendingUp } from 'lucide-react'
import Link from 'next/link'

export const metadata = {
  title: 'Agent Marketplace | AgencyOS',
  description: 'Discover and use specialized agents built by the community.',
}

export default function MarketplacePage() {
  const agents = [
    {
      id: '1',
      slug: 'content-writer-pro',
      title: 'Content Writer Pro',
      creator: 'Sarah Chen',
      price_per_run: 0.75,
      rating: 4.8,
      reviews: 124,
      sales: 2840,
      category: 'Content',
    },
    {
      id: '2',
      slug: 'seo-optimizer',
      title: 'SEO Optimizer',
      creator: 'Alex Kumar',
      price_per_run: 1.25,
      rating: 4.6,
      reviews: 89,
      sales: 1240,
      category: 'Marketing',
    },
    {
      id: '3',
      slug: 'code-reviewer',
      title: 'Code Reviewer',
      creator: 'Jamie Silva',
      price_per_run: 1.50,
      rating: 4.9,
      reviews: 156,
      sales: 3100,
      category: 'Engineering',
    },
  ]

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <header className="mb-10 border-b border-[#d8e5e2] pb-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#8fb2aa]">Community</p>
        <h1 className="mt-2 text-3xl font-light tracking-tight text-[#173634]">Agent Marketplace</h1>
        <p className="mt-2 text-sm leading-relaxed text-[#173634]/60">
          Discover specialized agents built by community creators. 30% goes to creators, 70% to AgencyOS.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {agents.map((agent) => (
          <Link
            key={agent.id}
            href={`/app/marketplace/${agent.slug}`}
            className="group flex flex-col rounded-none border border-[#d8e5e2] bg-white p-5 hover:bg-[#f1f6f4] transition-colors"
          >
            <div className="flex-1">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#8fb2aa]">{agent.category}</p>
              <h3 className="mt-2 font-semibold text-[#173634]">{agent.title}</h3>
              <p className="mt-1 text-xs text-[#173634]/60">by {agent.creator}</p>

              <div className="mt-4 flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={12}
                    className={i < Math.floor(agent.rating) ? 'fill-[#8fb2aa] text-[#8fb2aa]' : 'text-[#d8e5e2]'}
                  />
                ))}
              </div>
              <p className="mt-1 text-xs text-[#173634]/60">
                {agent.rating} ({agent.reviews} reviews)
              </p>
            </div>

            <div className="mt-5 border-t border-[#d8e5e2] pt-4">
              <div className="flex items-center justify-between">
                <p className="font-semibold text-[#173634]">${agent.price_per_run.toFixed(2)}/run</p>
                <div className="flex items-center gap-1 text-xs text-[#173634]/60">
                  <Download size={12} />
                  {agent.sales} sales
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
