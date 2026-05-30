'use client'

import { useState } from 'react'
import { X } from 'lucide-react'

interface ConnectProjectModalProps {
  onClose: () => void
}

export default function ConnectProjectModal({ onClose }: ConnectProjectModalProps) {
  const [name, setName] = useState('')
  const [repoUrl, setRepoUrl] = useState('')
  const [description, setDescription] = useState('')
  const [websiteUrl, setWebsiteUrl] = useState('')
  const [saving, setSaving] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    await new Promise(r => setTimeout(r, 500))
    setSaving(false)
    onClose()
  }

  return (
    <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50' onClick={onClose}>
      <div className='bg-white p-6 w-full max-w-md' onClick={e => e.stopPropagation()}>
        <div className='flex items-center justify-between mb-4'>
          <h2 className='text-lg font-bold'>Connect Project</h2>
          <button onClick={onClose} className='text-gray-400 hover:text-black'><X size={18} /></button>
        </div>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <label className='text-sm font-medium block mb-1'>GitHub Repo URL</label>
            <input
              type='text'
              value={repoUrl}
              onChange={e => setRepoUrl(e.target.value)}
              placeholder='https://github.com/username/repo'
              className='w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-black'
              required
            />
          </div>
          <div>
            <label className='text-sm font-medium block mb-1'>Display Name</label>
            <input
              type='text'
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder='My Awesome App'
              className='w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-black'
            />
          </div>
          <div>
            <label className='text-sm font-medium block mb-1'>Description</label>
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder='What does this project do?'
              rows={3}
              className='w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-black'
            />
          </div>
          <div>
            <label className='text-sm font-medium block mb-1'>Website URL</label>
            <input
              type='text'
              value={websiteUrl}
              onChange={e => setWebsiteUrl(e.target.value)}
              placeholder='https://myapp.com'
              className='w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-black'
            />
          </div>
          <button
            type='submit'
            disabled={saving}
            className='w-full bg-black text-white py-2 text-sm hover:bg-gray-800 transition-colors disabled:opacity-50'
          >
            {saving ? 'Connecting...' : 'Connect Project'}
          </button>
        </form>
      </div>
    </div>
  )
}
