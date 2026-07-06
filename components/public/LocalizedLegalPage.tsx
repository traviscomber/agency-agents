import Link from 'next/link'
import { ArrowRight, FileText, ShieldCheck } from 'lucide-react'

import { PublicFooter } from '@/components/public/PublicFooter'
import { PublicNavbar } from '@/components/public/PublicNavbar'
import { getLocalizedHref, type MarketingLocale } from '@/lib/marketing-i18n'

type LegalKind = 'privacy' | 'terms'

const copy = {
  es: {
    privacy: {
      eyebrow: 'Privacidad',
      title: 'Privacidad para trabajo digital supervisado.',
      body: 'Esta pagina resume como N3uralia Studio trata informacion del sitio, cuentas, diagnosticos y workspace operativo. No reemplaza asesoria legal; entrega una base clara para evaluar confianza antes de desplegar twins.',
      sections: [
        ['Informacion que podemos recibir', 'Datos basicos de cuenta, mensajes de contacto, diagnosticos operativos, uso del producto y registros tecnicos necesarios para operar, proteger y mejorar la experiencia.'],
        ['Uso de informacion', 'Usamos informacion para responder solicitudes, mantener acceso, ejecutar flujos del producto, mejorar calidad, diagnosticar errores y medir impacto operativo.'],
        ['Datos de programas y entregables', 'Los briefs, handoffs, outputs y memoria operativa se tratan como contexto de trabajo del usuario. El equipo debe evitar cargar secretos, claves o datos sensibles que no sean necesarios para la rutina.'],
        ['Proveedores y seguridad', 'Podemos usar proveedores tecnicos para hosting, analitica, autenticacion, pagos o comunicacion. No vendemos informacion personal.'],
        ['Control del usuario', 'Puedes solicitar acceso, correccion o eliminacion cuando corresponda escribiendo al canal de contacto.'],
      ],
    },
    terms: {
      eyebrow: 'Terminos',
      title: 'Terminos para usar N3uralia Twin OS.',
      body: 'Estos terminos describen reglas basicas para usar el sitio, las cuentas y el workspace de twins operativos. El producto ayuda a ejecutar trabajo repetible, pero las decisiones criticas siguen bajo responsabilidad humana.',
      sections: [
        ['Uso del servicio', 'Puedes explorar, probar y usar los flujos disponibles para diagnostico, twins, programas, memoria y entregables. Debes usar el servicio de forma legal, segura y no abusiva.'],
        ['Cuentas y acceso', 'Si las cuentas estan habilitadas, debes entregar informacion correcta y proteger tus credenciales. Podemos suspender acceso ante abuso, fraude o actividad riesgosa.'],
        ['Outputs y supervision', 'Los outputs de twins son apoyo operativo. Deben revisarse antes de enviarse a clientes, publicarse, usarse en produccion o apoyar decisiones legales, financieras o comerciales sensibles.'],
        ['Limites del producto', 'N3uralia no promete autonomia total ni reemplazo de juicio profesional. El valor esta en rutinas repetibles, memoria, handoffs y escalamiento humano.'],
        ['Cambios del servicio', 'Podemos modificar, pausar o retirar funciones mientras el producto evoluciona, priorizando seguridad, continuidad y calidad.'],
      ],
    },
    contact: 'Preguntas legales o de privacidad',
    contactBody: 'Escribenos para revisar acceso, correccion, eliminacion de informacion o dudas sobre uso responsable.',
    contactCta: 'Contactar',
    trustCta: 'Ver seguridad y supervision',
  },
  en: {
    privacy: {
      eyebrow: 'Privacy',
      title: 'Privacy for supervised digital work.',
      body: 'This page summarizes how N3uralia Studio handles information across the site, accounts, diagnoses, and operating workspace. It is not legal advice; it gives a clear trust baseline before deploying twins.',
      sections: [
        ['Information we may receive', 'Basic account details, contact messages, operating diagnoses, product usage, and technical logs needed to operate, protect, and improve the experience.'],
        ['How information is used', 'We use information to respond to requests, maintain access, run product flows, improve quality, diagnose errors, and measure operating impact.'],
        ['Program and deliverable data', 'Briefs, handoffs, outputs, and operating memory are treated as user work context. Teams should avoid loading secrets, credentials, or sensitive data that is not required for the routine.'],
        ['Providers and security', 'We may use technical providers for hosting, analytics, authentication, payments, or communication. We do not sell personal information.'],
        ['User control', 'You may request access, correction, or deletion where applicable by contacting us.'],
      ],
    },
    terms: {
      eyebrow: 'Terms',
      title: 'Terms for using N3uralia Twin OS.',
      body: 'These terms describe basic rules for using the site, accounts, and operating twin workspace. The product helps execute repeatable work, but critical decisions remain under human responsibility.',
      sections: [
        ['Using the service', 'You may browse, test, and use available flows for diagnosis, twins, programs, memory, and deliverables. You must use the service legally, safely, and without abuse.'],
        ['Accounts and access', 'If account features are enabled, you must provide accurate information and keep credentials secure. We may suspend access for abusive, fraudulent, or risky activity.'],
        ['Outputs and supervision', 'Twin outputs support operating work. They should be reviewed before being sent to clients, published, used in production, or used for sensitive legal, financial, or commercial decisions.'],
        ['Product limits', 'N3uralia does not promise total autonomy or replacement of professional judgment. The value is repeatable routines, memory, handoffs, and human escalation.'],
        ['Service changes', 'We may change, pause, or remove features as the product evolves, prioritizing security, continuity, and quality.'],
      ],
    },
    contact: 'Legal or privacy questions',
    contactBody: 'Contact us for access, correction, deletion requests, or questions about responsible use.',
    contactCta: 'Contact',
    trustCta: 'View trust and supervision',
  },
} satisfies Record<MarketingLocale, Record<string, any>>

