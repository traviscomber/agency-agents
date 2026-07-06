import { Star, Download, TrendingUp, Search, Filter, ArrowUpRight, ShieldCheck, Workflow, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export const metadata = {
  title: 'Twin Exchange | N3uralia Studio',
  description: 'Biblioteca de paquetes operativos, playbooks y gemelos reutilizables para Chile y Latam.',
}

export default function MarketplacePage() {
  const categories = ['Todos', 'Ventas', 'Cobranza', 'Licitaciones', 'Implementacion', 'Gobierno']
  const featuredSignals = [
    ['Curado por operacion', 'Cada paquete se revisa por calidad de handoff, limites y continuidad, no solo por prompt.'],
    ['Unidad reutilizable', 'Cada listing explicita input, output esperado, owner humano y metrica de replacement.'],
    ['Listo para programa', 'Los mejores paquetes traen rutina, riesgos, decision pendiente y siguiente accion.'],
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
      category: 'Gobierno',
      fit: 'Mejor cuando un equipo necesita brief inicial, mapa de owners y ruta de decision antes de desplegar.',
      output: 'Brief operativo, workflow, decision log',
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
      category: 'Implementacion',
      fit: 'Mejor cuando handoffs, bloqueos y actualizaciones tardias frenan la ejecucion.',
      output: 'Mapa de workflow, bloqueos, recomendaciones de handoff',
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
      category: 'Ventas',
      fit: 'Mejor cuando el equipo necesita evidencia comercial, mensajes y artifacts reutilizables para rollout.',
      output: 'Prueba comercial, pack de mensajes, puntos de evidencia',
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
                Twin Exchange operativo
              </div>
              <h1 className="mt-5 max-w-2xl text-4xl font-semibold tracking-[-0.03em] text-[#173634] sm:text-5xl">
                Paquetes que convierten know-how operativo en rutinas reutilizables.
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-[#52605d] sm:text-base">
                Esta biblioteca esta organizada por presion operacional: elige el paquete, revisa el output,
                entiende el handoff y despliegalo dentro de un programa con supervision.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Button className="bg-[#173634] text-white hover:bg-[#0d1f1d]">
                  Inspeccionar paquetes <ArrowUpRight size={13} className="ml-1" />
                </Button>
                <Button variant="outline" className="border-[#d8e5e2] bg-white text-[#173634] hover:bg-[#f1f6f4]">
                  Proponer paquete
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
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#9db7b1]">Criterio de seleccion</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight">Por que este exchange no es un marketplace de prompts</h2>
            <div className="mt-6 space-y-4">
              {[
                ['Output primero', 'Cada paquete explicita la forma del artifact antes de ejecutar.'],
                ['Consciente del workflow', 'El valor se mide por el handoff que deja al siguiente owner.'],
                ['Legible para negocio', 'El comprador ve si genera prueba, accion, control o escalamiento.'],
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
              <div className="flex flex-1 items-center gap-2 border border-[#d8e5e2] bg-[#fbfbfa] px-3 py-2.5">
                <Search size={15} className="text-[#8aa29c]" />
                <input
                  placeholder="Buscar por presion operativa, gemelo o entregable..."
                  className="flex-1 bg-transparent text-sm text-[#173634] placeholder:text-[#789b96] focus:outline-none"
                />
              </div>
              <Button variant="outline" className="h-11 border-[#d8e5e2] px-4 text-xs font-semibold uppercase tracking-[0.12em] text-[#173634] hover:bg-[#f1f6f4]">
                <Filter size={14} className="mr-2" /> Ordenar por prueba
              </Button>
            </div>

            <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
              {categories.map((cat) => (
                <Button
                  key={cat}
                  variant={cat === 'Todos' ? 'default' : 'outline'}
                  className={`h-9 px-4 text-[10px] font-semibold uppercase tracking-[0.14em] whitespace-nowrap ${
                    cat === 'Todos'
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
                          <TrendingUp size={11} /> Alta adopcion
                        </span>
                      )}
                    </div>
                    <h3 className="mt-3 text-lg font-semibold text-[#173634]">{agent.title}</h3>
                    <p className="mt-1 text-[11px] uppercase tracking-[0.12em] text-[#65706d]">por {agent.creator}</p>

                    <p className="mt-4 text-sm leading-relaxed text-[#52605d]">{agent.fit}</p>

                    <div className="mt-4 border border-[#d8e5e2] bg-white/80 p-3">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#789b96]">Output esperado</p>
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
                      <span className="font-semibold text-[#173634]">{agent.rating}</span> ({agent.reviews} revisiones)
                    </p>

                    <div className="mt-3 flex items-center gap-3 text-[10px] text-[#173634]/50">
                      <div className="flex items-center gap-1">
                        <Download size={11} className="text-[#8fb2aa]" />
                        {agent.sales} corridas
                      </div>
                      <span className="text-[#d8e5e2]">-</span>
                      <span className="inline-flex items-center gap-1 font-medium text-[#173634]">
                        <ShieldCheck size={11} className="text-[#789b96]" />
                        Revisado
                      </span>
                    </div>
                  </div>

                  <div className="mt-5 border-t border-[#d8e5e2] pt-4">
                    <div className="mb-3 flex items-center gap-2 text-[10px] uppercase tracking-[0.14em] text-[#65706d]">
                      <Workflow size={11} className="text-[#789b96]" />
                      Paquete con handoff
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-[#173634]">${agent.pricePerRun.toFixed(2)}/run</p>
                      <Button className="h-8 bg-[#173634] px-4 text-[10px] font-semibold uppercase tracking-[0.12em] text-white hover:bg-[#1e3431]">
                        Ver
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
