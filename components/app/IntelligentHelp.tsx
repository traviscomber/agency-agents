'use client'

import { useState } from 'react'
import { MessageCircle, Send, Loader } from 'lucide-react'
import { useAIStream } from '@/lib/hooks/useAI'
import { Button } from '@/components/shared/ButtonStyled'
import { Card } from '@/components/shared/CardStyled'
import { Eyebrow } from '@/components/shared/Typography'

export function IntelligentHelp() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant'; content: string }>>([])
  const [input, setInput] = useState('')
  const { stream, streaming, chunks } = useAIStream()

  const handleSendMessage = async () => {
    if (!input.trim()) return

    const userMessage = input
    setInput('')
    setMessages((prev) => [...prev, { role: 'user', content: userMessage }])

    try {
      await stream(userMessage, '/api/ai/help')
      const assistantMessage = chunks.join('')
      setMessages((prev) => [...prev, { role: 'assistant', content: assistantMessage }])
    } catch (error) {
      console.error('Failed to get help:', error)
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'Sorry, I encountered an error. Please try again.',
        },
      ])
    }
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 rounded-full bg-[#8fb2aa] text-white p-4 shadow-lg hover:bg-[#173634] transition-colors"
        aria-label="Get help"
      >
        <MessageCircle size={20} />
      </button>
    )
  }

  return (
    <div className="fixed bottom-6 right-6 z-40 w-96 max-h-96 flex flex-col rounded-lg shadow-xl bg-white border border-[#d8e5e2]">
      <div className="flex items-center justify-between p-4 border-b border-[#d8e5e2]">
        <Eyebrow className="text-[#173634]">AI Help</Eyebrow>
        <button
          onClick={() => setIsOpen(false)}
          className="text-[#a7b9b4] hover:text-[#173634]"
          aria-label="Close"
        >
          ✕
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.length === 0 ? (
          <div className="text-sm text-[#789b96] text-center py-8">
            <MessageCircle size={32} className="mx-auto mb-2 opacity-50" />
            <p>Ask me anything about N3uralia, your agents, or how to optimize your workflow.</p>
          </div>
        ) : (
          messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs px-3 py-2 rounded text-sm ${
                  msg.role === 'user'
                    ? 'bg-[#8fb2aa] text-white'
                    : 'bg-[#f1f6f4] text-[#173634]'
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))
        )}
        {streaming && (
          <div className="flex justify-start">
            <div className="bg-[#f1f6f4] text-[#173634] px-3 py-2 rounded text-sm flex items-center gap-1">
              <Loader size={14} className="animate-spin" />
              Thinking...
            </div>
          </div>
        )}
      </div>

      <div className="border-t border-[#d8e5e2] p-3 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Ask anything..."
          className="flex-1 h-9 border border-[#d8e5e2] bg-white px-3 text-sm text-[#173634] outline-none placeholder:text-[#a7b9b4] focus:border-[#8fb2aa] rounded"
          disabled={streaming}
        />
        <button
          onClick={handleSendMessage}
          disabled={streaming || !input.trim()}
          className="h-9 px-3 bg-[#8fb2aa] text-white text-sm font-medium rounded hover:bg-[#173634] disabled:opacity-50 transition-colors flex items-center justify-center"
        >
          <Send size={14} />
        </button>
      </div>
    </div>
  )
}
