'use client'

import { useState, useEffect } from 'react'
import { Sparkles, TrendingUp, AlertCircle, CheckCircle2, Clock } from 'lucide-react'
import { useAI } from '@/lib/hooks/useAI'

interface DashboardInsight {
  type: 'opportunity' | 'recommendation' | 'success' | 'alert'
  title: string
  description: string
  action?: string
  icon: React.ReactNode
}

export function SmartDashboard() {
  const [insights, setInsights] = useState<DashboardInsight[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { generate } = useAI()

  useEffect(() => {
    const loadInsights = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/ai/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            prompt: `Generate 3-4 specific, actionable business insights for a N3uralia Twin OS user dashboard.
            Focus on operational efficiency, growth opportunities, cost savings, and process improvements.
            Return as JSON array with objects: { type: 'opportunity'|'recommendation'|'success'|'alert', title, description, action? }
            Be specific and mention actual Chilean SMB business context when relevant.`,
            systemPrompt: 'You are a business operations intelligence system for N3uralia Twin OS. Generate insights that help Chilean SMBs improve operations with supervised digital twins.'
          })
        })

        if (!response.ok) throw new Error('Failed to generate insights')
        
        const data = await response.json()
        const parsed = JSON.parse(data.text)
        
        const iconMap = {
          opportunity: <TrendingUp className="w-5 h-5" />,
          recommendation: <Sparkles className="w-5 h-5" />,
          success: <CheckCircle2 className="w-5 h-5" />,
          alert: <AlertCircle className="w-5 h-5" />
        }
        
        const enrichedInsights = parsed.map((insight: any) => ({
          ...insight,
          icon: iconMap[insight.type as keyof typeof iconMap]
        }))
        
        setInsights(enrichedInsights)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load insights')
        setInsights([])
      } finally {
        setLoading(false)
      }
    }

    loadInsights()
  }, [])

  const bgColorMap = {
    opportunity: 'bg-emerald-50 border-emerald-200',
    recommendation: 'bg-blue-50 border-blue-200',
    success: 'bg-green-50 border-green-200',
    alert: 'bg-amber-50 border-amber-200'
  }

  const textColorMap = {
    opportunity: 'text-emerald-900',
    recommendation: 'text-blue-900',
    success: 'text-green-900',
    alert: 'text-amber-900'
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Sparkles className="w-5 h-5 text-amber-500" />
        <h2 className="text-lg font-semibold text-gray-900">AI Intelligence</h2>
      </div>

      {loading && (
        <div className="animate-pulse space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-24 bg-gray-200 rounded" />
          ))}
        </div>
      )}

      {error && (
        <div className="rounded border border-red-200 bg-red-50 p-4 text-sm text-red-900">
          {error}
        </div>
      )}

      {!loading && !error && insights.length > 0 && (
        <div className="space-y-3">
          {insights.map((insight, idx) => (
            <div
              key={idx}
              className={`rounded border p-4 ${bgColorMap[insight.type]}`}
            >
              <div className="flex items-start gap-3">
                <div className={textColorMap[insight.type]}>
                  {insight.icon}
                </div>
                <div className="flex-1">
                  <h3 className={`font-semibold ${textColorMap[insight.type]}`}>
                    {insight.title}
                  </h3>
                  <p className={`text-sm mt-1 ${textColorMap[insight.type]}`}>
                    {insight.description}
                  </p>
                  {insight.action && (
                    <button className={`mt-2 text-sm font-medium ${textColorMap[insight.type]} hover:underline`}>
                      {insight.action} →
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
