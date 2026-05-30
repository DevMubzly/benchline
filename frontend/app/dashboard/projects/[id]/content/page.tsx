'use client'

import { useParams } from 'next/navigation'
import ContentList from '@/components/dashboard/ContentList'
import { MOCK_CONTENT, MOCK_PROJECTS } from '@/lib/mock'

export default function ProjectContentPage() {
  const params = useParams()
  const { id } = params as { id: string }

  const project = MOCK_PROJECTS.find(p => p.id === id)
  const contentPieces = MOCK_CONTENT.filter(c => c.project_id === id)

  return (
    <div>
      <div className='mb-6'>
        <h1 className='text-2xl font-bold'>{project?.name || 'Project'} Content</h1>
        <a href={`/dashboard/projects/${id}`} className='text-sm text-gray-500 underline'>Back to project</a>
      </div>
      <ContentList contentPieces={contentPieces} />
    </div>
  )
}
