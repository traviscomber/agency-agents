'use client'

import { useState } from 'react'
import { AlertCircle, ChevronDown, Lightbulb, Zap } from 'lucide-react'

const FAQ_ITEMS = [
  {
    category: 'Primeros pasos',
    items: [
      {
        q: 'Qué es un programa operativo?',
        a: 'Un programa operativo es un flujo de trabajo con pasos, contexto, responsables y entregables guardados. Sirve para que un gemelo digital pueda continuar trabajo real sin perder memoria.',
      },
      {
        q: 'Qué es un gemelo digital?',
        a: 'Un gemelo digital es un trabajador digital supervisado para un cargo específico: ventas, cobranza, licitaciones, implementación o reclutamiento. Replica rutinas, formatos de salida y criterios del rol.',
      },
      {
        q: 'Cómo ejecuto un gemelo?',
        a: 'Entra a Programas, abre el programa operativo, revisa el paso activo y ejecuta el gemelo recomendado. Después guarda el entregable para que quede disponible como memoria operativa.',
      },
    ],
  },
  {
    category: 'Resultados y control',
    items: [
      {
        q: 'Qué significa Replacement Score?',
        a: 'Replacement Score muestra qué porcentaje del cargo puede absorber el gemelo digital bajo supervisión. Un score alto no elimina aprobaciones humanas; indica mayor capacidad repetible y más carga operativa delegable.',
      },
      {
        q: 'Qué significa nivel de supervisión?',
        a: 'Baja significa chequeos ligeros. Media requiere revisión regular. Alta debe mantenerse bajo aprobación humana explícita antes de ejecutar decisiones sensibles.',
      },
      {
        q: 'Por qué puede fallar una corrida?',
        a: 'Normalmente falta contexto, el objetivo no está claro o el gemelo no calza con el paso. Revisa Historial, ajusta el brief y vuelve a ejecutar con más datos del programa.',
      },
    ],
  },
  {
    category: 'Buenas practicas',
    items: [
      {
        q: 'Debo guardar outputs?',
        a: 'Sí. Los outputs guardados son memoria reutilizable: propuestas, minutas, checklists, mensajes de cobranza, análisis de licitaciones y handoffs para el siguiente operador.',
      },
      {
        q: 'Cuántos pasos debe tener un programa?',
        a: 'Parte con 2 o 3 pasos. Cada paso debe representar una decisión, rutina o handoff donde un gemelo digital o una persona toma responsabilidad.',
      },
      {
        q: 'Puedo ejecutar el mismo gemelo más de una vez?',
        a: 'Sí. Algunos programas necesitan el mismo gemelo en distintas etapas. Cada corrida queda registrada para trazabilidad y aprendizaje operativo.',
      },
    ],
  },
  {
    category: 'Problemas frecuentes',
    items: [
      {
        q: 'El gemelo sigue fallando, qué hago?',
        a: 'Revisa Historial. Los problemas comunes son instrucciones poco precisas, datos incompletos o un gemelo mal asignado al paso. Ajusta el brief o cambia el gemelo.',
      },
      {
        q: 'Cómo veo qué pasó en una corrida?',
        a: 'Ve a Historial, abre la corrida y revisa inputs, outputs y errores. Eso te permite auditar qué hizo el gemelo y qué contexto necesita para mejorar.',
      },
      {
        q: 'Puedo borrar o deshacer una corrida?',
        a: 'Las corridas quedan como historial de auditoría. Si necesitas corregir, crea una nueva corrida o ajusta el paso del programa sin borrar la trazabilidad anterior.',
      },
    ],
  },
]

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)

  return (
    <button onClick={() => setOpen(!open)} className="w-full text-left">
      <div className="flex items-start justify-between gap-4 border border-[#edf4f1] bg-white px-4 py-3 hover:bg-[#f1f6f4]">
        <p className="text-sm font-medium text-[#173634]">{q}</p>
        <ChevronDown size={16} className={`shrink-0 text-[#8fb2aa] transition-transform ${open ? 'rotate-180' : ''}`} />
      </div>
      {open ? (
        <div className="border border-t-0 border-[#edf4f1] bg-white px-4 py-3">
          <p className="text-sm leading-6 text-[#52605d]">{a}</p>
        </div>
      ) : null}
    </button>
  )
}

export default function HelpPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 sm:py-8">
      <header className="mb-8 border-b border-[#d8e5e2] pb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#8fb2aa]">Guia operativa</p>
        <h1 className="mt-2 text-3xl font-light text-[#173634]">Cómo usar N3uralia Twin OS</h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#52605d]">
          Lo esencial para crear programas operativos, ejecutar gemelos digitales y entender replacement, supervisión y outputs guardados.
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-8">
          {FAQ_ITEMS.map((category) => (
            <section key={category.category}>
              <h2 className="mb-3 text-lg font-semibold text-[#173634]">{category.category}</h2>
              <div className="space-y-2">
                {category.items.map((item) => (
                  <FAQItem key={item.q} q={item.q} a={item.a} />
                ))}
              </div>
            </section>
          ))}
        </div>

        <aside className="space-y-4 lg:sticky lg:top-6 lg:h-fit">
          <div className="rounded-none border border-[#d8e5e2] bg-[#fbfbfa] p-4">
            <div className="mb-3 flex items-center gap-2 text-[#8fb2aa]">
              <Lightbulb size={16} />
              <p className="text-xs font-semibold uppercase tracking-[0.16em]">Tip operativo</p>
            </div>
            <p className="text-sm leading-relaxed text-[#52605d]">
              Guarda outputs buenos. Sirven como memoria para que futuros gemelos digitales entiendan calidad, tono, formato y criterio esperado.
            </p>
          </div>

          <div className="rounded-none border border-[#d8e5e2] bg-[#fbfbfa] p-4">
            <div className="mb-3 flex items-center gap-2 text-[#8fb2aa]">
              <Zap size={16} />
              <p className="text-xs font-semibold uppercase tracking-[0.16em]">Inicio rápido</p>
            </div>
            <ol className="space-y-2 text-sm text-[#52605d]">
              <li>1. Crea un programa operativo</li>
              <li>2. Define 2-3 pasos de workflow</li>
              <li>3. Asigna gemelos a los pasos</li>
              <li>4. Ejecuta, revisa y guarda outputs</li>
            </ol>
          </div>

          <div className="rounded-none border border-amber-200 bg-amber-50 p-4">
            <div className="mb-3 flex items-center gap-2 text-amber-600">
              <AlertCircle size={16} />
              <p className="text-xs font-semibold uppercase tracking-[0.16em]">Recuerda</p>
            </div>
            <p className="text-sm leading-relaxed text-amber-700">
              Los gemelos digitales funcionan mejor con contexto específico: cuenta, objetivo, restricciones, formato esperado y criterio de escalamiento humano.
            </p>
          </div>
        </aside>
      </div>

      <div className="mt-12 border-t border-[#d8e5e2] pt-8">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-[#8fb2aa]">¿Necesitas ayuda?</p>
        <p className="text-sm text-[#52605d]">Revisa los tips dentro de cada pagina o escribe a support@n3uralia.com.</p>
      </div>
    </div>
  )
}
