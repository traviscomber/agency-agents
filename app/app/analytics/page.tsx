import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const MONTHLY_DATA = [
  { month: 'Nov', runs: 120, cost: 58 },
  { month: 'Dec', runs: 185, cost: 79 },
  { month: 'Jan', runs: 240, cost: 95 }
]

const AGENT_DATA = [
  { name: 'Content Writer', runs: 85, time: 12.5 },
  { name: 'Data Analyst', runs: 72, time: 8.3 },
  { name: 'Code Reviewer', runs: 56, time: 6.8 },
  { name: 'Email Drafter', runs: 27, time: 3.2 }
]

const ROI_DATA = [
  { description: 'Hours saved (est.)', value: '24', unit: 'hrs/month' },
  { description: 'Cost per output', value: '$0.40', unit: 'per run' },
  { description: 'Value generated', value: '$2,400', unit: 'est.' }
]

export default function AnalyticsPage() {
  return (
    <div className="space-y-8">
      <div className="border-b border-[#d8e5e2] pb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#8fb2aa]">Performance</p>
        <h1 className="mt-2 text-3xl font-light tracking-tight text-[#173634]">Analytics</h1>
        <p className="mt-2 text-sm text-[#173634]/60">Track usage, ROI, and agent performance metrics.</p>
      </div>

      {/* Key metrics */}
      <section>
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-[#8fb2aa]">ROI This Month</p>
        <div className="grid gap-4 sm:grid-cols-3">
          {ROI_DATA.map((metric) => (
            <div key={metric.description} className="border border-[#d8e5e2] bg-white px-5 py-4">
              <p className="text-xs text-[#173634]/60">{metric.description}</p>
              <p className="mt-2 text-3xl font-light text-[#173634]">{metric.value}</p>
              <p className="mt-1 text-xs text-[#173634]/50">{metric.unit}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Monthly trends */}
      <section className="border border-[#d8e5e2] bg-white px-6 py-6">
        <p className="mb-6 text-xs font-semibold uppercase tracking-[0.22em] text-[#8fb2aa]">Monthly Trends</p>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={MONTHLY_DATA} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#d8e5e2" />
            <XAxis dataKey="month" stroke="#555a56" />
            <YAxis stroke="#555a56" />
            <Tooltip contentStyle={{ backgroundColor: '#fbfbfa', border: '1px solid #d8e5e2' }} />
            <Legend />
            <Line type="monotone" dataKey="runs" stroke="#8fb2aa" name="Runs" strokeWidth={2} />
            <Line type="monotone" dataKey="cost" stroke="#555a56" name="Cost ($)" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </section>

      {/* Agent performance */}
      <section className="border border-[#d8e5e2] bg-white px-6 py-6">
        <p className="mb-6 text-xs font-semibold uppercase tracking-[0.22em] text-[#8fb2aa]">Agent Performance</p>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={AGENT_DATA} margin={{ top: 5, right: 30, left: 0, bottom: 80 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#d8e5e2" />
            <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} stroke="#555a56" />
            <YAxis stroke="#555a56" />
            <Tooltip contentStyle={{ backgroundColor: '#fbfbfa', border: '1px solid #d8e5e2' }} />
            <Legend />
            <Bar dataKey="runs" fill="#8fb2aa" name="Total Runs" />
            <Bar dataKey="time" fill="#d8e5e2" name="Avg Time (min)" />
          </BarChart>
        </ResponsiveContainer>
      </section>

      {/* CTA */}
      <div className="border border-[#d8e5e2] bg-[#f1f6f4] px-5 py-4">
        <p className="text-xs font-semibold text-[#173634]">Want deeper insights?</p>
        <p className="mt-2 text-xs leading-relaxed text-[#173634]/70">
          Upgrade to Pro or Team to unlock advanced analytics, custom reports, and API access for integration with your business intelligence tools.
        </p>
      </div>
    </div>
  )
}
