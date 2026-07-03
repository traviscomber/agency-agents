import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { EmptyState } from '@/components/shared/EmptyState'
import { DivisionBadge } from '@/components/shared/DivisionBadge'
import { Clock, Edit2, Trash2, Plus } from 'lucide-react'

const SCHEDULED_RUNS = [
  {
    id: '1',
    name: 'Daily Blog Post',
    agent_slug: 'content-writer',
    frequency: 'daily',
    next_run_at: new Date(Date.now() + 86400000),
    is_active: true
  },
  {
    id: '2',
    name: 'Weekly Report',
    agent_slug: 'data-analyst',
    frequency: 'weekly',
    next_run_at: new Date(Date.now() + 604800000),
    is_active: true
  }
]

export default function ScheduledRunsPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between border-b border-[#d8e5e2] pb-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#8fb2aa]">Automation</p>
          <h1 className="mt-2 text-3xl font-light tracking-tight text-[#173634]">Scheduled Runs</h1>
          <p className="mt-2 text-sm text-[#173634]/60">Set agents to run automatically on a schedule.</p>
        </div>
        <Button className="rounded-lg bg-[#8fb2aa] px-4 py-2 text-sm font-semibold text-white hover:bg-[#7a9a91]">
          <Plus size={14} className="mr-1.5" />
          New schedule
        </Button>
      </div>

      {SCHEDULED_RUNS.length === 0 ? (
        <EmptyState
          icon={Clock}
          title="No scheduled runs yet"
          description="Automate agent execution with daily, weekly, or monthly schedules."
          ctaLabel="Create schedule"
          ctaHref="/app/scheduled-runs/new"
        />
      ) : (
        <div className="space-y-2">
          {SCHEDULED_RUNS.map((run) => (
            <div key={run.id} className="flex items-center justify-between border border-[#d8e5e2] bg-white px-5 py-4">
              <div>
                <p className="font-semibold text-[#173634]">{run.name}</p>
                <p className="mt-1 text-xs text-[#173634]/60">
                  {run.frequency.charAt(0).toUpperCase() + run.frequency.slice(1)} • Next run: {run.next_run_at.toLocaleDateString()}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="inline-flex items-center gap-2 rounded-full bg-[#f1f6f4] px-3 py-1 text-xs font-semibold text-[#8fb2aa]">
                  {run.is_active ? '✓ Active' : 'Paused'}
                </div>
                <Button variant="ghost" size="sm" className="text-[#173634]/60 hover:text-[#173634]">
                  <Edit2 size={14} />
                </Button>
                <Button variant="ghost" size="sm" className="text-red-500/60 hover:text-red-500">
                  <Trash2 size={14} />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pricing info */}
      <div className="border border-[#d8e5e2] bg-[#f1f6f4] px-5 py-4">
        <p className="text-xs font-semibold text-[#173634]">Feature availability</p>
        <p className="mt-2 text-xs leading-relaxed text-[#173634]/70">
          Scheduled runs are available on Pro plan and above. Upgrade to automate your workflows.
        </p>
      </div>
    </div>
  )
}
