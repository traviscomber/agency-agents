import { Globe, Palette, TrendingUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export const metadata = {
  title: 'Partners Twin OS | N3uralia Studio',
  description: 'Deploy N3uralia Twin OS for clients with brand, governance, playbooks, and supervised operating programs.',
}

export default function WhiteLabelPage() {
  const hasPartnership = false

  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      <header className="mb-10 border-b border-[#d8e5e2] pb-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#8fb2aa]">Partners Twin OS</p>
        <h1 className="mt-2 text-3xl font-light tracking-tight text-[#173634]">Despliega N3uralia para clientes con gobierno.</h1>
        <p className="mt-2 text-sm leading-relaxed text-[#173634]/60">
          Para consultoras, agencias y equipos de implementacion que quieren operar gemelos digitales por rol bajo una marca, dominio y playbooks controlados.
        </p>
      </header>

      {!hasPartnership ? (
        <div className="space-y-8">
          <div className="rounded-none border border-[#d8e5e2] bg-[#f1f6f4] p-8">
            <h2 className="text-lg font-semibold text-[#173634]">Lleva Twin OS a tus clientes sin partir desde cero</h2>
            <p className="mt-2 text-sm text-[#173634]/70">
              Dominio propio, identidad visual, playbooks por industria, limites de supervision y reporting de ROI para cada programa operativo.
            </p>
            <Button asChild className="mt-6 bg-[#8fb2aa] text-white hover:bg-[#7a9a91]">
              <Link href="/app/white-label/setup">Configurar partner</Link>
            </Button>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            {[
              {
                icon: Globe,
                title: 'Dominio y marca',
                desc: 'Opera en un dominio propio con identidad visual del partner.',
              },
              {
                icon: Palette,
                title: 'Playbooks por cliente',
                desc: 'Empaqueta roles, rutinas, outputs y reglas de escalamiento por industria.',
              },
              {
                icon: TrendingUp,
                title: 'ROI y gobierno',
                desc: 'Mide horas recuperadas, replacement, supervision y expansion por cuenta.',
              },
            ].map((feature) => (
              <div key={feature.title} className="rounded-none border border-[#d8e5e2] bg-white p-5">
                <feature.icon size={24} className="text-[#8fb2aa]" />
                <h3 className="mt-3 font-semibold text-[#173634]">{feature.title}</h3>
                <p className="mt-1 text-sm text-[#173634]/60">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="rounded-none border border-[#d8e5e2] bg-white p-6">
            <h2 className="font-semibold text-[#173634]">Tu cuenta partner</h2>
            <div className="mt-4 space-y-3">
              <div>
                <p className="text-xs text-[#173634]/60">Marca partner</p>
                <p className="mt-1 font-semibold text-[#173634]">N3 Partner Studio</p>
              </div>
              <div>
                <p className="text-xs text-[#173634]/60">Dominio operativo</p>
                <p className="mt-1 font-semibold text-[#173634]">twins.partner.cl</p>
              </div>
              <div>
                <p className="text-xs text-[#173634]/60">Modelo</p>
                <p className="mt-1 font-semibold text-[#173634]">Programa gestionado por cliente</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
