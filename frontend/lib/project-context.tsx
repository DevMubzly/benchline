'use client'

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'
import { MOCK_PROJECTS } from '@/lib/mock'
import type { Project } from '@/lib/types'

interface ProjectContextType {
  selectedProjectId: string | null
  setSelectedProjectId: (id: string | null) => void
  projects: Project[]
  selectedProject: Project | null
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined)

export function ProjectProvider({ children }: { children: ReactNode }) {
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null)

  const handleSetProject = useCallback((id: string | null) => {
    setSelectedProjectId(id)
  }, [])

  const selectedProject = selectedProjectId
    ? MOCK_PROJECTS.find(p => p.id === selectedProjectId) ?? null
    : null

  return (
    <ProjectContext.Provider value={{
      selectedProjectId,
      setSelectedProjectId: handleSetProject,
      projects: MOCK_PROJECTS,
      selectedProject,
    }}>
      {children}
    </ProjectContext.Provider>
  )
}

export function useProject() {
  const ctx = useContext(ProjectContext)
  if (!ctx) throw new Error('useProject must be used within ProjectProvider')
  return ctx
}
