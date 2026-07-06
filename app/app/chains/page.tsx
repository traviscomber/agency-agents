import { ArrowRight, Plus } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export const metadata = {
  title: 'Twin Chains | N3uralia Studio',
  description: 'Create automated workflows by chaining gemelos digitales together.',
}

export default function ChainsPage() {
  const chains = [
    {
      id: '1',
      name: 'Content Pipeline',
      description: 'Draft → Review → Publish workflow',
      agents: ['content-writer', 'editor', 'publisher'],
      runs: 124,
    },
  ]

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <header className="mb-10 border-b border-[#d8e5e2] pb-8">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#8fb2aa]">Workflows</p>
            <h1 className="mt-2 text-3xl font-light tracking-tight text-[#173634]">Twin Chains</h1>
            <p className="mt-2 text-sm leading-relaxed text-[#173634]/60">
              Automate multi-step workflows by chaining gemelos digitales together. Output from one becomes input to the next.
            </p>
          </div>
          <Button asChild className="rounded-lg bg-[#8fb2aa] text-white hover:bg-[#7a9a91]">
            <Link href="/app/chains/new">
              <Plus size={14} className="mr-2" />
              New Chain
            </Link>
          </Button>
        </div>
      </header>

      <div className="space-y-3">
        {chains.length === 0 ? (
          <div className="rounded-none border border-[#d8e5e2] bg-[#f1f6f4] px-6 py-10 text-center">
            <p className="text-sm text-[#173634]/60">No chains yet. Create one to automate multi-step workflows.</p>
          </div>
        ) : (
          chains.map((chain) => (
            <Link
              key={chain.id}
              href={`/app/chains/${chain.id}`}
              className="flex items-start justify-between border border-[#d8e5e2] bg-white px-6 py-4 hover:bg-[#f1f6f4] transition-colors"
            >
              <div className="flex-1">
                <h3 className="font-semibold text-[#173634]">{chain.name}</h3>
                <p className="mt-1 text-sm text-[#173634]/60">{chain.description}</p>
                <div className="mt-3 flex items-center gap-2">
                  {chain.agents.map((agent, idx) => (
                    <div key={agent} className="flex items-center gap-2">
                      <span className="inline-block bg-[#8fb2aa] px-2 py-1 text-xs text-white">{agent}</span>
                      {idx < chain.agents.length - 1 && <ArrowRight size={14} className="text-[#555a56]" />}
                    </div>
                  ))}
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-[#173634]">{chain.runs}</p>
                <p className="text-xs text-[#173634]/60">runs</p>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  )
}
