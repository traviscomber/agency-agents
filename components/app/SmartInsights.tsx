'use client'

import { useEffect, useState } from 'react'
import { Sparkles, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react'
import { Card } from '@/components/shared/CardStyled'
import { Badge } from '@/components/shared/BadgeStyled'
import { Body, Eyebrow } from '@/components/shared/Typography'

interface Insight {
  type: 'recommendation' | 'alert' | 'opportunity' | 'success'
  title: string
  description: string
  action?: {
    label: string
    href: string
  }
}

export function SmartInsights() {
  const [insights, setInsights] = useState<Insight[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch AI-generated insights from your API
    // This would analyze user data and provide smart recommendations
    setInsights([
      {
        type: 'opportunity',
        title: 'High-Impact Agent Available',
        description:
          'Based on your team size and industry, Cobranza agent could save you ~$45K/year in DSO reduction.',
        action: {
          label: 'Explore Agent',
          href: '/app/agents/cobranza',
        },
      },
      {
        type: 'recommendation',
        title: 'Optimize Your Workflow',
        description:
          'Your current setup has 3 bottlenecks. AI recommends automating the bid approval process.',
        action: {
          label: 'View Plan',
          href: '/app/workflows',
        },
      },
      {
        type: 'success',
        title: 'Great Progress!',
        description:
          'You\'ve saved 24 hours this month. Continue with your current pace to hit 100 hours saved by month end.',
      },
    ])
    setLoading(false)
  }, [])

  const getIcon = (type: Insight['type']) => {
    switch (type) {
      case 'alert':
        return <AlertCircle size={16} className="text-red-500" />
      case 'success':
        return <CheckCircle size={16} className="text-green-500" />
      case 'opportunity':
        return <TrendingUp size={16} className="text-blue-500" />
      default:
        return <Sparkles size={16} className="text-[#8fb2aa]" />
    }
  }

  const getBgColor = (type: Insight['type']) => {
    switch (type) {
      case 'alert':
        return 'bg-red-50 border-red-200'
      case 'success':
        return 'bg-green-50 border-green-200'
      case 'opportunity':
        return 'bg-blue-50 border-blue-200'
      default:
        return 'bg-[#f1f6f4] border-[#d8e5e2]'
    }
  }

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} variant="light" className="p-4 animate-pulse">
            <div className="h-4 bg-[#d8e5e2] rounded w-1/3 mb-2"></div>
            <div className="h-3 bg-[#d8e5e2] rounded w-2/3"></div>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-6">
        <Sparkles size={18} className="text-[#8fb2aa]" />
        <Eyebrow className="text-[#789b96]">AI-Powered Insights</Eyebrow>
      </div>

      {insights.map((insight, idx) => (
        <Card
          key={idx}
          variant="light"
          className={`p-4 border ${getBgColor(insight.type)}`}
        >
          <div className="flex gap-3">
            <div className="mt-0.5 shrink-0">{getIcon(insight.type)}</div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-[#173634]">{insight.title}</p>
              <Body variant="light" className="mt-1 text-xs">
                {insight.description}
              </Body>
              {insight.action && (
                <a
                  href={insight.action.href}
                  className="mt-2 inline-block text-xs font-medium text-[#8fb2aa] hover:text-[#173634]"
                >
                  {insight.action.label} →
                </a>
              )}
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
