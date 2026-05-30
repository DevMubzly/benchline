'use client'

import { useParams } from 'next/navigation'
import ProjectDetail from '@/components/dashboard/ProjectDetail'
import { MOCK_PROJECTS, MOCK_EVENTS, MOCK_CONTENT, MOCK_SUGGESTIONS } from '@/lib/mock'

export default function ProjectPage() {
  const params = useParams()
  const { id } = params as { id: string }

  const project = MOCK_PROJECTS.find(p => p.id === id)
  const events = MOCK_EVENTS.filter(e => e.project_id === id)
  const contentPieces = MOCK_CONTENT.filter(c => c.project_id === id)
  const suggestions = MOCK_SUGGESTIONS.filter(s => s.project_id === id)

  return (
    <ProjectDetail
      project={project || null}
      events={events}
      contentPieces={contentPieces}
      suggestions={suggestions}
    />
  )
}
