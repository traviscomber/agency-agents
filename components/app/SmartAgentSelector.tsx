'use client'

import { useState, useEffect } from 'react'
import { Sparkles, Filter, Search } from 'lucide-react'
import { useAIStream } from '@/lib/hooks/useAI'

interface Agent {
  slug: string
  name: string
  description: string
  icon: string
  capability: string
  bestFor: string
}

interface Recommendation {
  agent: Agent
  score: number
  reasoning: string
}

export function SmartAgentSelector({ agents, onSelect }: { agents: Agent[], onSelect: (agent: Agent) => void }) {
  const [query, setQuery] = useState('')
  const [recommendations, setRecommendations] = useState<Recommendation[]>([])
  const [loading, setLoading] = useState(false)
  const { streamText } = useAIStream()

  const handleSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setRecommendations(agents.map(a => ({ agent: a, score: 0, reasoning: '' })))
      return
    }

    setLoading(true)
    try {
      const response = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: `User needs: "${searchQuery}"
          
          Available agents:
          ${agents.map(a => `- ${a.name} (${a.capability}): ${a.description}`).join('\n')}
          
          Rank these agents by relevance to the user's need. Return as JSON array with objects:
          { agentSlug: string, score: 0-100, reasoning: string }
          
          Be specific about why each agent is good for this use case.`,
          systemPrompt: 'You are an intelligent agent matching system. Help users find the perfect AI agent for their business need.'
        })
      })

      if (!response.ok) throw new Error('Failed to get recommendations')
      
      const data = await response.json()
      const parsed = JSON.parse(data.text)
      
      const recs = parsed.map((rec: any) => {
        const agent = agents.find(a => a.slug === rec.agentSlug)
        return agent ? { agent, score: rec.score, reasoning: rec.reasoning } : null
      }).filter(Boolean) as Recommendation[]
      
      setRecommendations(recs)
    } catch (err) {
      console.error('Failed to get recommendations:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      if (query) handleSearch(query)
    }, 500)
    return () => clearTimeout(timer)
  }, [query])

  const displayList = query && recommendations.length > 0 ? recommendations : agents.map(a => ({ agent: a, score: 0, reasoning: '' }))

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search agents (e.g., 'improve cash flow', 'hire better people')"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {loading && (
        <div className="flex items-center gap-2 text-gray-600">
          <Sparkles className="w-4 h-4 animate-spin" />
          <span className="text-sm">Finding perfect agent match...</span>
        </div>
      )}

      <div className="space-y-2">
        {displayList.map(({ agent, score, reasoning }) => (
          <button
            key={agent.slug}
            onClick={() => onSelect(agent)}
            className="w-full text-left p-4 border border-gray-200 rounded hover:border-blue-400 hover:bg-blue-50 transition"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-gray-900">{agent.name}</h3>
                <p className="text-sm text-gray-600 mt-1">{agent.description}</p>
                {reasoning && (
                  <p className="text-xs text-blue-600 mt-2">
                    <Sparkles className="w-3 h-3 inline mr-1" />
                    {reasoning}
                  </p>
                )}
              </div>
              {score > 0 && (
                <div className="text-right">
                  <div className="text-lg font-bold text-blue-600">{score}%</div>
                  <div className="text-xs text-gray-500">match</div>
                </div>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
