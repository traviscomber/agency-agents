'use client'

import { useState, useEffect } from 'react'
import { Sparkles, Zap, TrendingUp, AlertTriangle } from 'lucide-react'
import { useAIStream } from '@/lib/hooks/useAI'

interface ProjectAnalysis {
  summary: string
  bottleneck: string
  recommendation: string
  estimatedROI: string
  urgency: 'high' | 'medium' | 'low'
}

export function SmartProjectAnalyzer({ projectName, description }: { projectName: string, description?: string }) {
  const [analysis, setAnalysis] = useState<ProjectAnalysis | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { streamText } = useAIStream()

  useEffect(() => {
    const analyze = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/ai/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            prompt: `Analyze this AgencyOS project and provide strategic insights:
            Project: ${projectName}
            Description: ${description || 'General business project'}
            
            Return JSON with:
            { 
              summary: brief project health assessment,
              bottleneck: the biggest challenge or inefficiency,
              recommendation: specific AI agent or process improvement,
              estimatedROI: expected return if recommendation implemented,
              urgency: 'high'|'medium'|'low'
            }
            
            Focus on concrete, actionable improvements for Chilean SMBs.`,
            systemPrompt: 'You are a business operations analyst for N3uralia AgencyOS. Provide specific, data-driven project analysis.'
          })
        })

        if (!response.ok) throw new Error('Failed to analyze project')
        
        const data = await response.json()
        const parsed = JSON.parse(data.text)
        setAnalysis(parsed)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Analysis failed')
      } finally {
        setLoading(false)
      }
    }

    analyze()
  }, [projectName, description])

  const urgencyColors = {
    high: 'text-red-600 bg-red-50 border-red-200',
    medium: 'text-yellow-600 bg-yellow-50 border-yellow-200',
    low: 'text-green-600 bg-green-50 border-green-200'
  }

  const urgencyIcons = {
    high: <AlertTriangle className="w-4 h-4" />,
    medium: <Zap className="w-4 h-4" />,
    low: <TrendingUp className="w-4 h-4" />
  }

  return (
    <div className="space-y-4">
      {loading && (
        <div className="p-4 bg-blue-50 border border-blue-200 rounded flex items-center gap-2">
          <Sparkles className="w-4 h-4 animate-spin text-blue-600" />
          <span className="text-sm text-blue-900">Analyzing project with AI...</span>
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded text-sm text-red-900">
          {error}
        </div>
      )}

      {!loading && analysis && (
        <div className="space-y-3">
          <div className="p-4 bg-gray-50 border border-gray-200 rounded">
            <h3 className="font-semibold text-gray-900 text-sm mb-2">Project Health</h3>
            <p className="text-sm text-gray-700">{analysis.summary}</p>
          </div>

          <div className="p-4 bg-amber-50 border border-amber-200 rounded">
            <h3 className="font-semibold text-amber-900 text-sm mb-2">Key Bottleneck</h3>
            <p className="text-sm text-amber-900">{analysis.bottleneck}</p>
          </div>

          <div className="p-4 bg-blue-50 border border-blue-200 rounded">
            <h3 className="font-semibold text-blue-900 text-sm mb-2">Recommended Action</h3>
            <p className="text-sm text-blue-900 mb-2">{analysis.recommendation}</p>
            <div className="text-xs font-semibold text-blue-700 bg-blue-100 px-2 py-1 rounded w-fit">
              Est. ROI: {analysis.estimatedROI}
            </div>
          </div>

          <div className={`p-3 border rounded flex items-center gap-2 ${urgencyColors[analysis.urgency]}`}>
            {urgencyIcons[analysis.urgency]}
            <span className="text-xs font-semibold capitalize">
              {analysis.urgency} Priority
            </span>
          </div>
        </div>
      )}
    </div>
  )
}
