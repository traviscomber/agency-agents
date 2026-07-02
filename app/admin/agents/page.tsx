import { SEED_AGENTS } from '@/lib/data/seed-agents'
import { DivisionBadge } from '@/components/shared/DivisionBadge'
import { PlanBadge } from '@/components/shared/PlanBadge'
import { Button } from '@/components/ui/button'
import { CheckCircle2, Plus, Sparkles, XCircle } from 'lucide-react'

export default function AdminAgentsPage() {
  const active = SEED_AGENTS.filter((agent) => agent.isActive).length
  const featured = SEED_AGENTS.filter((agent) => agent.isFeatured).length

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <section className="overflow-hidden rounded-[2rem] border border-slate-200 bg-gradient-to-br from-white via-white to-slate-50 shadow-[0_18px_60px_-44px_rgba(15,23,42,0.45)]">
        <div className="grid gap-6 p-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:p-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-600">
              <Sparkles size={12} className="text-primary" />
              Agent catalog
            </div>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Manage the catalog with strong scanability and clear state.
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
              Keep featured agents, plan requirements, and activation state readable at a glance for faster admin work.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="rounded-[1.25rem] border border-slate-200 bg-slate-950 p-4 text-white shadow-[0_18px_40px_-24px_rgba(15,23,42,0.9)]">
              <p className="text-[11px] uppercase tracking-[0.2em] text-white/55">Agents</p>
              <p className="mt-3 text-3xl font-semibold">{SEED_AGENTS.length}</p>
            </div>
            <div className="rounded-[1.25rem] border border-slate-200 bg-white p-4 shadow-sm">
              <p className="text-[11px] uppercase tracking-[0.2em] text-slate-500">Active</p>
              <p className="mt-3 text-3xl font-semibold text-emerald-600">{active}</p>
            </div>
            <div className="rounded-[1.25rem] border border-slate-200 bg-white p-4 shadow-sm">
              <p className="text-[11px] uppercase tracking-[0.2em] text-slate-500">Featured</p>
              <p className="mt-3 text-3xl font-semibold text-foreground">{featured}</p>
            </div>
            <div className="rounded-[1.25rem] border border-slate-200 bg-white p-4 shadow-sm">
              <p className="text-[11px] uppercase tracking-[0.2em] text-slate-500">Create</p>
              <p className="mt-3 text-sm font-semibold text-foreground">New agent flow</p>
            </div>
          </div>
        </div>
      </section>

      <div className="mt-6 overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-[0_12px_36px_-30px_rgba(15,23,42,0.45)]">
        <div className="grid grid-cols-[2fr_1fr_1fr_1fr_auto] gap-4 border-b border-slate-200 bg-slate-50 px-4 py-3">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Agent</span>
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Division</span>
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Plan</span>
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Status</span>
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Actions</span>
        </div>

        {SEED_AGENTS.map((agent, i) => (
          <div
            key={agent.id}
            className={`grid grid-cols-[2fr_1fr_1fr_1fr_auto] items-center gap-4 px-4 py-3.5 ${
              i < SEED_AGENTS.length - 1 ? 'border-b border-slate-200' : ''
            }`}
          >
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-foreground">{agent.name}</p>
              <p className="truncate text-xs text-slate-600">{agent.shortDescription}</p>
            </div>

            <DivisionBadge division={agent.division} size="sm" />

            <PlanBadge plan={agent.planRequired} size="sm" />

            <div className="flex items-center gap-1.5">
              {agent.isActive ? (
                <>
                  <CheckCircle2 size={12} className="text-emerald-600" />
                  <span className="text-xs font-medium text-emerald-700">Active</span>
                </>
              ) : (
                <>
                  <XCircle size={12} className="text-slate-500" />
                  <span className="text-xs font-medium text-slate-600">Inactive</span>
                </>
              )}
              {agent.isFeatured && (
                <span className="ml-1 rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-600 ring-1 ring-slate-200">
                  Featured
                </span>
              )}
            </div>

            <div className="flex gap-1.5">
              <Button variant="outline" size="sm" className="h-7 text-xs">
                Edit
              </Button>
              <Button variant="outline" size="sm" className="h-7 border-destructive/30 text-xs text-destructive hover:bg-destructive/5">
                {agent.isActive ? 'Deactivate' : 'Activate'}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
