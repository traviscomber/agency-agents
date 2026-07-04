import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { MOCK_RUNS } from '@/lib/data/mock-store'
import { DivisionBadge } from '@/components/shared/DivisionBadge'
import { ArrowRight, FolderOpen } from 'lucide-react'

function formatDate(date: string) {
  return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(date))
}

export default function HistoryPage() {
  const completedRuns = MOCK_RUNS.filter((r) => r.status === 'completed').length
  const failedRuns = MOCK_RUNS.filter((r) => r.status === 'failed').length

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <header className="mb-10 border-b border-[#d8e5e2] pb-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#8fb2aa]">Activity</p>
        <h1 className="mt-2 text-3xl font-light tracking-tight text-[#173634]">Run history.</h1>
        <p className="mt-2 text-sm leading-relaxed text-[#173634]/60">
          Every agent execution, result, and project link in one chronological view.
        </p>
      </header>

      <div className="mb-10 grid grid-cols-3 gap-px border border-[#d8e5e2] bg-[#d8e5e2]">
        {[
          { label: 'Total runs', value: MOCK_RUNS.length },
          { label: 'Completed', value: completedRuns },
          { label: 'Failed', value: failedRuns },
        ].map(({ label, value }) => (
          <div key={label} className="bg-[#fbfbfa] px-5 py-5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#8fb2aa]">{label}</p>
            <p className="mt-2 text-3xl font-light text-[#173634]">{value}</p>
          </div>
        ))}
      </div>

      {MOCK_RUNS.length === 0 ? (
        <div className="border border-[#d8e5e2] px-8 py-16 text-center">
          <p className="text-sm font-medium text-[#173634]">No runs yet</p>
          <p className="mt-1 text-xs text-[#173634]/45">Run an agent to populate this timeline.</p>
          <Button asChild className="mt-6 h-9 rounded-none bg-[#173634] px-5 text-xs font-semibold uppercase tracking-[0.16em] text-white hover:bg-[#1e3431]">
            <Link href="/app/agents">Browse agents</Link>
          </Button>
        </div>
      ) : (
        <div className="divide-y divide-[#d8e5e2] border border-[#d8e5e2]">
          {MOCK_RUNS.map((run) => (
            <div key={run.id} className="flex items-start justify-between gap-4 px-5 py-5 hover:bg-[#f1f6f4]">
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-sm font-medium text-[#173634]">{run.agentName}</p>
                  <DivisionBadge division={run.division} size="sm" />
                </div>
                <p className="mt-1 max-w-2xl truncate text-xs leading-relaxed text-[#173634]/50">{run.task}</p>
                <div className="mt-2 flex flex-wrap items-center gap-3 text-[10px] text-[#173634]/38">
                  <span>{formatDate(run.createdAt)}</span>
                  {run.projectName && (
                    <span className="inline-flex items-center gap-1">
                      <FolderOpen size={10} />{run.projectName}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-3">
                <span className={`border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] ${
                  run.status === 'completed'
                    ? 'border-[#d8e5e2] bg-[#f1f6f4] text-[#8fb2aa]'
                    : run.status === 'failed'
                    ? 'border-red-200 bg-red-50 text-red-500'
                    : 'border-amber-200 bg-amber-50 text-amber-600'
                }`}>
                  {run.status}
                </span>
                <Link href={`/app/run/${run.agentId}`} className="text-[#d8e5e2] transition-colors hover:text-[#8fb2aa]">
                  <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
