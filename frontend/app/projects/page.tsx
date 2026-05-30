'use client'

import { useState } from 'react'
import { Plus, Github, ExternalLink, Trash2 } from 'lucide-react'
import Link from 'next/link'
import ConnectProjectModal from '@/components/dashboard/ConnectProjectModal'
import { MOCK_PROJECTS } from '@/lib/mock'

export default function ProjectsPage() {
  const [projects, setProjects] = useState(MOCK_PROJECTS)
  const [showModal, setShowModal] = useState(false)

  const deleteProject = (id: string) => {
    setProjects(prev => prev.filter(p => p.id !== id))
  }

  return (
    <div>
      <div className='flex items-center justify-between mb-8'>
        <div>
          <h1 className='text-2xl font-bold'>Projects</h1>
          <p className='text-gray-500 text-sm mt-1'>Your startups and apps — each gets its own content pipeline</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className='flex items-center gap-2 bg-black text-white px-4 py-2 text-sm hover:bg-gray-800 transition-colors'
        >
          <Plus size={16} />
          Connect Project
        </button>
      </div>

      {projects.length === 0 ? (
        <div className='border-2 border-dashed border-gray-300 p-12 text-center'>
          <Github size={40} className='mx-auto mb-4 text-gray-300' />
          <h3 className='text-lg font-medium mb-2'>No projects yet</h3>
          <p className='text-gray-500 text-sm mb-4'>Connect a GitHub repo to start generating content</p>
          <button
            onClick={() => setShowModal(true)}
            className='bg-black text-white px-6 py-2 text-sm hover:bg-gray-800 transition-colors'
          >
            Connect Your First Project
          </button>
        </div>
      ) : (
        <div className='grid grid-cols-3 gap-4'>
          {projects.map((project) => (
            <div key={project.id} className='border border-black p-5 hover:shadow-md transition-shadow'>
              <Link href={`/projects/${project.id}`} className='block'>
                <div className='flex items-center gap-2 mb-3'>
                  <Github size={18} />
                  <h3 className='font-bold text-lg'>{project.name}</h3>
                </div>
                <p className='text-sm text-gray-500 mb-3 line-clamp-2'>{project.description}</p>
                {project.repo_url && (
                  <div className='flex items-center gap-1 text-xs text-gray-400 mb-3'>
                    <ExternalLink size={12} />
                    {project.repo_url.replace('https://github.com/', '')}
                  </div>
                )}
              </Link>
              <div className='flex items-center justify-between pt-3 border-t border-gray-100'>
                <Link href={`/projects/${project.id}/content`} className='text-xs text-black underline'>
                  View Content
                </Link>
                <button
                  onClick={() => deleteProject(project.id)}
                  className='text-gray-400 hover:text-red-500 transition-colors'
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && <ConnectProjectModal onClose={() => setShowModal(false)} />}
    </div>
  )
}
