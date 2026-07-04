import { Star, Download, TrendingUp, Search, Filter } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export const metadata = {
  title: 'Agent Marketplace | N3uralia Studio',
  description: 'Discover and use specialized agents built by the community.',
}

export default function MarketplacePage() {
  const categories = ['All', 'Content', 'Marketing', 'Engineering', 'Finance', 'Data']
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

      {/* Search and filters */}
      <div className="mb-8 flex gap-3 border-b border-[#d8e5e2] pb-6">
        <div className="flex-1 flex items-center gap-2 border border-[#d8e5e2] bg-white px-3 py-2">
          <Search size={14} className="text-[#d8e5e2]" />
          <input placeholder="Search agents..." className="flex-1 bg-transparent text-sm text-[#173634] placeholder:text-[#173634]/30 focus:outline-none" />
        </div>
        <Button variant="outline" className="h-9 rounded-none border-[#d8e5e2] px-4 text-xs font-semibold uppercase tracking-[0.12em] text-[#173634] hover:bg-[#f1f6f4]">
          <Filter size={14} className="mr-2" /> Sort
        </Button>
      </div>

      {/* Category filter tabs */}
      <div className="mb-8 flex gap-2 overflow-x-auto pb-2">
        {categories.map((cat) => (
          <Button
            key={cat}
            variant={cat === 'All' ? 'default' : 'outline'}
            className={`h-8 rounded-none px-4 text-[10px] font-semibold uppercase tracking-[0.12em] whitespace-nowrap ${
              cat === 'All'
                ? 'bg-[#173634] text-white hover:bg-[#1e3431]'
                : 'border-[#d8e5e2] text-[#173634] hover:bg-[#f1f6f4]'
            }`}
          >
            {cat}
          </Button>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {agents.map((agent) => (
          <Link
            key={agent.id}
            href={`/app/marketplace/${agent.slug}`}
            className="group flex flex-col rounded-none border border-[#d8e5e2] bg-white p-5 hover:bg-[#f1f6f4] transition-colors"
          >
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#8fb2aa]">{agent.category}</p>
                {agent.sales > 2000 && (
                  <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[#8fb2aa]">
                    <TrendingUp size={11} /> Trending
                  </span>
                )}
              </div>
              <h3 className="mt-2 font-semibold text-[#173634]">{agent.title}</h3>
              <p className="mt-1 text-[10px] text-[#173634]/60">by {agent.creator}</p>

              <div className="mt-4 flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={12}
                    className={i < Math.floor(agent.rating) ? 'fill-[#8fb2aa] text-[#8fb2aa]' : 'text-[#d8e5e2]'}
                  />
                ))}
              </div>
              <p className="mt-1 text-[10px] text-[#173634]/60">
                <span className="font-semibold text-[#173634]">{agent.rating}</span> ({agent.reviews} reviews)
              </p>

              {/* Trust metrics */}
              <div className="mt-3 flex items-center gap-3 text-[10px] text-[#173634]/50">
                <div className="flex items-center gap-1">
                  <Download size={11} className="text-[#8fb2aa]" />
                  {agent.sales} sales
                </div>
                <span className="text-[#d8e5e2]">•</span>
                <span className="font-medium text-[#173634]">Verified</span>
              </div>
            </div>

            <div className="mt-5 border-t border-[#d8e5e2] pt-4">
              <div className="flex items-center justify-between">
                <p className="font-semibold text-[#173634]">${agent.price_per_run.toFixed(2)}/run</p>
                <Button className="h-6 rounded-none bg-[#173634] px-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-white hover:bg-[#1e3431]">
                  Use
                </Button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