type LocalizedLegalPageProps = {
  locale: MarketingLocale
  kind: LegalKind
}

export function LocalizedLegalPage({ locale, kind }: LocalizedLegalPageProps) {
  const t = copy[locale]
  const page = t[kind]
  const Icon = kind === 'privacy' ? ShieldCheck : FileText

  return (
    <div className="min-h-screen bg-[#fbfbfa]">
      <PublicNavbar />
      <main>
        <section className="border-b border-[#d8e5e2] bg-[#0d1f1d] pt-[4.75rem]">
          <div className="mx-auto max-w-5xl px-5 py-20 sm:px-8">
            <div className="inline-flex items-center gap-2 border border-[#28413d] bg-white/5 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#8fb2aa]">
              <Icon className="h-4 w-4" />
              {page.eyebrow}
            </div>
            <h1 className="mt-6 max-w-4xl text-4xl font-light leading-tight tracking-[-0.05em] text-[#f5fbfa] md:text-6xl">
              {page.title}
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-8 text-[#9db7b1]">{page.body}</p>
          </div>
        </section>

        <section className="border-b border-[#d8e5e2]">
          <div className="mx-auto grid max-w-5xl gap-4 px-5 py-16 sm:px-8">
            {page.sections.map(([title, body]: [string, string]) => (
              <article key={title} className="border border-[#d8e5e2] bg-white p-6 shadow-[0_14px_44px_-34px_rgba(15,23,42,0.35)]">
                <h2 className="text-lg font-semibold text-[#173634]">{title}</h2>
                <p className="mt-3 text-sm leading-7 text-[#52605d]">{body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="bg-[#f1f6f4]">
          <div className="mx-auto flex max-w-5xl flex-col gap-5 px-5 py-12 sm:px-8 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#789b96]">{t.contact}</p>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-[#52605d]">{t.contactBody}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href={getLocalizedHref(locale, '/contact')} className="inline-flex items-center gap-2 bg-[#173634] px-5 py-3 text-sm font-semibold text-white hover:bg-[#0d1f1d]">
                {t.contactCta} <ArrowRight size={13} />
              </Link>
              <Link href={getLocalizedHref(locale, '/trust')} className="inline-flex items-center gap-2 border border-[#d8e5e2] bg-white px-5 py-3 text-sm font-semibold text-[#173634] hover:border-[#8fb2aa]">
                {t.trustCta}
              </Link>
            </div>
          </div>
        </section>
      </main>
      <PublicFooter />
    </div>
  )
}
