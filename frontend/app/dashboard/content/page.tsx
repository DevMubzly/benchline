'use client'

import ContentList from '@/components/dashboard/ContentList'
import { useProject } from '@/lib/project-context'
import { MOCK_CONTENT } from '@/lib/mock'

export default function ContentPage() {
  const { selectedProjectId } = useProject()

  const contentPieces = selectedProjectId
    ? MOCK_CONTENT.filter(c => c.project_id === selectedProjectId)
    : MOCK_CONTENT

  return <ContentList contentPieces={contentPieces} />
}
