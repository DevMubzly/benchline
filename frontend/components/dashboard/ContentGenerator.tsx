'use client'

import { useState } from 'react'
import { Sparkles } from 'lucide-react'
import type { ContentPiece } from '@/lib/types'

interface ContentGeneratorProps {
  projectId: string
  projectName: string
}

const channels = [
  { id: 'x', label: 'X / Twitter' },
  { id: 'linkedin', label: 'LinkedIn' },
  { id: 'telegram', label: 'Telegram' },
  { id: 'blog', label: 'Blog Post' },
  { id: 'reddit', label: 'Reddit' },
  { id: 'video', label: 'Video Script' },
]

export default function ContentGenerator({ projectId, projectName }: ContentGeneratorProps) {
  const [topic, setTopic] = useState('')
  const [channel, setChannel] = useState('x')
  const [tone, setTone] = useState('casual')
  const [generating, setGenerating] = useState(false)
  const [result, setResult] = useState('')
  const [contentList, setContentList] = useState<ContentPiece[]>([])

  const handleGenerate = async () => {
    setGenerating(true)
    setResult('')

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projectName, topic, channel, tone }),
      })
      const data = await res.json()
      setResult(data.content || 'No content generated')
    } catch {
      setResult('Failed to generate content.')
    }

    setGenerating(false)
  }

  const handleSave = () => {
    const newPiece = {
      id: `mock-${Date.now()}`,
      project_id: projectId,
      projects: { name: projectName },
      title: topic || `Post about ${projectName}`,
      body: result,
      channel,
      status: 'draft',
      scheduled_at: null,
      published_at: null,
      reasoning: '',
      predicted_engagement: '',
      created_at: new Date().toISOString(),
    }
    setContentList(prev => [newPiece, ...prev])
    setResult('')
    setTopic('')
  }

  return (
    <div className='border border-border p-5'>
      <h3 className='font-bold mb-4 flex items-center gap-2'>
        <Sparkles size={16} />
        Generate Content
      </h3>
      <div className='space-y-4'>
        <div>
          <label className='text-sm font-medium block mb-1'>What do you want to talk about?</label>
          <input
            type='text'
            value={topic}
            onChange={e => setTopic(e.target.value)}
            placeholder='e.g., just shipped a new auth system, or leave blank for suggestion...'
            className='w-full border border-input px-3 py-2 text-sm focus:outline-none focus:border-foreground'
          />
        </div>
        <div className='grid grid-cols-6 gap-2'>
          {channels.map(ch => (
            <button
              key={ch.id}
              onClick={() => setChannel(ch.id)}
              className={`text-xs px-3 py-2 border transition-colors ${
                channel === ch.id ? 'bg-primary text-primary-foreground border-primary' : 'border-input hover:border-muted-foreground'
              }`}
            >
              {ch.label}
            </button>
          ))}
        </div>
        <div className='flex items-center gap-4'>
          <div>
            <label className='text-xs text-muted-foreground block mb-1'>Tone</label>
            <select
              value={tone}
              onChange={e => setTone(e.target.value)}
              className='border border-input px-3 py-2 text-sm focus:outline-none'
            >
              <option value='casual'>Casual</option>
              <option value='professional'>Professional</option>
              <option value='storytelling'>Storytelling</option>
              <option value='technical'>Technical</option>
              <option value='hype'>Hype / Hustle</option>
            </select>
          </div>
          <button
            onClick={handleGenerate}
            disabled={generating}
            className='bg-primary text-primary-foreground px-6 py-2 text-sm hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center gap-2'
          >
            <Sparkles size={14} />
            {generating ? 'Generating...' : 'Generate'}
          </button>
        </div>

        {result && (
          <div className='border border-border p-4'>
            <div className='text-sm whitespace-pre-wrap mb-3'>{result}</div>
            <div className='flex items-center gap-3'>
              <button
                onClick={handleSave}
                className='bg-primary text-primary-foreground px-4 py-1.5 text-xs hover:bg-primary/90'
              >
                Save as Draft
              </button>
              <button
                onClick={() => setResult('')}
                className='text-xs text-muted-foreground hover:text-foreground'
              >
                Discard
              </button>
            </div>
          </div>
        )}

        {contentList.length > 0 && (
          <div className='mt-4'>
            <h4 className='font-bold text-sm mb-2'>Generated in this session:</h4>
            <div className='space-y-2'>
              {contentList.map((piece) => (
                <div key={piece.id} className='border border-border p-3 text-sm'>
                  <div className='flex items-center gap-2 mb-1'>
                    <span className='text-xs bg-muted px-1.5 py-0.5 uppercase'>{piece.channel}</span>
                    <span className='text-xs bg-yellow-100 text-yellow-700 px-1.5 py-0.5 uppercase'>draft</span>
                  </div>
                  <p className='font-medium'>{piece.title}</p>
                  <p className='text-xs text-muted-foreground mt-1 line-clamp-2'>{piece.body}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
