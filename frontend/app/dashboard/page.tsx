'use client'

import DashboardOverview from '@/components/dashboard/DashboardOverview'
import { useProject } from '@/lib/project-context'
import { MOCK_PROJECTS, MOCK_CONTENT, MOCK_EVENTS } from '@/lib/mock'

export default function DashboardHomePage() {
  const { selectedProjectId } = useProject()

  const contentPieces = selectedProjectId
    ? MOCK_CONTENT.filter(c => c.project_id === selectedProjectId)
    : MOCK_CONTENT

  const recentEvents = selectedProjectId
    ? MOCK_EVENTS.filter(e => e.project_id === selectedProjectId)
    : MOCK_EVENTS

  const projects = selectedProjectId
    ? MOCK_PROJECTS.filter(p => p.id === selectedProjectId)
    : MOCK_PROJECTS

  return (
    <DashboardOverview
      projects={projects}
      contentPieces={contentPieces}
      recentEvents={recentEvents}
    />
  )
}
