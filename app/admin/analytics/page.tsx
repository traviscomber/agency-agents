'use client'

import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

const revenueData = [
  { month: 'Jan', baseline: 10000, phase1: 10800, phase2: 11520, phase3: 13824 },
  { month: 'Feb', baseline: 10000, phase1: 10800, phase2: 11520, phase3: 13824 },
  { month: 'Mar', baseline: 10000, phase1: 10800, phase2: 11520, phase3: 13824 },
]

const userMetrics = [
  { month: 'Jan', free: 245, starter: 89, pro: 34, enterprise: 8 },
  { month: 'Feb', free: 312, starter: 112, pro: 48, enterprise: 12 },
  { month: 'Mar', free: 428, starter: 156, pro: 67, enterprise: 18 },
]

const COLORS = ['#8fb2aa', '#555a56', '#173634', '#d8e5e2']

export default function AdminAnalyticsPage() {
  const totalUsers = 669
  const totalRevenue = 41472
  const mrr = 13824
  const growth = 140

  return (
    <div className="space-y-8 p-8">
      <header>
        <h1 className="text-4xl font-light text-[#173634]">Analytics</h1>
        <p className="mt-2 text-[#555a56]">Platform metrics and revenue tracking</p>
      </header>

      {/* KPI Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: 'Total Users', value: totalUsers, change: '+72%' },
          { label: 'Monthly Revenue', value: `$${totalRevenue.toLocaleString()}`, change: '+140%' },
          { label: 'MRR', value: `$${mrr.toLocaleString()}`, change: 'Phase 3' },
          { label: 'Growth', value: `${growth}%`, change: 'Baseline to Phase 3' },
        ].map((kpi) => (
          <div key={kpi.label} className="border border-[#d8e5e2] bg-white p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#555a56]">{kpi.label}</p>
            <p className="mt-2 text-2xl font-light text-[#173634]">{kpi.value}</p>
            <p className="mt-1 text-xs text-[#8fb2aa]">{kpi.change}</p>
          </div>
        ))}
      </div>

      {/* Revenue Projection */}
      <div className="border border-[#d8e5e2] bg-white p-6">
        <h2 className="text-lg font-semibold text-[#173634]">Revenue Progression (Phase 1-3)</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={revenueData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#d8e5e2" />
            <XAxis dataKey="month" stroke="#555a56" />
            <YAxis stroke="#555a56" />
            <Tooltip contentStyle={{ backgroundColor: '#fbfbfa', border: '1px solid #d8e5e2' }} />
            <Legend />
            <Line type="monotone" dataKey="baseline" stroke="#d8e5e2" strokeWidth={2} />
            <Line type="monotone" dataKey="phase1" stroke="#555a56" strokeWidth={2} />
            <Line type="monotone" dataKey="phase2" stroke="#8fb2aa" strokeWidth={2} />
            <Line type="monotone" dataKey="phase3" stroke="#173634" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Users by Plan */}
        <div className="border border-[#d8e5e2] bg-white p-6">
          <h2 className="text-lg font-semibold text-[#173634]">Users by Plan</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={userMetrics} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#d8e5e2" />
              <XAxis dataKey="month" stroke="#555a56" />
              <YAxis stroke="#555a56" />
              <Tooltip contentStyle={{ backgroundColor: '#fbfbfa', border: '1px solid #d8e5e2' }} />
              <Legend />
              <Bar dataKey="free" stackId="a" fill="#d8e5e2" />
              <Bar dataKey="starter" stackId="a" fill="#555a56" />
              <Bar dataKey="pro" stackId="a" fill="#8fb2aa" />
              <Bar dataKey="enterprise" stackId="a" fill="#173634" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Plan Distribution */}
        <div className="border border-[#d8e5e2] bg-white p-6">
          <h2 className="text-lg font-semibold text-[#173634]">Plan Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={[
                  { name: 'Free', value: 428 },
                  { name: 'Starter', value: 156 },
                  { name: 'Pro', value: 67 },
                  { name: 'Enterprise', value: 18 },
                ]}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name} ${value}`}
                outerRadius={80}
                fill="#8fb2aa"
                dataKey="value"
              >
                {COLORS.map((color) => (
                  <Cell key={`cell-${color}`} fill={color} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: '#fbfbfa', border: '1px solid #d8e5e2' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Metrics Table */}
      <div className="border border-[#d8e5e2] bg-white p-6">
        <h2 className="text-lg font-semibold text-[#173634] mb-4">Feature Adoption</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-[#d8e5e2]">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-[#173634]">Feature</th>
                <th className="px-4 py-3 text-left font-semibold text-[#173634]">Active Users</th>
                <th className="px-4 py-3 text-left font-semibold text-[#173634]">Revenue Impact</th>
                <th className="px-4 py-3 text-left font-semibold text-[#173634]">Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                { feature: 'Overage Pricing', users: 156, revenue: '+8%', status: 'Active' },
                { feature: 'Scheduled Runs', users: 234, revenue: '+6%', status: 'Active' },
                { feature: 'Analytics Dashboard', users: 189, revenue: '+10%', status: 'Active' },
                { feature: 'Agent Chaining', users: 67, revenue: '+15%', status: 'Active' },
                { feature: 'Custom Training', users: 45, revenue: '+18%', status: 'Active' },
                { feature: 'Slack Integration', users: 34, revenue: '+12%', status: 'Active' },
                { feature: 'Marketplace', users: 23, revenue: '+25%', status: 'Active' },
                { feature: 'White-Label', users: 5, revenue: '+35%', status: 'Active' },
              ].map((row) => (
                <tr key={row.feature} className="border-b border-[#d8e5e2] hover:bg-[#f1f6f4]">
                  <td className="px-4 py-3 text-[#173634]">{row.feature}</td>
                  <td className="px-4 py-3 text-[#555a56]">{row.users}</td>
                  <td className="px-4 py-3 text-[#8fb2aa] font-semibold">{row.revenue}</td>
                  <td className="px-4 py-3"><span className="rounded-full bg-[#f1f6f4] px-2.5 py-1 text-xs text-[#173634]">{row.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
