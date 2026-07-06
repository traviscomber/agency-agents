'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { PublicNavbar } from '@/components/public/PublicNavbar'
import { PublicFooter } from '@/components/public/PublicFooter'
import { getLocalizedHref, roiPageCopy, type MarketingLocale } from '@/lib/marketing-i18n'

function formatClp(value: number) {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    maximumFractionDigits: 0,
  }).format(value)
}

export function LocalizedRoiPage({ locale }: { locale: MarketingLocale }) {
  const copy = roiPageCopy[locale]
  const [salary, setSalary] = useState(1800000)
  const [hours, setHours] = useState(80)
  const [automation, setAutomation] = useState(45)
  const recoveredHours = Math.round((hours * automation) / 100)
  const monthlySavings = Math.round((salary * automation) / 100)
  const yearlySavings = monthlySavings * 12

  return (
    <div className="min-h-screen bg-[#fbfbfa] text-[#173634]">
      <PublicNavbar />
      <main>
        <section className="bg-[#07100f] px-5 pb-16 pt-[8.5rem] text-[#f5fbfa] sm:px-8">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#8fb2aa]">{copy.eyebrow}</p>
              <h1 className="mt-5 max-w-4xl text-5xl font-semibold leading-[0.96] tracking-[-0.03em] md:text-7xl">{copy.title}</h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-[#c7d5d1]">{copy.body}</p>
            </div>
            <div className="border border-[#28413d] bg-[#0d1917] p-5">
              <div className="grid gap-5">
                <label className="grid gap-2 text-sm font-semibold text-[#f5fbfa]">
                  {copy.salaryLabel}
                  <input className="border border-[#28413d] bg-[#07100f] px-3 py-3 text-white" type="number" value={salary} min={500000} step={100000} onChange={(event) => setSalary(Number(event.target.value))} />
                </label>
                <label className="grid gap-2 text-sm font-semibold text-[#f5fbfa]">
                  {copy.hoursLabel}
                  <input className="accent-[#8fb2aa]" type="range" value={hours} min={10} max={180} step={5} onChange={(event) => setHours(Number(event.target.value))} />
                  <span className="text-sm text-[#c7d5d1]">{hours} h</span>
                </label>
                <label className="grid gap-2 text-sm font-semibold text-[#f5fbfa]">
                  {copy.automationLabel}
                  <input className="accent-[#8fb2aa]" type="range" value={automation} min={10} max={80} step={5} onChange={(event) => setAutomation(Number(event.target.value))} />
                  <span className="text-sm text-[#c7d5d1]">{automation}%</span>
                </label>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
          <div className="grid gap-3 md:grid-cols-3">
            <article className="border border-[#d8e5e2] bg-white p-6">
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#789b96]">{copy.monthlySavings}</p>
              <p className="mt-4 text-4xl font-semibold tracking-[-0.03em] text-[#173634]">{formatClp(monthlySavings)}</p>
            </article>
            <article className="border border-[#d8e5e2] bg-white p-6">
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#789b96]">{copy.yearlySavings}</p>
              <p className="mt-4 text-4xl font-semibold tracking-[-0.03em] text-[#173634]">{formatClp(yearlySavings)}</p>
            </article>
            <article className="border border-[#d8e5e2] bg-white p-6">
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#789b96]">{copy.recoveredHours}</p>
              <p className="mt-4 text-4xl font-semibold tracking-[-0.03em] text-[#173634]">{recoveredHours} h</p>
            </article>
          </div>
          <p className="mt-5 max-w-3xl text-sm leading-7 text-[#65706d]">{copy.assumption}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={getLocalizedHref(locale, '/diagnosis')} className="inline-flex items-center gap-2 bg-[#173634] px-5 py-3 text-sm font-semibold text-white hover:bg-[#244944]">
              {copy.cta} <ArrowRight size={14} />
            </Link>
            <Link href={getLocalizedHref(locale, '/roles')} className="inline-flex items-center gap-2 border border-[#d8e5e2] bg-white px-5 py-3 text-sm font-semibold text-[#173634] hover:bg-[#f1f6f4]">
              {locale === 'es' ? 'Ver roles replicables' : 'View replicable roles'}
            </Link>
          </div>
        </section>
      </main>
      <PublicFooter />
    </div>
  )
}
