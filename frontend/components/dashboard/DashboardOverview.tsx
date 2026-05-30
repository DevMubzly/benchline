'use client'

import { Plus, FileText, GitCommit, TrendingUp } from 'lucide-react'
import Link from 'next/link'
import { formatDate } from '@/lib/utils'
import type { Project, ContentPiece, GitHubEvent } from '@/lib/types'

interface DashboardOverviewProps {
  projects: Project[]
  contentPieces: ContentPiece[]
  recentEvents: GitHubEvent[]
}

export default function DashboardOverview({ projects, contentPieces, recentEvents }: DashboardOverviewProps) {
  const publishedCount = contentPieces.filter(p => p.status === 'published').length
  const draftCount = contentPieces.filter(p => p.status === 'draft').length
  const scheduledCount = contentPieces.filter(p => p.status === 'scheduled').length

  return (
    <div>
      <div className='flex items-center justify-between mb-8'>
        <div>
          <h1 className='text-2xl font-bold'>Dashboard</h1>
          <p className='text-muted-foreground text-sm mt-1'>Your content operating system</p>
        </div>
        <Link href='/projects' className='flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 text-sm hover:bg-primary/90 transition-colors'>
          <Plus size={16} />
          Add Project
        </Link>
      </div>

      <div className='grid grid-cols-4 gap-4 mb-8'>
        <div className='border border-border p-4'>
          <div className='flex items-center gap-2 text-muted-foreground text-sm mb-2'>
            <GitCommit size={14} />
            Projects
          </div>
          <div className='text-3xl font-bold'>{projects.length}</div>
        </div>
        <div className='border border-border p-4'>
          <div className='flex items-center gap-2 text-muted-foreground text-sm mb-2'>
            <FileText size={14} />
            Published
          </div>
          <div className='text-3xl font-bold'>{publishedCount}</div>
        </div>
        <div className='border border-border p-4'>
          <div className='flex items-center gap-2 text-muted-foreground text-sm mb-2'>
            <FileText size={14} />
            Drafts
          </div>
          <div className='text-3xl font-bold'>{draftCount}</div>
        </div>
        <div className='border border-border p-4'>
          <div className='flex items-center gap-2 text-muted-foreground text-sm mb-2'>
            <TrendingUp size={14} />
            Scheduled
          </div>
          <div className='text-3xl font-bold'>{scheduledCount}</div>
        </div>
      </div>

      <div className='grid grid-cols-2 gap-6'>
        <div>
          <h2 className='font-bold text-lg mb-4 border-b border-border pb-2'>Recent GitHub Activity</h2>
          <div className='space-y-3'>
            {recentEvents.length === 0 && (
              <p className='text-muted-foreground text-sm'>No activity yet. Connect a project to get started.</p>
            )}
            {recentEvents.map((event) => (
              <div key={event.id} className='border border-border p-3'>
                <div className='flex items-center gap-2 mb-1'>
                  <span className='text-xs bg-muted px-2 py-0.5 uppercase'>{event.event_type}</span>
                  <span className='text-sm font-medium'>{event.title}</span>
                </div>
                <p className='text-xs text-muted-foreground'>{event.description?.slice(0, 100)}</p>
                <p className='text-xs text-muted-foreground mt-1'>{formatDate(event.created_at)}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className='font-bold text-lg mb-4 border-b border-border pb-2'>Recent Content</h2>
          <div className='space-y-3'>
            {contentPieces.length === 0 && (
              <p className='text-muted-foreground text-sm'>No content yet. Generate content from your projects.</p>
            )}
            {contentPieces.slice(0, 5).map((piece) => (
              <div key={piece.id} className='border border-border p-3'>
                <div className='flex items-center gap-2 mb-1'>
                  <span className={`text-xs px-2 py-0.5 uppercase ${
                    piece.status === 'published' ? 'bg-green-100 text-green-700' :
                    piece.status === 'scheduled' ? 'bg-blue-100 text-blue-700' :
                    'bg-muted text-foreground'
                  }`}>{piece.status}</span>
                  <span className='text-xs bg-muted px-2 py-0.5 uppercase'>{piece.channel}</span>
                </div>
                <p className='text-sm font-medium'>{piece.title}</p>
                <p className='text-xs text-muted-foreground mt-1'>{piece.body?.slice(0, 80)}...</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
