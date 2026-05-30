'use client'

import { useState } from 'react'
import { FileText, X, CalendarDays } from 'lucide-react'
import { formatDate } from '@/lib/utils'
import type { ContentPiece } from '@/lib/types'

interface ContentListProps {
  contentPieces: ContentPiece[]
}

export default function ContentList({ contentPieces: initial }: ContentListProps) {
  const [pieces, setPieces] = useState(initial)
  const [filter, setFilter] = useState('all')

  const filtered = filter === 'all' ? pieces : pieces.filter(p => p.status === filter)

  const updateStatus = (id: string, status: string) => {
    setPieces(prev => prev.map(p => p.id === id ? { ...p, status } : p))
  }

  const deletePiece = (id: string) => {
    setPieces(prev => prev.filter(p => p.id !== id))
  }

  return (
    <div>
      <div className='flex items-center justify-between mb-8'>
        <div>
          <h1 className='text-2xl font-bold'>Content</h1>
          <p className='text-gray-500 text-sm mt-1'>All generated content across your projects</p>
        </div>
        <div className='flex gap-2'>
          {['all', 'draft', 'scheduled', 'published'].map(s => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`text-xs px-3 py-1.5 border transition-colors ${
                filter === s ? 'bg-black text-white border-black' : 'border-gray-300 hover:border-gray-500'
              }`}
            >
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {pieces.length === 0 ? (
        <div className='border-2 border-dashed border-gray-300 p-12 text-center'>
          <FileText size={40} className='mx-auto mb-4 text-gray-300' />
          <h3 className='text-lg font-medium mb-2'>No content yet</h3>
          <p className='text-gray-500 text-sm'>Generate content from your project pages</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className='border-2 border-dashed border-gray-300 p-12 text-center'>
          <p className='text-gray-500 text-sm'>No content with status &quot;{filter}&quot;</p>
        </div>
      ) : (
        <div className='space-y-2'>
          {filtered.map((piece) => (
            <div key={piece.id} className='border border-gray-200 p-4 flex items-start justify-between gap-4'>
              <div className='flex-1'>
                <div className='flex items-center gap-2 mb-1'>
                  <span className={`text-xs px-2 py-0.5 ${
                    piece.status === 'published' ? 'bg-green-100 text-green-700' :
                    piece.status === 'scheduled' ? 'bg-blue-100 text-blue-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>{piece.status}</span>
                  <span className='text-xs bg-gray-100 px-2 py-0.5 uppercase'>{piece.channel}</span>
                  {piece.projects?.name && (
                    <span className='text-xs text-gray-400'>{piece.projects.name}</span>
                  )}
                </div>
                <p className='font-medium'>{piece.title}</p>
                <p className='text-xs text-gray-500 mt-1 line-clamp-2'>{piece.body}</p>
                <div className='flex items-center gap-3 mt-2'>
                  {piece.scheduled_at && (
                    <span className='text-xs text-gray-400 flex items-center gap-1'>
                      <CalendarDays size={12} />
                      {formatDate(piece.scheduled_at)}
                    </span>
                  )}
                  <span className='text-xs text-gray-400'>{formatDate(piece.created_at)}</span>
                </div>
              </div>
              <div className='flex items-center gap-2'>
                {piece.status === 'draft' && (
                  <button
                    onClick={() => updateStatus(piece.id, 'scheduled')}
                    className='text-xs px-3 py-1 bg-blue-100 text-blue-700 hover:bg-blue-200'
                  >
                    Schedule
                  </button>
                )}
                {piece.status === 'scheduled' && (
                  <button
                    onClick={() => updateStatus(piece.id, 'published')}
                    className='text-xs px-3 py-1 bg-green-100 text-green-700 hover:bg-green-200'
                  >
                    Publish
                  </button>
                )}
                <button onClick={() => deletePiece(piece.id)} className='text-gray-400 hover:text-red-500'>
                  <X size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
