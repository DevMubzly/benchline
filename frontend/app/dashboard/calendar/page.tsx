'use client'

import CalendarView from '@/components/dashboard/CalendarView'
import { useProject } from '@/lib/project-context'
import { MOCK_CONTENT } from '@/lib/mock'

export default function CalendarPage() {
  const { selectedProjectId } = useProject()

  const scheduledPosts = MOCK_CONTENT
    .filter(c => c.status === 'scheduled' || c.status === 'published')
    .filter(c => selectedProjectId ? c.project_id === selectedProjectId : true)

  return (
    <CalendarView
      scheduledPosts={scheduledPosts}
    />
  )
}
