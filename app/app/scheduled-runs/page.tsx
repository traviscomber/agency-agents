import { Button } from '@/components/ui/button'
import { EmptyState } from '@/components/shared/EmptyState'
import { Clock, Edit2, Trash2, Plus } from 'lucide-react'

const SCHEDULED_RUNS = [
  {
    id: '1',
    name: 'Seguimiento comercial semanal',
    twin: 'Ejecutivo Comercial B2B Chile',
    owner: 'Lider comercial',
    frequency: 'weekly',
    next_run_at: new Date(Date.now() + 86400000),
    output: 'Pipeline priorizado, follow-ups y cuentas con riesgo.',
    is_active: true
  },
  {
    id: '2',
    name: 'Revision de cartera vencida',
    twin: 'Cobranza Pyme Chile',
    owner: 'Finanzas',
    frequency: 'weekly',
    next_run_at: new Date(Date.now() + 604800000),
    output: 'Cuentas criticas, mensajes sugeridos y excepciones.',
    is_active: true
  }
]

export default function ScheduledRunsPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between border-b border-[#d8e5e2] pb-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#8fb2aa]">Rutinas recurrentes</p>
          <h1 className="mt-2 text-3xl font-light tracking-tight text-[#173634]">Programa rutinas de gemelos.</h1>
          <p className="mt-2 text-sm text-[#173634]/60">Define que twin corre, que output debe dejar y que humano revisa excepciones.</p>
        </div>
        <Button className="rounded-lg bg-[#8fb2aa] px-4 py-2 text-sm font-semibold text-white hover:bg-[#7a9a91]">
          <Plus size={14} className="mr-1.5" />
          Nueva rutina
        </Button>
      </div>

      {SCHEDULED_RUNS.length === 0 ? (
        <EmptyState
          icon={<Clock size={16} />}
          title="Aun no hay rutinas programadas"
          description="Automatiza rutinas semanales o mensuales con output, owner humano y reglas de escalamiento."
          actionLabel="Crear rutina"
          actionHref="/app/scheduled-runs/new"
        />
      ) : (
        <div className="space-y-2">
          {SCHEDULED_RUNS.map((run) => (
            <div key={run.id} className="flex items-center justify-between border border-[#d8e5e2] bg-white px-5 py-4">
              <div>
                <p className="font-semibold text-[#173634]">{run.name}</p>
                <p className="mt-1 text-xs text-[#173634]/60">
                  {run.twin} - {run.frequency} - proxima: {run.next_run_at.toLocaleDateString()}
                </p>
                <p className="mt-2 text-xs leading-5 text-[#52605d]">
                  Output: {run.output} Owner humano: {run.owner}.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="inline-flex items-center gap-2 bg-[#f1f6f4] px-3 py-1 text-xs font-semibold text-[#8fb2aa]">
                  {run.is_active ? 'Activa' : 'Pausada'}
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
        <p className="text-xs font-semibold text-[#173634]">Disponibilidad por plan</p>
        <p className="mt-2 text-xs leading-relaxed text-[#173634]/70">
          Las rutinas recurrentes estan pensadas para Pro o superior: reporting semanal, cobranza, seguimiento comercial y control de implementacion.
        </p>
      </div>
    </div>
  )
}
