import { AlertCircle, CheckCircle, Database, FileText, ShieldCheck, Upload } from 'lucide-react'
import Link from 'next/link'

export const metadata = {
  title: 'Memoria del rol | N3uralia Studio',
  description: 'Gobierna fuentes, criterios, limites y ejemplos que alimentan a cada gemelo operativo.',
}

const memorySets = [
  {
    name: 'Ejecutivo Comercial B2B Chile',
    status: 'listo',
    coverage: '82%',
    sources: 18,
    review: 'Revision semanal',
    criteria: ['ICP y segmentos', 'Objeciones frecuentes', 'Formato de follow-up', 'Reglas de descuento'],
    limit: 'No aprueba precio final, contrato ni condiciones legales.',
  },
  {
    name: 'Analista de Licitaciones Chile',
    status: 'revision',
    coverage: '68%',
    sources: 11,
    review: 'Aprobacion legal requerida',
    criteria: ['Go/no-go', 'Requisitos administrativos', 'Riesgos de bases', 'Checklist documental'],
    limit: 'No firma postulaciones ni interpreta clausulas legales sin humano.',
  },
  {
    name: 'Cobranza Pyme Chile',
    status: 'listo',
    coverage: '76%',
    sources: 14,
    review: 'Revision quincenal',
    criteria: ['Aging de deuda', 'Promesas de pago', 'Tono de mensaje', 'Escalamiento por riesgo'],
    limit: 'No renegocia deuda ni ejecuta acciones legales.',
  },
]

const intakeSources = [
  ['Playbooks', 'Criterios, formatos y ejemplos aprobados por el equipo.'],
  ['Documentos', 'Bases, propuestas, minutas, politicas y entregables historicos.'],
  ['Sistemas', 'CRM, Sheets, Drive, ERP o registros operativos conectables.'],
]

function getStatusIcon(status: string) {
  if (status === 'listo') return <CheckCircle size={14} className="text-[#3f7d68]" />
  return <AlertCircle size={14} className="text-[#b7791f]" />
}

export default function RoleMemoryPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <header className="mb-10 overflow-hidden border border-[#d8e5e2] bg-[linear-gradient(135deg,#ffffff_0%,#f7faf9_52%,#eef5f2_100%)] p-8 shadow-[0_22px_70px_-48px_rgba(15,23,42,0.42)]">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#8fb2aa]">Sistema Twin OS</p>
            <h1 className="mt-3 max-w-3xl text-4xl font-light tracking-[-0.04em] text-[#173634]">
              Memoria del rol, no fine-tuning generico.
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-[#52605d]">
              Cada gemelo necesita fuentes, criterios, limites y ejemplos de salida. Esta consola muestra que sabe el rol,
              que falta revisar y donde la supervision humana sigue siendo obligatoria.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {[
              ['3', 'roles con memoria'],
              ['43', 'fuentes operativas'],
              ['2', 'sets listos'],
            ].map(([value, label]) => (
              <div key={label} className="border border-[#d8e5e2] bg-white p-4">
                <p className="text-3xl font-light text-[#173634]">{value}</p>
                <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#789b96]">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </header>

      <section className="mb-8 grid gap-4 lg:grid-cols-3">
        {intakeSources.map(([title, body]) => (
          <article key={title} className="border border-[#d8e5e2] bg-white p-5">
            <div className="mb-4 flex h-10 w-10 items-center justify-center bg-[#f1f6f4] text-[#173634]">
              {title === 'Playbooks' ? <FileText size={17} /> : title === 'Documentos' ? <Upload size={17} /> : <Database size={17} />}
            </div>
            <h2 className="text-sm font-semibold text-[#173634]">{title}</h2>
            <p className="mt-2 text-sm leading-7 text-[#52605d]">{body}</p>
          </article>
        ))}
      </section>

      <section className="grid gap-4">
        {memorySets.map((set) => (
          <article key={set.name} className="border border-[#d8e5e2] bg-white p-6 shadow-[0_14px_44px_-34px_rgba(15,23,42,0.35)]">
            <div className="grid gap-6 lg:grid-cols-[1fr_0.8fr]">
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="text-xl font-semibold tracking-[-0.02em] text-[#173634]">{set.name}</h2>
                  <span className="inline-flex items-center gap-1.5 border border-[#d8e5e2] bg-[#f1f6f4] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#52605d]">
                    {getStatusIcon(set.status)}
                    {set.status}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-7 text-[#52605d]">
                  La memoria define como piensa y opera el gemelo: criterios, ejemplos, tono, outputs, excepciones y
                  reglas de escalamiento antes de ejecutar rutinas reales.
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {set.criteria.map((criterion) => (
                    <span key={criterion} className="border border-[#d8e5e2] bg-[#fbfbfa] px-3 py-1.5 text-xs font-medium text-[#173634]">
                      {criterion}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
                {[
                  ['Cobertura', set.coverage],
                  ['Fuentes', `${set.sources}`],
                  ['Gobierno', set.review],
                ].map(([label, value]) => (
                  <div key={label} className="border border-[#d8e5e2] bg-[#f8fbfa] p-4">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#789b96]">{label}</p>
                    <p className="mt-2 text-sm font-semibold text-[#173634]">{value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3 border-t border-[#d8e5e2] pt-5 md:flex-row md:items-center md:justify-between">
              <div className="flex items-start gap-2 text-sm leading-6 text-[#52605d]">
                <ShieldCheck size={16} className="mt-1 shrink-0 text-[#789b96]" />
                <span>{set.limit}</span>
              </div>
              <Link href="/app/agents" className="inline-flex items-center justify-center bg-[#173634] px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-white hover:bg-[#0d1f1d]">
                Probar con gemelo
              </Link>
            </div>
          </article>
        ))}
      </section>
    </div>
  )
}
