import DashboardOverview from '@/components/dashboard/DashboardOverview'
import { MOCK_PROJECTS, MOCK_CONTENT, MOCK_EVENTS } from '@/lib/mock'

export default function HomePage() {
  return (
    <DashboardOverview
      projects={MOCK_PROJECTS}
      contentPieces={MOCK_CONTENT}
      recentEvents={MOCK_EVENTS}
    />
  )
}
