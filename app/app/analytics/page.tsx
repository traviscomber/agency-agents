import { ArrowRight, Clock, Gauge, ShieldCheck, TrendingUp } from 'lucide-react'
import Link from 'next/link'

const roiMetrics = [
  { label: 'ROI mensual estimado', value: 'CLP $3.42M', note: 'Ahorro proyectado por horas recuperadas y menor retrabajo.' },
  { label: 'Horas recuperadas', value: '86 h', note: 'Capacidad operativa que vuelve al equipo este mes.' },
  { label: 'Replacement promedio', value: '78%', note: 'Carga repetible absorbible bajo supervision definida.' },
]

const programRows = [
  {
    program: 'Sales Twin Starter',
    twin: 'Ejecutivo Comercial B2B Chile',
    replacement: 82,
    supervision: 'Media',
    hours: 28,
    clp: 'CLP $1.18M',
    next: 'Aprobar propuesta final y cargar objeciones nuevas.',
  },
  {
    program: 'Licitaciones Pro',
    twin: 'Analista de Licitaciones Chile',
    replacement: 74,
    supervision: 'Alta',
    hours: 22,
    clp: 'CLP $920k',
    next: 'Revision legal de clausulas y go/no-go ejecutivo.',
  },
  {
    program: 'Cobranza Pyme',
    twin: 'Cobranza Pyme Chile',
    replacement: 79,
    supervision: 'Media',
    hours: 21,
    clp: 'CLP $790k',
    next: 'Escalar cuentas con promesa vencida o disputa comercial.',
  },
  {
    program: 'Implementation OS',
    twin: 'PM de Implementacion Chile',
    replacement: 76,
    supervision: 'Media',
    hours: 15,
    clp: 'CLP $530k',
    next: 'Confirmar owner humano para bloqueos de alcance.',
  },
]

const operatingSignals = [
  ['Velocidad', 'Follow-up, priorizacion y minuta pasan de horas dispersas a rutinas recuperables.'],
  ['Control', 'Cada programa deja explicito que puede ejecutar el twin y que requiere aprobacion humana.'],
  ['Continuidad', 'Memoria, artifacts y handoffs quedan unidos al programa para que el siguiente operador no parta de cero.'],
]

function getReplacementBand(score: number) {
  if (score >= 80) return 'Autonomia controlada'
  if (score >= 70) return 'Replacement gestionado'
  return 'Asistencia operativa'
}

