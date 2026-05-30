'use client'

import { useState, useEffect, useRef } from 'react'
import { Search, X, FileText, Github, GitCommit } from 'lucide-react'
import Link from 'next/link'
import { MOCK_PROJECTS, MOCK_CONTENT, MOCK_EVENTS } from '@/lib/mock'

interface SearchModalProps {
  onClose: () => void
}

export default function SearchModal({ onClose }: SearchModalProps) {
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [onClose])

  const q = query.toLowerCase().trim()

  const matchedProjects = q ? MOCK_PROJECTS.filter(p =>
    p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
  ) : []

  const matchedContent = q ? MOCK_CONTENT.filter(c =>
    c.title.toLowerCase().includes(q) || c.body.toLowerCase().includes(q)
  ) : []

  const matchedEvents = q ? MOCK_EVENTS.filter(e =>
    e.title.toLowerCase().includes(q) || e.description.toLowerCase().includes(q)
  ) : []

  const hasResults = matchedProjects.length > 0 || matchedContent.length > 0 || matchedEvents.length > 0

  return (
    <div className='fixed inset-0 bg-black/50 flex items-start justify-center pt-[15vh] z-50' onClick={onClose}>
      <div className='bg-card w-full max-w-lg border border-border shadow-lg' onClick={e => e.stopPropagation()}>
        <div className='flex items-center border-b border-border px-4'>
          <Search size={16} className='text-muted-foreground mr-3 shrink-0' />
          <input
            ref={inputRef}
            type='text'
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder='Search projects, content, events...'
            className='flex-1 py-4 text-sm focus:outline-none'
          />
          {query && (<>
            <button onClick={() => setQuery('')} className='text-muted-foreground hover:text-foreground mr-2'>
              <X size={14} />
            </button>
            <button onClick={onClose} className='text-muted-foreground hover:text-foreground'>
              <X size={16} />
            </button>
          </>)}
        </div>

        {!q && (
          <div className='p-8 text-center'>
            <Search size={32} className='mx-auto mb-3 text-muted-foreground/30' />
            <p className='text-muted-foreground text-sm'>Type to search across projects, content, and activity</p>
          </div>
        )}

        {q && !hasResults && (
          <div className='p-8 text-center'>
            <p className='text-muted-foreground text-sm'>No results for &quot;{query}&quot;</p>
          </div>
        )}

        {q && hasResults && (
          <div className='max-h-80 overflow-y-auto p-2 space-y-1'>
            {matchedProjects.length > 0 && (
              <div>
                <p className='text-xs text-muted-foreground px-2 py-1 font-medium'>Projects</p>
                {matchedProjects.map(p => (
                  <Link
                    key={p.id}
                    href={`/dashboard/projects/${p.id}`}
                    onClick={onClose}
                    className='flex items-center gap-3 px-2 py-2 hover:bg-accent text-sm'
                  >
                    <Github size={14} className='text-muted-foreground shrink-0' />
                    <div className='min-w-0'>
                      <p className='font-medium truncate'>{p.name}</p>
                      <p className='text-xs text-muted-foreground truncate'>{p.description}</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {matchedContent.length > 0 && (
              <div>
                <p className='text-xs text-muted-foreground px-2 py-1 font-medium'>Content</p>
                {matchedContent.map(c => (
                  <Link
                    key={c.id}
                    href={`/dashboard/projects/${c.project_id}`}
                    onClick={onClose}
                    className='flex items-center gap-3 px-2 py-2 hover:bg-accent text-sm'
                  >
                    <FileText size={14} className='text-muted-foreground shrink-0' />
                    <div className='min-w-0'>
                      <p className='font-medium truncate'>{c.title}</p>
                      <p className='text-xs text-muted-foreground truncate'>{c.body.slice(0, 80)}</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {matchedEvents.length > 0 && (
              <div>
                <p className='text-xs text-muted-foreground px-2 py-1 font-medium'>Activity</p>
                {matchedEvents.map(e => (
                  <div key={e.id} className='flex items-center gap-3 px-2 py-2 text-sm'>
                    <GitCommit size={14} className='text-muted-foreground shrink-0' />
                    <div className='min-w-0'>
                      <p className='font-medium truncate'>{e.title}</p>
                      <p className='text-xs text-muted-foreground truncate'>{e.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
