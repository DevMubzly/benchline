'use client'

import CalendarView from '@/components/dashboard/CalendarView'
import { MOCK_CONTENT } from '@/lib/mock'

export default function CalendarPage() {
  const scheduledPosts = MOCK_CONTENT.filter(c => c.status === 'scheduled' || c.status === 'published')

  return (
    <CalendarView
      scheduledPosts={scheduledPosts}
    />
  )
}
