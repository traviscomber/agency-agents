'use client'

interface ConversionPathProps {
  locale: 'es' | 'en'
  active: 'context' | 'diagnosis' | 'twin' | 'program'
  variant?: 'dark' | 'light'
}

const steps = {
  es: [
    ['Contexto', 'Industria o cargo'],
    ['Diagnostico', 'ROI y supervision'],
    ['Gemelo', 'Rol recomendado'],
    ['Programa', 'Ejecucion operativa'],
  ],
  en: [
    ['Context', 'Industry or role'],
    ['Diagnosis', 'ROI and supervision'],
    ['Twin', 'Recommended role'],
    ['Program', 'Operating execution'],
  ],
}

const stepKeys = ['context', 'diagnosis', 'twin', 'program'] as const

export function ConversionPath({ locale, active, variant = 'light' }: ConversionPathProps) {
  const activeIndex = stepKeys.indexOf(active)
  const isDark = variant === 'dark'

  return (
    <div className={`border ${isDark ? 'border-[#28413d] bg-[#0d1917]' : 'border-[#d8e5e2] bg-[#f1f6f4]'} p-3`}>
      <p className={`text-[9px] font-semibold uppercase tracking-[0.22em] ${isDark ? 'text-[#789b96]' : 'text-[#527b73]'}`}>
        {locale === 'es' ? 'Ruta de conversion' : 'Conversion path'}
      </p>
      <div className="mt-3 grid gap-2 sm:grid-cols-4">
        {steps[locale].map(([title, body], index) => {
          const isActive = index === activeIndex
          const isDone = index < activeIndex

          return (
            <div
              key={title}
              className={`border px-3 py-2 ${
                isActive
                  ? isDark
                    ? 'border-[#8fb2aa] bg-[#132824]'
                    : 'border-[#8fb2aa] bg-white'
                  : isDone
                    ? isDark
                      ? 'border-[#28413d] bg-[#10211f]'
                      : 'border-[#cfe1dc] bg-white'
                    : isDark
                      ? 'border-[#28413d] bg-[#07100f]'
                      : 'border-[#d8e5e2] bg-[#fbfbfa]'
              }`}
            >
              <p className={`text-[10px] font-semibold uppercase tracking-[0.16em] ${isActive ? 'text-[#8fb2aa]' : isDark ? 'text-[#d9e3e0]' : 'text-[#173634]'}`}>
                {index + 1}. {title}
              </p>
              <p className={`mt-1 text-[11px] leading-4 ${isDark ? 'text-[#9db7b1]' : 'text-[#52605d]'}`}>{body}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
