import { Star, Download, TrendingUp, Search, Filter, ArrowUpRight, ShieldCheck, Workflow, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export const metadata = {
  title: 'Specialist Exchange | N3uralia Studio',
  description: 'Discover curated specialists, operating packs, and reusable delivery patterns.',
}

export default function MarketplacePage() {
  const categories = ['All', 'Strategy', 'Operations', 'Growth', 'Engineering', 'Compliance']
  const featuredSignals = [
    ['Curated by operators', 'Specialists are reviewed for handoff quality, not only prompt quality.'],
    ['Reusable packs', 'Each listing is framed as a repeatable operating unit with output expectations.'],
    ['Production-minded', 'The best specialists are paired with workflow notes, risks, and next actions.'],
  ]

  const agents = [
    {
      id: '1',
      slug: 'operating-brief-architect',
      title: 'Operating Brief Architect',
      creator: 'N3 Core Team',
      pricePerRun: 1.2,
      rating: 4.8,
      reviews: 124,
      sales: 2840,
      category: 'Strategy',
      fit: 'Best when a team needs a first brief, owner map, and decision path before building.',
      output: 'Brief, workflow outline, decision log',
    },
    {
      id: '2',
      slug: 'workflow-pressure-mapper',
      title: 'Workflow Pressure Mapper',
      creator: 'Camila Torres',
      pricePerRun: 1.4,
      rating: 4.6,
      reviews: 89,
      sales: 1240,
      category: 'Operations',
      fit: 'Best when handoffs, blockers, and late updates are creating execution drag.',
      output: 'Workflow map, blockers, handoff recommendations',
    },
    {
      id: '3',
      slug: 'rollout-proof-builder',
      title: 'Rollout Proof Builder',
      creator: 'Diego Alvarez',
      pricePerRun: 1.65,
      rating: 4.9,
      reviews: 156,
      sales: 3100,
      category: 'Growth',
      fit: 'Best when the team needs launch proof, commercial evidence, and reusable rollout artifacts.',
      output: 'Launch proof, messaging pack, evidence points',
    },
  ]

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(23,54,52,0.06),_transparent_28%),linear-gradient(180deg,#f5f7f6_0%,#fbfbfa_20%,#f5f7f6_100%)]">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <header className="overflow-hidden border border-[#d8e5e2] bg-[linear-gradient(135deg,#ffffff_0%,#f7faf9_52%,#eef5f2_100%)] p-8 shadow-[0_22px_70px_-48px_rgba(15,23,42,0.42)]">
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 border border-[#d8e5e2] bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#52605d]">
                <Sparkles size={12} className="text-[#789b96]" />
                Curated specialist exchange
              </div>
              <h1 className="mt-5 max-w-2xl text-4xl font-semibold tracking-[-0.03em] text-[#173634] sm:text-5xl">
                Specialists that ship reusable operating work, not isolated prompt output.
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-[#52605d] sm:text-base">
                This library is structured around execution pressure: choose the specialist, inspect the output shape,
                and understand the handoff quality before you run anything.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Button className="bg-[#173634] text-white hover:bg-[#0d1f1d]">
                  Inspect featured packs <ArrowUpRight size={13} className="ml-1" />
                </Button>
                <Button variant="outline" className="border-[#d8e5e2] bg-white text-[#173634] hover:bg-[#f1f6f4]">
                  Submit a specialist
                </Button>
              </div>
            </div>

            <div className="grid gap-3">
              {featuredSignals.map(([title, body]) => (
                <div key={title} className="rounded-[1.35rem] border border-[#d8e5e2] bg-white/90 p-4">
                  <p className="text-sm font-semibold text-[#173634]">{title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-[#52605d]">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </header>

        <section className="mt-8 grid gap-4 lg:grid-cols-[0.82fr_1.18fr]">
          <div className="rounded-[1.75rem] border border-[#d8e5e2] bg-[#173634] p-6 text-[#f5fbfa] shadow-[0_16px_44px_-28px_rgba(15,23,42,0.42)]">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#9db7b1]">Selection criteria</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight">Why this exchange feels different</h2>
            <div className="mt-6 space-y-4">
              {[
                ['Output first', 'Each listing makes the artifact shape explicit before the run starts.'],
                ['Workflow aware', 'Specialists are framed by the handoff they create for the next owner.'],
                ['Commercially legible', 'Buyers can tell whether the specialist creates proof, action, or escalation.'],
              ].map(([title, body]) => (
                <div key={title} className="rounded-[1.15rem] border border-white/10 bg-white/5 p-4">
                  <p className="text-sm font-semibold text-white">{title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-[#d9e3e0]">{body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-[#d8e5e2] bg-white p-5 shadow-[0_16px_44px_-34px_rgba(15,23,42,0.35)]">
            <div className="mb-6 flex flex-col gap-3 border-b border-[#d8e5e2] pb-5 sm:flex-row">
              <div className="flex flex-1 items-center gap-22xl border border-[#d8e5e2] bg-[#fbfbfa] px-3 py-2.5">
                <Search size={15} className="text-[#8aa29c]" />
                <input
                  placeholder="Search by operating pressure, specialist, or deliverable..."
                  className="flex-1 bg-transparent text-sm text-[#173634] placeholder:text-[#789b96] focus:outline-none"
                />
              </div>
              <Button variant="outline" className="h-112xl border-[#d8e5e2] px-4 text-xs font-semibold uppercase tracking-[0.12em] text-[#173634] hover:bg-[#f1f6f4]">
                <Filter size={14} className="mr-2" /> Sort by proof
              </Button>
            </div>

            <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
              {categories.map((cat) => (
                <Button
                  key={cat}
                  variant={cat === 'All' ? 'default' : 'outline'}
                  className={`h-9 px-4 text-[10px] font-semibold uppercase tracking-[0.14em] whitespace-nowrap ${
                    cat === 'All'
                      ? 'bg-[#173634] text-white hover:bg-[#1e3431]'
                      : 'border-[#d8e5e2] bg-white text-[#173634] hover:bg-[#f1f6f4]'
                  }`}
                >
                  {cat}
                </Button>
              ))}
            </div>

            <div className="grid gap-4 xl:grid-cols-3">
              {agents.map((agent) => (
                <Link
                  key={agent.id}
                  href={`/app/marketplace/${agent.slug}`}
                  className="group flex flex-col border border-[#d8e5e2] bg-[linear-gradient(180deg,#ffffff_0%,#f7faf9_100%)] p-5 transition-transform hover:-translate-y-1 hover:shadow-[0_16px_44px_-32px_rgba(15,23,42,0.4)]"
                >
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#789b96]">{agent.category}</p>
                      {agent.sales > 2000 && (
                        <span className="flex items-center gap-1 bg-[#eef5f2] px-2 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[#4f716a]">
                          <TrendingUp size={11} /> Trending
                        </span>
                      )}
                    </div>
                    <h3 className="mt-3 text-lg font-semibold text-[#173634]">{agent.title}</h3>
                    <p className="mt-1 text-[11px] uppercase tracking-[0.12em] text-[#65706d]">by {agent.creator}</p>

                    <p className="mt-4 text-sm leading-relaxed text-[#52605d]">{agent.fit}</p>

                    <div className="mt-4 border border-[#d8e5e2] bg-white/80 p-3">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#789b96]">Expected output</p>
                      <p className="mt-2 text-sm text-[#173634]">{agent.output}</p>
                    </div>

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

                    <div className="mt-3 flex items-center gap-3 text-[10px] text-[#173634]/50">
                      <div className="flex items-center gap-1">
                        <Download size={11} className="text-[#8fb2aa]" />
                        {agent.sales} runs
                      </div>
                      <span className="text-[#d8e5e2]">•</span>
                      <span className="inline-flex items-center gap-1 font-medium text-[#173634]">
                        <ShieldCheck size={11} className="text-[#789b96]" />
                        Reviewed
                      </span>
                    </div>
                  </div>

                  <div className="mt-5 border-t border-[#d8e5e2] pt-4">
                    <div className="mb-3 flex items-center gap-2 text-[10px] uppercase tracking-[0.14em] text-[#65706d]">
                      <Workflow size={11} className="text-[#789b96]" />
                      Handoff aware specialist
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-[#173634]">${agent.pricePerRun.toFixed(2)}/run</p>
                      <Button className="h-8 bg-[#173634] px-4 text-[10px] font-semibold uppercase tracking-[0.12em] text-white hover:bg-[#1e3431]">
                        Inspect
                      </Button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