export default function AnalyticsPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <header className="mb-10 overflow-hidden border border-[#d8e5e2] bg-[linear-gradient(135deg,#ffffff_0%,#f7faf9_52%,#eef5f2_100%)] p-8 shadow-[0_22px_70px_-48px_rgba(15,23,42,0.42)]">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#8fb2aa]">ROI operativo</p>
            <h1 className="mt-3 max-w-3xl text-4xl font-light tracking-[-0.04em] text-[#173634]">
              Mide capacidad digital, no solo corridas.
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-[#52605d]">
              Este tablero traduce ejecuciones de gemelos en horas recuperadas, ahorro estimado en CLP, nivel de
              replacement y carga de supervision humana por programa operativo.
            </p>
          </div>

          <div className="grid gap-3">
            {operatingSignals.map(([title, body]) => (
              <div key={title} className="border border-[#d8e5e2] bg-white/90 p-4">
                <p className="text-sm font-semibold text-[#173634]">{title}</p>
                <p className="mt-2 text-sm leading-6 text-[#52605d]">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </header>

      <section className="mb-8 grid gap-4 lg:grid-cols-3">
        {roiMetrics.map((metric) => (
          <article key={metric.label} className="border border-[#d8e5e2] bg-white p-5 shadow-[0_14px_44px_-34px_rgba(15,23,42,0.35)]">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#8fb2aa]">{metric.label}</p>
            <p className="mt-3 text-4xl font-light tracking-[-0.04em] text-[#173634]">{metric.value}</p>
            <p className="mt-3 text-sm leading-6 text-[#52605d]">{metric.note}</p>
          </article>
        ))}
      </section>

      <section className="mb-8 border border-[#d8e5e2] bg-white shadow-[0_18px_58px_-42px_rgba(15,23,42,0.38)]">
        <div className="border-b border-[#d8e5e2] px-6 py-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#8fb2aa]">Programas por impacto</p>
          <h2 className="mt-2 text-2xl font-light tracking-[-0.03em] text-[#173634]">Replacement, supervision y siguiente decision.</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[980px] text-sm">
            <thead className="border-b border-[#d8e5e2] bg-[#f1f6f4]">
              <tr>
                <th className="px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-[0.16em] text-[#52605d]">Programa</th>
                <th className="px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-[0.16em] text-[#52605d]">Gemelo</th>
                <th className="px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-[0.16em] text-[#52605d]">Replacement</th>
                <th className="px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-[0.16em] text-[#52605d]">Supervision</th>
                <th className="px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-[0.16em] text-[#52605d]">Horas</th>
                <th className="px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-[0.16em] text-[#52605d]">ROI</th>
                <th className="px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-[0.16em] text-[#52605d]">Siguiente decision</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#d8e5e2]">
              {programRows.map((row) => (
                <tr key={row.program} className="align-top hover:bg-[#f8fbfa]">
                  <td className="px-5 py-4 font-semibold text-[#173634]">{row.program}</td>
                  <td className="px-5 py-4 text-[#52605d]">{row.twin}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <Gauge size={14} className="text-[#789b96]" />
                      <span className="font-semibold text-[#173634]">{row.replacement}%</span>
                    </div>
                    <p className="mt-1 text-[11px] text-[#789b96]">{getReplacementBand(row.replacement)}</p>
                  </td>
                  <td className="px-5 py-4">
                    <span className="inline-flex items-center gap-1.5 border border-[#d8e5e2] bg-[#f1f6f4] px-2.5 py-1 text-[11px] font-semibold text-[#173634]">
                      <ShieldCheck size={12} className="text-[#789b96]" />
                      {row.supervision}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span className="inline-flex items-center gap-1.5 text-[#173634]">
                      <Clock size={13} className="text-[#789b96]" />
                      {row.hours} h
                    </span>
                  </td>
                  <td className="px-5 py-4 font-semibold text-[#173634]">{row.clp}</td>
                  <td className="max-w-xs px-5 py-4 text-sm leading-6 text-[#52605d]">{row.next}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-[0.82fr_1.18fr]">
        <div className="border border-[#d8e5e2] bg-[#173634] p-6 text-white">
          <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#9db7b1]">Lectura ejecutiva</p>
          <h2 className="mt-3 text-2xl font-light tracking-[-0.03em]">El numero importante no es cuantas veces se ejecuto un twin.</h2>
          <p className="mt-4 text-sm leading-7 text-[#d9e3e0]">
            El comprador quiere saber que capacidad absorbio, que decision queda en humanos y que dinero o tiempo recupero
            la operacion. Por eso el tablero prioriza ROI, replacement, supervision y siguiente accion.
          </p>
        </div>

        <div className="border border-[#d8e5e2] bg-[#f1f6f4] p-6">
          <div className="flex items-start gap-3">
            <TrendingUp className="mt-1 h-5 w-5 text-[#527b73]" />
            <div>
              <p className="text-sm font-semibold text-[#173634]">Siguiente mejora recomendada</p>
              <p className="mt-2 text-sm leading-7 text-[#52605d]">
                Conecta este tablero al diagnostico inicial para comparar ROI estimado versus ROI observado por programa.
                Eso convierte la venta en un ciclo medible: diagnostico, despliegue, evidencia y expansion.
              </p>
              <Link href="/app/projects" className="mt-4 inline-flex items-center gap-2 bg-[#173634] px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-white hover:bg-[#0d1f1d]">
                Ver programas <ArrowRight size={12} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
