import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { MOCK_USER } from '@/lib/data/mock-store'
import { PLANS, getPlanById } from '@/lib/data/plans'
import { PLAN_HIERARCHY } from '@/lib/types'
import { Check, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function BillingPage() {
  const currentPlan = getPlanById(MOCK_USER.plan)
  const monthlyUsage = { routinesUsed: 45, routinesLimit: 50, extraRoutines: 0, extraCost: 0 }

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <header className="mb-10 border-b border-[#d8e5e2] pb-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#8fb2aa]">Plan Twin OS</p>
        <h1 className="mt-2 text-3xl font-light tracking-tight text-[#173634]">Gestiona capacidad operativa.</h1>
        <p className="mt-2 text-sm leading-relaxed text-[#173634]/60">
          Revisa rutinas mensuales, gemelos activos, memoria y limites antes de escalar el sistema operativo.
        </p>
      </header>

      {/* Operating capacity */}
      <section className="mb-10 border border-[#d8e5e2] px-6 py-5">
        <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#8fb2aa]">Capacidad de este mes</p>
        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <p className="text-sm text-[#173634]/60">Rutinas usadas</p>
            <p className="mt-1 text-2xl font-light text-[#173634]">{monthlyUsage.routinesUsed} / {monthlyUsage.routinesLimit}</p>
          </div>
          <div>
            <p className="text-sm text-[#173634]/60">Rutinas extra</p>
            <p className="mt-1 text-2xl font-light text-[#173634]">{monthlyUsage.extraRoutines}</p>
          </div>
          <div>
            <p className="text-sm text-[#173634]/60">Costo extra</p>
            <p className="mt-1 text-2xl font-light text-[#173634]">${monthlyUsage.extraCost.toFixed(2)}</p>
          </div>
        </div>
        {monthlyUsage.routinesUsed > monthlyUsage.routinesLimit && (
          <div className="mt-4 border-l-2 border-[#8fb2aa] bg-[#f1f6f4] px-4 py-3">
            <p className="text-xs font-semibold text-[#173634]">Capacidad extra: se cobra por rutina adicional segun plan.</p>
            <p className="mt-1 text-xs text-[#173634]/70">Superaste el limite mensual. Revisa si conviene subir de plan antes de automatizar mas programas.</p>
          </div>
        )}
      </section>

      {/* Current plan */}
      <section className="mb-10 border border-[#d8e5e2]">
        <div className="flex flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#8fb2aa]">Plan actual</p>
            <p className="mt-1 text-2xl font-light capitalize text-[#173634]">{currentPlan?.name}</p>
            <p className="mt-1 text-xs text-[#173634]/50">
              {currentPlan?.price === 0
                ? 'Free - sin tarjeta'
                : currentPlan?.price === null
                ? 'Precio a medida'
                : `$${currentPlan?.price}/mes - renueva Jan 31, 2025`}
            </p>
          </div>
          {MOCK_USER.plan !== 'free' && MOCK_USER.plan !== 'enterprise' && (
            <div className="flex gap-2">
              <Button variant="outline" className="h-9 border-[#d8e5e2] px-4 text-xs font-semibold uppercase tracking-[0.14em] text-[#173634]">
                Gestionar pago
              </Button>
              <Button variant="outline" className="h-9 border-red-200 px-4 text-xs font-semibold uppercase tracking-[0.14em] text-red-500 hover:bg-red-50">
                Cancelar plan
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Plans grid */}
      <section className="mb-10">
        <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#173634]/45">Planes disponibles</p>
        <div className="grid gap-px border border-[#d8e5e2] bg-[#d8e5e2] sm:grid-cols-2 lg:grid-cols-4">
          {PLANS.filter((p) => p.id !== 'enterprise').map((plan) => {
            const isCurrent = plan.id === MOCK_USER.plan
            const isUpgrade = PLAN_HIERARCHY.indexOf(plan.id) > PLAN_HIERARCHY.indexOf(MOCK_USER.plan)
            const isDowngrade = PLAN_HIERARCHY.indexOf(plan.id) < PLAN_HIERARCHY.indexOf(MOCK_USER.plan)

            return (
              <div
                key={plan.id}
                className={cn(
                  'flex flex-col p-5',
                  isCurrent ? 'bg-[#173634] text-white' : 'bg-[#fbfbfa] text-[#173634]'
                )}
              >
                {isCurrent && (
                  <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/50">Actual</p>
                )}
                <p className={cn('text-sm font-semibold', isCurrent ? 'text-white' : 'text-[#173634]')}>{plan.name}</p>
                <p className={cn('mt-1 text-2xl font-light', isCurrent ? 'text-white' : 'text-[#173634]')}>{plan.priceLabel}</p>
                {plan.price !== null && plan.price !== 0 && (
                  <p className={cn('text-[10px]', isCurrent ? 'text-white/50' : 'text-[#173634]/40')}>/mes</p>
                )}

                <ul className="my-5 flex-1 space-y-2">
                  {plan.features.slice(0, 4).map((f) => (
                    <li key={f} className={cn('flex items-start gap-1.5 text-xs leading-relaxed', isCurrent ? 'text-white/70' : 'text-[#173634]/60')}>
                      <Check size={11} className={cn('mt-0.5 shrink-0', isCurrent ? 'text-[#8fb2aa]' : 'text-[#8fb2aa]')} />
                      {f}
                    </li>
                  ))}
                </ul>

                {isCurrent ? (
                  <span className="border border-white/20 px-3 py-1.5 text-center text-[11px] font-semibold uppercase tracking-[0.14em] text-white/50">
                    Activo
                  </span>
                ) : isUpgrade ? (
                  <Link
                    href={`/api/checkout?plan=${plan.id}`}
                    className="inline-flex items-center justify-center gap-1 border border-[#173634] bg-[#173634] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-white hover:bg-[#1e3431]"
                  >
                    Subir plan <ArrowRight size={10} />
                  </Link>
                ) : isDowngrade ? (
                  <Link
                    href={`/api/checkout?plan=${plan.id}`}
                    className="inline-flex items-center justify-center border border-[#d8e5e2] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#173634]/55 hover:border-[#173634] hover:text-[#173634]"
                  >
                    Bajar plan
                  </Link>
                ) : null}
              </div>
            )
          })}
        </div>

        {/* Enterprise strip */}
        <div className="flex flex-col gap-4 border-x border-b border-[#d8e5e2] bg-[#fbfbfa] px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium text-[#173634]">Enterprise</p>
            <p className="mt-0.5 text-xs text-[#173634]/50">Gemelos privados, conectores, limites a medida, gobierno y onboarding dedicado.</p>
          </div>
          <Link
            href="mailto:hello@n3uralia.com"
            className="inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8fb2aa] hover:text-[#173634]"
          >
            Contactar ventas <ArrowRight size={10} />
          </Link>
        </div>
      </section>

      {/* Invoice history */}
      <section>
        <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#173634]/45">Historial de facturacion</p>
        {MOCK_USER.plan === 'free' ? (
          <div className="border border-[#d8e5e2] px-6 py-8 text-center">
            <p className="text-xs text-[#173634]/45">Sin facturas. Estas en el plan gratuito.</p>
          </div>
        ) : (
          <div className="divide-y divide-[#d8e5e2] border border-[#d8e5e2]">
            <div className="grid grid-cols-[1fr_auto_auto] gap-4 bg-[#f1f6f4] px-5 py-2.5">
              {['Fecha', 'Monto', 'Estado'].map((h) => (
                <span key={h} className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#173634]/45">{h}</span>
              ))}
            </div>
            {[
              { date: 'Jan 1, 2025', amount: `$${currentPlan?.price}` },
              { date: 'Dec 1, 2024', amount: `$${currentPlan?.price}` },
            ].map((inv, i) => (
              <div key={i} className="grid grid-cols-[1fr_auto_auto] items-center gap-4 px-5 py-3 hover:bg-[#f1f6f4]">
                <span className="text-sm text-[#173634]">{inv.date}</span>
                <span className="text-sm text-[#173634]">{inv.amount}</span>
                <span className="border border-[#d8e5e2] bg-[#f1f6f4] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#8fb2aa]">Pagado</span>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
