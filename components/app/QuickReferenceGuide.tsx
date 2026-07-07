'use client'

import { ChevronDown } from 'lucide-react'
import { useState } from 'react'

interface QuickRefItem {
  title: string
  steps: string[]
}

const QUICK_REFS: QuickRefItem[] = [
  {
    title: 'Ejecutar un gemelo',
    steps: [
      '1. Entra a Gemelos y selecciona el rol correcto',
      '2. Ejecutalo sobre el paso activo del programa',
      '3. Audita progreso en el ledger de twins',
      '4. Guarda entregables utiles en Entregables',
    ],
  },
  {
    title: 'Crear un programa operativo',
    steps: [
      '1. Entra a Programas y crea un nuevo programa',
      '2. Define objetivo, contexto y restricciones',
      '3. Agrega rutinas como Venta, Propuesta, Cobranza o Follow-up',
      '4. Asigna gemelos digitales a cada paso',
    ],
  },
  {
    title: 'Entender el dashboard',
    steps: [
      'Programas activos: flujos operativos en curso',
      'Calidad de ejecucion: corridas recientes completadas y revisables',
      'Cobertura de roles: cargos cubiertos por gemelos digitales',
      'Abre cada tarjeta para ver contexto, supervision y siguiente paso',
    ],
  },
  {
    title: 'Siguientes movimientos',
    steps: [
      'Ejecuta un gemelo sobre el primer paso',
      'Revisa resultados, riesgos y handoff en el ledger',
      'Guarda entregables importantes para reutilizar',
      'Crea el siguiente paso o escalamiento humano',
    ],
  },
]

export function QuickReferenceGuide() {
  const [expanded, setExpanded] = useState<string | null>(null)

  return (
    <div className="space-y-2 rounded-none border border-[#d8e5e2] bg-[#fbfbfa] p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#8fb2aa]">Referencia rapida</p>
      <div className="space-y-1">
        {QUICK_REFS.map((ref) => (
          <button key={ref.title} onClick={() => setExpanded(expanded === ref.title ? null : ref.title)} className="w-full text-left">
            <div className="flex items-center justify-between border border-[#edf4f1] bg-white px-3 py-2 hover:bg-[#f1f6f4]">
              <p className="text-xs font-semibold text-[#173634]">{ref.title}</p>
              <ChevronDown size={14} className={`text-[#8fb2aa] transition-transform ${expanded === ref.title ? 'rotate-180' : ''}`} />
            </div>
            {expanded === ref.title ? (
              <div className="border border-t-0 border-[#edf4f1] bg-white px-3 py-2">
                {ref.steps.map((step) => (
                  <p key={step} className="py-1 text-[10px] leading-4 text-[#52605d]">
                    {step}
                  </p>
                ))}
              </div>
            ) : null}
          </button>
        ))}
      </div>
    </div>
  )
}
