import { Upload, CheckCircle, Clock, AlertCircle, Plus } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export const metadata = {
  title: 'Lotes operativos | N3uralia Studio',
  description: 'Procesa bases, documentos y carteras con gemelos operativos supervisados.',
}

export default function BatchPage() {
  const jobs = [
    {
      id: '1',
      name: 'Revision masiva de licitaciones',
      twin: 'Analista de Licitaciones Chile',
      status: 'complete',
      total_items: 42,
      processed: 42,
      roi: 'CLP $640k',
      output: 'Go/no-go, requisitos, riesgos y checklist documental.',
      created_at: new Date(Date.now() - 86400000).toISOString(),
    },
    {
      id: '2',
      name: 'Priorizacion cartera vencida',
      twin: 'Cobranza Pyme Chile',
      status: 'processing',
      total_items: 890,
      processed: 342,
      roi: 'CLP $1.1M',
      output: 'Segmentos de riesgo, mensajes sugeridos y excepciones.',
      created_at: new Date().toISOString(),
    },
  ]

  const statusIcons = {
    complete: <CheckCircle size={14} className="text-green-600" />,
    processing: <Clock size={14} className="text-blue-600 animate-spin" />,
    failed: <AlertCircle size={14} className="text-red-600" />,
    pending: <Clock size={14} className="text-gray-600" />,
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <header className="mb-10 border-b border-[#d8e5e2] pb-8">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#8fb2aa]">Lotes operativos</p>
            <h1 className="mt-2 text-3xl font-light tracking-tight text-[#173634]">Procesa volumen sin perder supervision.</h1>
            <p className="mt-2 text-sm leading-relaxed text-[#173634]/60">
              Usa gemelos para revisar carteras, bases, cuentas o documentos en lote, dejando output, ROI estimado y excepciones para humano.
            </p>
          </div>
          <Button asChild className="rounded-lg bg-[#8fb2aa] text-white hover:bg-[#7a9a91]">
            <Link href="/app/batch/new">
              <Plus size={14} className="mr-2" />
              Nuevo lote
            </Link>
          </Button>
        </div>
      </header>

      <div className="space-y-3">
        {jobs.length === 0 ? (
          <div className="rounded-none border border-[#d8e5e2] bg-[#f1f6f4] px-6 py-10 text-center">
            <Upload size={32} className="mx-auto mb-3 text-[#8fb2aa]" />
            <p className="text-sm text-[#173634]/60">Aun no hay lotes. Carga una cartera, base o documento para empezar.</p>
          </div>
        ) : (
          jobs.map((job) => (
            <div key={job.id} className="rounded-none border border-[#d8e5e2] bg-white p-5">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-[#173634]">{job.name}</h3>
                    <div className="flex items-center gap-1">
                      {statusIcons[job.status as keyof typeof statusIcons]}
                      <span className="text-xs font-medium text-[#173634]/60 capitalize">{job.status}</span>
                    </div>
                  </div>
                  <p className="mt-1 text-xs font-medium text-[#173634]/50">{job.twin}</p>
                  <p className="mt-2 text-sm text-[#173634]/60">
                    {job.processed} de {job.total_items} registros procesados
                  </p>
                  <p className="mt-2 text-xs leading-5 text-[#52605d]">Output: {job.output}</p>
                  <div className="mt-3 h-2 w-full bg-[#d8e5e2]">
                    <div
                      className="h-2 bg-[#8fb2aa] transition-all"
                      style={{ width: `${(job.processed / job.total_items) * 100}%` }}
                    />
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-[#173634]">{job.roi}</p>
                  <p className="text-xs text-[#173634]/60">ROI estimado</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
