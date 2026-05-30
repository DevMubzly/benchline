export interface Project {
  id: string
  name: string
  description: string
  repo_url: string
  website_url: string
  status: string
  created_at: string
}

export interface ContentPiece {
  id: string
  project_id: string
  projects?: { name: string }
  title: string
  body: string
  channel: string
  status: string
  scheduled_at: string | null
  published_at: string | null
  reasoning: string
  predicted_engagement: string
  created_at: string
}

export interface GitHubEvent {
  id: string
  project_id: string
  event_type: string
  title: string
  description: string
  url: string
  analyzed: boolean
  created_at: string
}

export interface Notification {
  id: string
  type: 'release' | 'published' | 'pr' | 'scheduled' | 'commit'
  title: string
  body: string
  read: boolean
  created_at: string
}

export interface CommunitySuggestion {
  id: string
  project_id: string
  platform: string
  name: string
  url: string
  reason: string
  relevance_score: number
  created_at: string
}
