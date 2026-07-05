import { useCallback, useState } from 'react'

export interface UseAIOptions {
  onStart?: () => void
  onComplete?: (result: string) => void
  onError?: (error: Error) => void
}

/**
 * Hook for intelligent AI interactions in React components
 * Handles loading states, errors, and result management
 */
export function useAI(options: UseAIOptions = {}) {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<string | null>(null)
  const [error, setError] = useState<Error | null>(null)

  const generate = useCallback(
    async (prompt: string, endpoint: string = '/api/ai/generate') => {
      setLoading(true)
      setError(null)
      setResult(null)

      try {
        options.onStart?.()

        const response = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt }),
        })

        if (!response.ok) {
          throw new Error(`AI generation failed: ${response.statusText}`)
        }

        const data = await response.json()
        setResult(data.result)
        options.onComplete?.(data.result)

        return data.result
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err))
        setError(error)
        options.onError?.(error)
        throw error
      } finally {
        setLoading(false)
      }
    },
    [options]
  )

  const recommend = useCallback(
    async (context: Record<string, any>) => {
      return generate(
        JSON.stringify(context),
        '/api/ai/recommend-agents'
      )
    },
    [generate]
  )

  const analyze = useCallback(
    async (data: Record<string, any>, type: string) => {
      return generate(
        JSON.stringify({ data, type }),
        '/api/ai/analyze'
      )
    },
    [generate]
  )

  const planProject = useCallback(
    async (goal: string, constraints: Record<string, any>) => {
      return generate(
        JSON.stringify({ goal, constraints }),
        '/api/ai/plan-project'
      )
    },
    [generate]
  )

  return {
    loading,
    result,
    error,
    generate,
    recommend,
    analyze,
    planProject,
  }
}

/**
 * Hook for streaming AI responses
 */
export function useAIStream() {
  const [streaming, setStreaming] = useState(false)
  const [chunks, setChunks] = useState<string[]>([])
  const [error, setError] = useState<Error | null>(null)

  const stream = useCallback(async (prompt: string, endpoint: string = '/api/ai/stream') => {
    setStreaming(true)
    setError(null)
    setChunks([])

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      })

      if (!response.ok) {
        throw new Error(`Stream failed: ${response.statusText}`)
      }

      const reader = response.body?.getReader()
      if (!reader) throw new Error('No response body')

      const decoder = new TextDecoder()
      let buffer = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split('\n')
        buffer = lines.pop() || ''

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.slice(6))
              if (data.chunk) {
                setChunks((prev) => [...prev, data.chunk])
              }
            } catch {
              // Skip invalid JSON
            }
          }
        }
      }
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err))
      setError(error)
      throw error
    } finally {
      setStreaming(false)
    }
  }, [])

  return {
    streaming,
    chunks,
    error,
    stream,
    fullText: chunks.join(''),
  }
}
