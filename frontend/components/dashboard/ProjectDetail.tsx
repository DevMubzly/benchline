'use client'

import { useState } from 'react'
import { Github, MessageCircle, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import { formatDate } from '@/lib/utils'
import ContentGenerator from './ContentGenerator'
import type { Project, ContentPiece, GitHubEvent, CommunitySuggestion } from '@/lib/types'

interface ProjectDetailProps {
  project: Project | null
  events: GitHubEvent[]
  contentPieces: ContentPiece[]
  suggestions: CommunitySuggestion[]
}

export default function ProjectDetail({ project, events, contentPieces, suggestions }: ProjectDetailProps) {
  const [activeTab, setActiveTab] = useState<'activity' | 'content' | 'community'>('activity')

  if (!project) return <div className='text-gray-400'>Project not found</div>

  return (
    <div>
      <div className='flex items-center justify-between mb-6'>
        <div>
          <div className='flex items-center gap-3'>
            <h1 className='text-2xl font-bold'>{project.name}</h1>
            <span className='text-xs bg-gray-100 px-2 py-1'>{project.status}</span>
          </div>
          <p className='text-gray-500 text-sm mt-1'>{project.description}</p>
        </div>
        <div className='flex items-center gap-3'>
          {project.repo_url && (
            <a href={project.repo_url} target='_blank' className='flex items-center gap-1 text-sm text-gray-600 hover:text-black'>
              <Github size={16} />
              <span>Repo</span>
              <ExternalLink size={12} />
            </a>
          )}
        </div>
      </div>

      <div className='flex gap-4 border-b border-black mb-6'>
        <button
          onClick={() => setActiveTab('activity')}
          className={`pb-2 text-sm font-medium ${activeTab === 'activity' ? 'border-b-2 border-black' : 'text-gray-400'}`}
        >
          Activity
        </button>
        <button
          onClick={() => setActiveTab('content')}
          className={`pb-2 text-sm font-medium ${activeTab === 'content' ? 'border-b-2 border-black' : 'text-gray-400'}`}
        >
          Content ({contentPieces.length})
        </button>
        <button
          onClick={() => setActiveTab('community')}
          className={`pb-2 text-sm font-medium ${activeTab === 'community' ? 'border-b-2 border-black' : 'text-gray-400'}`}
        >
          Communities
        </button>
      </div>

      {activeTab === 'activity' && (
        <div>
          <ContentGenerator projectId={project.id} projectName={project.name} />
          <div className='mt-6'>
            <h3 className='font-bold mb-3'>Recent GitHub Activity</h3>
            {events.length === 0 && <p className='text-gray-400 text-sm'>No activity yet. Push code to see events here.</p>}
            <div className='space-y-2'>
              {events.map((event) => (
                <div key={event.id} className='border border-gray-200 p-3 flex items-start gap-3'>
                  <div className='mt-0.5'>
                    {event.event_type === 'commit' && <div className='w-2 h-2 bg-green-500 mt-1.5' />}
                    {event.event_type === 'pr' && <div className='w-2 h-2 bg-blue-500 mt-1.5' />}
                    {event.event_type === 'release' && <div className='w-2 h-2 bg-purple-500 mt-1.5' />}
                  </div>
                  <div className='flex-1'>
                    <div className='flex items-center gap-2'>
                      <span className='text-xs bg-gray-100 px-1.5 py-0.5 uppercase'>{event.event_type}</span>
                      <span className='text-sm font-medium'>{event.title}</span>
                    </div>
                    <p className='text-xs text-gray-500 mt-1'>{event.description}</p>
                    <p className='text-xs text-gray-400 mt-1'>{formatDate(event.created_at)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'content' && (
        <div>
          <div className='flex items-center justify-between mb-4'>
            <h3 className='font-bold'>Generated Content</h3>
            <Link href={`/projects/${project.id}/content`} className='text-sm text-black underline'>Manage All</Link>
          </div>
          {contentPieces.length === 0 && <p className='text-gray-400 text-sm'>Use the generator above to create content.</p>}
          <div className='grid grid-cols-2 gap-3'>
            {contentPieces.map((piece) => (
              <div key={piece.id} className='border border-gray-200 p-4'>
                <div className='flex items-center gap-2 mb-2'>
                  <span className={`text-xs px-2 py-0.5 ${
                    piece.status === 'published' ? 'bg-green-100 text-green-700' :
                    piece.status === 'scheduled' ? 'bg-blue-100 text-blue-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>{piece.status}</span>
                  <span className='text-xs bg-gray-100 px-2 py-0.5 uppercase'>{piece.channel}</span>
                </div>
                <p className='font-medium text-sm mb-1'>{piece.title}</p>
                <p className='text-xs text-gray-500 line-clamp-2'>{piece.body}</p>
                <p className='text-xs text-gray-400 mt-2'>{formatDate(piece.created_at)}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'community' && (
        <div>
          <h3 className='font-bold mb-4'>Suggested Communities</h3>
          {suggestions.length === 0 && <p className='text-gray-400 text-sm'>No suggestions yet.</p>}
          <div className='grid grid-cols-2 gap-3'>
            {suggestions.map((s) => (
              <div key={s.id} className='border border-gray-200 p-4'>
                <div className='flex items-center gap-2 mb-2'>
                  <MessageCircle size={14} />
                  <span className='text-xs bg-gray-100 px-2 py-0.5 uppercase'>{s.platform}</span>
                </div>
                <p className='font-medium text-sm'>{s.name}</p>
                <p className='text-xs text-gray-500 mt-1'>{s.reason}</p>
                {s.url && (
                  <a href={s.url} target='_blank' className='text-xs text-black underline mt-2 inline-block'>Visit</a>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
