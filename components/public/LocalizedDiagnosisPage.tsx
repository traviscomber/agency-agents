'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import { ArrowRight, Calculator, CheckCircle2, ClipboardList } from 'lucide-react'
import { PublicFooter } from '@/components/public/PublicFooter'
import { PublicNavbar } from '@/components/public/PublicNavbar'
import {
  diagnosisPageCopy,
  getLocalizedAgentHref,
  getLocalizedHref,
  type MarketingLocale,
} from '@/lib/marketing-i18n'

type PressureKey = 'sales' | 'collections' | 'tenders' | 'implementation' | 'recruiting'

function formatClp(value: number) {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    maximumFractionDigits: 0,
  }).format(value)
}

export function LocalizedDiagnosisPage({ locale }: { locale: MarketingLocale }) {
  const copy = diagnosisPageCopy[locale]
  const [company, setCompany] = useState('services')
  const [pressure, setPressure] = useState<PressureKey>('sales')
  const [team, setTeam] = useState('mid')
  const [monthlyCost, setMonthlyCost] = useState(1800000)

  const recommendation = copy.recommendations[pressure]
  const adjustedSavings = useMemo(() => {
    const teamFactor = team === 'small' ? 0.82 : team === 'growth' ? 1.18 : 1
    const companyFactor = company === 'industrial' || company === 'construction' ? 1.08 : 1
    return Math.round(monthlyCost * recommendation.savingsFactor * teamFactor * companyFactor)
  }, [company, monthlyCost, recommendation.savingsFactor, team])

  function persistDiagnosisIntent() {
    window.localStorage.setItem(
      'n3uralia.diagnosis',
      JSON.stringify({
        company,
        pressure,
        team,
        monthlyCost,
        role: recommendation.role,
        slug: recommendation.slug,
        summary: recommendation.summary,
        supervision: recommendation.supervision,
        hours: recommendation.hours,
        estimatedSavings: adjustedSavings,
        next: recommendation.next,
        createdAt: new Date().toISOString(),
      }),
    )
  }

  return (
    <div className="min-h-screen bg-[#fbfbfa] text-[#173634]">
      <PublicNavbar />
      <main>
        <section className="bg-[#07100f] px-5 pb-16 pt-[8.5rem] text-[#f5fbfa] sm:px-8">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#8fb2aa]">{copy.eyebrow}</p>
              <h1 className="mt-5 max-w-4xl text-5xl font-semibold leading-[0.96] tracking-[-0.03em] md:text-7xl">{copy.title}</h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-[#c7d5d1]">{copy.body}</p>
            </div>
            <div className="border border-[#28413d] bg-[#0d1917] p-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="grid gap-2 text-sm font-semibold text-[#f5fbfa]">
                  {copy.companyLabel}
                  <select value={company} onChange={(event) => setCompany(event.target.value)} className="border border-[#28413d] bg-[#07100f] px-3 py-3 text-sm text-white">
                    {copy.options.company.map(([value, label]: [string, string]) => (
                      <option key={value} value={value}>{label}</option>
                    ))}
                  </select>
                </label>
                <label className="grid gap-2 text-sm font-semibold text-[#f5fbfa]">
                  {copy.pressureLabel}
                  <select value={pressure} onChange={(event) => setPressure(event.target.value as PressureKey)} className="border border-[#28413d] bg-[#07100f] px-3 py-3 text-sm text-white">
                    {copy.options.pressure.map(([value, label]: [PressureKey, string]) => (
                      <option key={value} value={value}>{label}</option>
                    ))}
                  </select>
                </label>
                <label className="grid gap-2 text-sm font-semibold text-[#f5fbfa]">
                  {copy.teamLabel}
                  <select value={team} onChange={(event) => setTeam(event.target.value)} className="border border-[#28413d] bg-[#07100f] px-3 py-3 text-sm text-white">
                    {copy.options.team.map(([value, label]: [string, string]) => (
                      <option key={value} value={value}>{label}</option>
                    ))}
                  </select>
                </label>
                <label className="grid gap-2 text-sm font-semibold text-[#f5fbfa]">
                  {copy.monthlyCostLabel}
                  <input type="number" min={500000} step={100000} value={monthlyCost} onChange={(event) => setMonthlyCost(Number(event.target.value))} className="border border-[#28413d] bg-[#07100f] px-3 py-3 text-sm text-white" />
                </label>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
          <div className="grid gap-6 lg:grid-cols-[1fr_0.78fr]">
            <article className="border border-[#d8e5e2] bg-white p-6">
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#789b96]">{copy.resultEyebrow}</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.02em] text-[#173634] md:text-5xl">{recommendation.role}</h2>
              <p className="mt-5 max-w-2xl text-sm leading-7 text-[#65706d]">{recommendation.summary}</p>
              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {[
                  [copy.supervision, recommendation.supervision],
                  [copy.recoveredHours, recommendation.hours],
                  [copy.estimatedSavings, formatClp(adjustedSavings)],
                ].map(([label, value]) => (
                  <div key={label} className="border border-[#d8e5e2] bg-[#f8fbfa] p-4">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#789b96]">{label}</p>
                    <p className="mt-2 text-lg font-semibold text-[#173634]">{value}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href={`${getLocalizedHref(locale, '/signup')}?diagnosis=1`} onClick={persistDiagnosisIntent} className="inline-flex items-center gap-2 bg-[#173634] px-5 py-3 text-sm font-semibold text-white hover:bg-[#244944]">
                  {copy.primary} <ArrowRight size={14} />
                </Link>
                <Link href={getLocalizedAgentHref(locale, recommendation.slug)} className="inline-flex items-center gap-2 border border-[#d8e5e2] bg-white px-5 py-3 text-sm font-semibold text-[#173634] hover:bg-[#f1f6f4]">
                  {copy.secondary}
                </Link>
                <Link href="/app/projects?diagnosis=1" onClick={persistDiagnosisIntent} className="inline-flex items-center gap-2 border border-[#d8e5e2] bg-white px-5 py-3 text-sm font-semibold text-[#173634] hover:bg-[#f1f6f4]">
                  {locale === 'es' ? 'Crear programa operativo' : 'Create operating program'}
                </Link>
              </div>
            </article>

            <aside className="grid gap-3">
              <div className="border border-[#d8e5e2] bg-[#f1f6f4] p-5">
                <ClipboardList size={20} className="text-[#527b73]" />
                <p className="mt-4 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#789b96]">{copy.nextStep}</p>
                <p className="mt-3 text-sm leading-7 text-[#52605d]">{recommendation.next}</p>
              </div>
              <div className="border border-[#d8e5e2] bg-white p-5">
                <Calculator size={20} className="text-[#527b73]" />
                <p className="mt-4 text-sm font-semibold text-[#173634]">
                  {locale === 'es' ? 'Este calculo es comercial, no contable.' : 'This is a commercial estimate, not accounting advice.'}
                </p>
                <p className="mt-3 text-sm leading-7 text-[#65706d]">
                  {locale === 'es'
                    ? 'El diagnostico real confirma datos disponibles, restricciones, aprobaciones humanas y alcance de reemplazo.'
                    : 'A real diagnosis confirms available data, constraints, human approvals, and replacement scope.'}
                </p>
              </div>
              <div className="border border-[#d8e5e2] bg-white p-5">
                <CheckCircle2 size={20} className="text-[#527b73]" />
                <p className="mt-4 text-sm font-semibold text-[#173634]">
                  {locale === 'es' ? 'Despues del diagnostico: programa operativo.' : 'After diagnosis: operating program.'}
                </p>
                <p className="mt-3 text-sm leading-7 text-[#65706d]">
                  {locale === 'es'
                    ? 'El siguiente paso es crear un programa, cargar contexto y ejecutar la primera rutina del gemelo digital.'
                    : 'The next step is to create a program, load context, and run the first digital twin routine.'}
                </p>
              </div>
            </aside>
          </div>
        </section>
      </main>
      <PublicFooter />
    </div>
  )
}
