import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { MOCK_USER, MOCK_RUNS } from '@/lib/data/mock-store'
import { getPlanById } from '@/lib/data/plans'
import { DivisionBadge } from '@/components/shared/DivisionBadge'
import { ArrowRight } from 'lucide-react'

export default function UsagePage() {
  const plan = getPlanById(MOCK_USER.plan)
  const runsUsed = MOCK_RUNS.length
  const runsLimit = plan?.monthlyRunLimit || 5
  const usagePercent = Math.min((runsUsed / runsLimit) * 100, 100)

  const runsByDivision = MOCK_RUNS.reduce<Record<string, number>>((acc, run) => {
    const div = run.agentDivision ?? 'Unknown'
    acc[div] = (acc[div] || 0) + 1
    return acc
  }, {})

  const runsByAgent = MOCK_RUNS.reduce<Record<string, { name: string; division: string; count: number }>>((acc, run) => {
    const div = run.agentDivision ?? 'Unknown'
    if (!acc[run.agentId]) acc[run.agentId] = { name: run.agentName, division: div, count: 0 }
    acc[run.agentId].count += 1
    return acc
  }, {})

  const topAgents = Object.values(runsByAgent).sort((a, b) => b.count - a.count).slice(0, 6)

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <header className="mb-10 border-b border-[#d8e5e2] pb-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#8fb2aa]">Uso operativo</p>
        <h1 className="mt-2 text-3xl font-light tracking-tight text-[#173634]">Capacidad de ejecucion del Twin OS.</h1>
        <p className="mt-2 text-sm leading-relaxed text-[#173634]/60">
          Controla la capacidad mensual del plan e identifica que gemelos digitales concentran mas rutinas operativas.
        </p>
      </header>

      {/* Stats */}
      <div className="mb-10 grid grid-cols-3 gap-px border border-[#d8e5e2] bg-[#d8e5e2]">
        {[
          { label: 'Plan', value: plan?.name ?? '-', cap: true },
          { label: 'Rutinas ejecutadas', value: String(runsUsed), cap: false },
          { label: 'Capacidad mensual', value: runsLimit === Infinity ? 'Ilimitada' : String(runsLimit), cap: false },
        ].map(({ label, value, cap }) => (
          <div key={label} className="bg-[#fbfbfa] px-5 py-5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#8fb2aa]">{label}</p>
            <p className={`mt-2 text-3xl font-light text-[#173634]${cap ? ' capitalize' : ''}`}>{value}</p>
          </div>
        ))}
      </div>

      {/* Operating capacity bar */}
      <section className="mb-10 border border-[#d8e5e2]">
        <div className="border-b border-[#d8e5e2] px-5 py-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#173634]/45">Uso mensual de rutinas</p>
        </div>
        <div className="px-5 py-6">
          <div className="mb-2 flex items-center justify-between text-xs text-[#173634]/50">
            <span>{runsUsed} usadas</span>
            <span>{runsLimit === Infinity ? 'Ilimitado' : `${runsLimit} de capacidad`}</span>
          </div>
          <div className="h-2 w-full overflow-hidden bg-[#d8e5e2]">
            <div
              className={`h-full transition-all ${usagePercent >= 80 ? 'bg-amber-500' : 'bg-[#173634]'}`}
              style={{ width: `${usagePercent}%` }}
            />
          </div>
          <p className="mt-2 text-xs text-[#173634]/40">
            {runsLimit === Infinity
              ? 'Tu plan no tiene limite de rutinas.'
              : `${Math.round(usagePercent)}% de la capacidad mensual usada. Quedan ${runsLimit - runsUsed} rutinas.`}
          </p>
          {usagePercent >= 80 && runsLimit !== Infinity && (
            <div className="mt-4 flex items-center justify-between border border-amber-200 bg-amber-50 px-4 py-3">
              <p className="text-xs text-amber-700">Estas cerca del limite mensual de rutinas. Considera subir de plan.</p>
              <Link href="/app/billing" className="inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-amber-700">
                Subir plan <ArrowRight size={10} />
              </Link>
            </div>
          )}
        </div>
      </section>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* By division */}
        <section className="border border-[#d8e5e2]">
          <div className="border-b border-[#d8e5e2] px-5 py-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#173634]/45">Por area operativa</p>
          </div>
          {Object.keys(runsByDivision).length === 0 ? (
            <p className="px-5 py-8 text-center text-xs text-[#173634]/38">Aun no hay rutinas registradas.</p>
          ) : (
            <div className="divide-y divide-[#d8e5e2]">
              {Object.entries(runsByDivision)
                .sort(([, a], [, b]) => b - a)
                .map(([division, count]) => (
                  <div key={division} className="flex items-center gap-4 px-5 py-3">
                    <DivisionBadge division={division} size="sm" />
                    <div className="flex flex-1 items-center gap-3">
                      <div className="h-1.5 flex-1 overflow-hidden bg-[#d8e5e2]">
                        <div className="h-full bg-[#8fb2aa]" style={{ width: `${(count / runsUsed) * 100}%` }} />
                      </div>
                      <span className="w-5 text-right text-xs font-medium text-[#173634]">{count}</span>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </section>

        {/* Top gemelos */}
        <section className="border border-[#d8e5e2]">
          <div className="border-b border-[#d8e5e2] px-5 py-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#173634]/45">Top gemelos digitales</p>
          </div>
          {topAgents.length === 0 ? (
            <p className="px-5 py-8 text-center text-xs text-[#173634]/38">Aun no hay rutinas registradas.</p>
          ) : (
            <div className="divide-y divide-[#d8e5e2]">
              {topAgents.map((agent) => (
                <div key={agent.name} className="flex items-center justify-between gap-4 px-5 py-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-[#173634]">{agent.name}</p>
                    <DivisionBadge division={agent.division} size="sm" />
                  </div>
                  <span className="shrink-0 text-sm font-light text-[#173634]/60">
                    {agent.count} rutina{agent.count !== 1 ? 's' : ''}
                  </span>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      {plan?.price !== null && MOCK_USER.plan !== 'enterprise' && (
        <div className="mt-8 flex flex-col gap-4 border border-[#d8e5e2] px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium text-[#173634]">Necesitas mas capacidad operativa?</p>
            <p className="mt-0.5 text-xs text-[#173634]/50">Sube de plan para aumentar rutinas mensuales, memoria y cobertura de gemelos.</p>
          </div>
          <Button asChild className="h-9 shrink-0 bg-[#173634] px-5 text-xs font-semibold uppercase tracking-[0.16em] text-white hover:bg-[#1e3431]">
            <Link href="/app/billing">Ver planes <ArrowRight size={11} className="ml-1.5" /></Link>
          </Button>
        </div>
      )}
    </div>
  )
}
