'use client'

import { useState, useEffect } from 'react'
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { Sparkles, TrendingUp, Users, Zap } from 'lucide-react'

interface AnalyticsData {
  userGrowth: Array<{ date: string; users: number }>
  agentUsage: Array<{ agent: string; runs: number }>
  systemHealth: { uptime: number; avgResponseTime: number; successRate: number }
  topMetrics: Array<{ label: string; value: string; change: number }>
}

const COLORS = ['#8fb2aa', '#d9e3e0', '#789b96', '#9db7b1']

export function AdminAnalytics() {
  const [data, setData] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadAnalytics = async () => {
      try {
        setLoading(true)
        // Mock data for now - will be replaced with real analytics endpoint
        const mockData: AnalyticsData = {
          userGrowth: [
            { date: 'Jun 1', users: 142 },
            { date: 'Jun 8', users: 158 },
            { date: 'Jun 15', users: 187 },
            { date: 'Jun 22', users: 216 },
            { date: 'Jun 29', users: 258 },
          ],
          agentUsage: [
            { agent: 'Cobranza', runs: 342 },
            { agent: 'Compliance', runs: 218 },
            { agent: 'Growth PM', runs: 187 },
            { agent: 'HR Ops', runs: 156 },
            { agent: 'Finance', runs: 124 },
          ],
          systemHealth: {
            uptime: 99.97,
            avgResponseTime: 245,
            successRate: 98.6
          },
          topMetrics: [
            { label: 'Total Runs', value: '12,847', change: 23 },
            { label: 'Avg ROI/Run', value: '$1,240', change: 18 },
            { label: 'User Retention', value: '94.2%', change: 5 },
            { label: 'Support Tickets', value: '156', change: -12 },
          ]
        }

        setData(mockData)
      } catch (err) {
        console.error('Failed to load analytics:', err)
      } finally {
        setLoading(false)
      }
    }

    loadAnalytics()
  }, [])

  if (loading) {
    return <div className="text-gray-600">Loading analytics...</div>
  }

  if (!data) {
    return <div className="text-red-600">Failed to load analytics</div>
  }

  return (
    <div className="space-y-6">
      {/* Top Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {data.topMetrics.map((metric, idx) => (
          <div key={idx} className="bg-white rounded border border-gray-200 p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-600 mb-2">
              {metric.label}
            </p>
            <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
            <p className={`text-xs mt-2 ${metric.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {metric.change >= 0 ? '+' : ''}{metric.change}% vs last period
            </p>
          </div>
        ))}
      </div>

      {/* User Growth Chart */}
      <div className="bg-white rounded border border-gray-200 p-6">
        <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <TrendingUp className="w-4 h-4" />
          User Growth (Last 30 Days)
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data.userGrowth}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="users"
              stroke="#8fb2aa"
              dot={{ fill: '#8fb2aa', r: 4 }}
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Agent Usage */}
        <div className="bg-white rounded border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Zap className="w-4 h-4" />
            Agent Usage Distribution
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={data.agentUsage}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="agent" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="runs" fill="#8fb2aa" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* System Health */}
        <div className="bg-white rounded border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">System Health</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Uptime</span>
                <span className="text-sm font-bold text-green-600">{data.systemHealth.uptime}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-600 h-2 rounded-full"
                  style={{ width: `${data.systemHealth.uptime}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Success Rate</span>
                <span className="text-sm font-bold text-blue-600">{data.systemHealth.successRate}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{ width: `${data.systemHealth.successRate}%` }}
                />
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                <span className="font-semibold">Avg Response Time:</span> {data.systemHealth.avgResponseTime}ms
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* AI Insights Section */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded border border-blue-200 p-6">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-5 h-5 text-blue-600" />
          <h3 className="font-semibold text-gray-900">AI-Powered Insights</h3>
        </div>
        <ul className="space-y-2 text-sm text-gray-700">
          <li>• User retention is trending up - maintain current engagement strategy</li>
          <li>• Cobranza agent driving 27% of platform value - optimize allocation</li>
          <li>• Support tickets down 12% - improved onboarding working well</li>
          <li>• Next growth opportunity: expand Compliance agent in manufacturing sector</li>
        </ul>
      </div>
    </div>
  )
}
