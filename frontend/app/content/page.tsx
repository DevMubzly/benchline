'use client'

import ContentList from '@/components/dashboard/ContentList'
import { MOCK_CONTENT } from '@/lib/mock'

export default function ContentPage() {
  return <ContentList contentPieces={MOCK_CONTENT} />
}
