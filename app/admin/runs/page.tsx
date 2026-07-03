import { MOCK_RUNS } from '@/lib/data/mock-store'
import { DivisionBadge } from '@/components/shared/DivisionBadge'
import { FolderOpen, Calendar } from 'lucide-react'

export default function AdminRunsPage() {
  const completed = MOCK_RUNS.filter((run) => run.status === 'completed').length
  const failed = MOCK_RUNS.filter((run) => run.status === 'failed').length
  const running = MOCK_RUNS.filter((run) => run.status === 'running').length

  return (
    <div className="mx-auto max-w-6xl px-6 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-light tracking-[-0.02em] text-[#173634]">Run Monitor</h1>
        <p className="mt-2 text-base text-[#555a56]">Execution log with status and performance metrics.</p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-4 mb-8">
        {[
          ['Total runs', String(MOCK_RUNS.length)],
          ['Completed', String(completed)],
          ['Running', String(running)],
          ['Failed', String(failed)],
        ].map(([label, value]) => (
          <div key={label} className="space-y-3 rounded-none border border-[#d8e5e2] bg-white px-5 py-4">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#555a56]">{label}</p>
            <p className="text-3xl font-semibold text-[#173634]">{value}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-none border border-[#d8e5e2] bg-white">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#d8e5e2] bg-[#f1f6f4]">
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.16em] text-[#555a56]">Agent</th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.16em] text-[#555a56]">Task</th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.16em] text-[#555a56]">Division</th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.16em] text-[#555a56]">Date</th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.16em] text-[#555a56]">Status</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_RUNS.map((run, idx) => (
              <tr key={run.id} className={idx < MOCK_RUNS.length - 1 ? 'border-b border-[#d8e5e2]' : ''}>
                <td className="px-6 py-4 text-sm font-semibold text-[#173634]">{run.agentName}</td>
                <td className="px-6 py-4">
                  <p className="text-sm text-[#173634]">{run.task}</p>
                  {run.projectName && (
                    <p className="flex items-center gap-1 text-xs text-[#555a56] mt-1">
                      <FolderOpen size={12} />
                      {run.projectName}
                    </p>
                  )}
                </td>
                <td className="px-6 py-4">
                  <DivisionBadge division={run.agentDivision} size="sm" />
                </td>
                <td className="px-6 py-4 flex items-center gap-2 text-xs text-[#555a56]">
                  <Calendar size={12} />
                  {new Date(run.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.12em] ${
                      run.status === 'completed'
                        ? 'bg-emerald-100 text-emerald-700'
                        : run.status === 'failed'
                          ? 'bg-red-100 text-red-700'
                          : run.status === 'running'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-[#e8ede9] text-[#555a56]'
                    }`}
                  >
                    {run.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
