'use client'

import { useState } from 'react'
import { Github, Key, ExternalLink } from 'lucide-react'

export default function SettingsPage() {
  const [githubToken, setGithubToken] = useState('')
  const [openaiKey, setOpenaiKey] = useState('')
  const [saved, setSaved] = useState(false)

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    localStorage.setItem('github_token', githubToken)
    localStorage.setItem('openai_key', openaiKey)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className='max-w-2xl'>
      <div className='mb-8'>
        <h1 className='text-2xl font-bold'>Settings</h1>
        <p className='text-gray-500 text-sm mt-1'>Configure your integrations and API keys</p>
      </div>

      <div className='space-y-8'>
        <div className='border border-black p-6'>
          <h2 className='font-bold mb-4 flex items-center gap-2'>
            <Github size={16} />
            GitHub Integration
          </h2>
          <p className='text-sm text-gray-500 mb-4'>
            Connect your GitHub to scan repos and monitor activity.
          </p>
          <div className='space-y-3'>
            <div>
              <label className='text-sm font-medium block mb-1'>Personal Access Token</label>
              <input
                type='password'
                value={githubToken}
                onChange={e => setGithubToken(e.target.value)}
                placeholder='ghp_...'
                className='w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-black'
              />
            </div>
            <a
              href='https://github.com/settings/tokens'
              target='_blank'
              className='text-xs text-gray-500 flex items-center gap-1 hover:text-black'
            >
              Generate a token on GitHub <ExternalLink size={10} />
            </a>
          </div>
        </div>

        <div className='border border-black p-6'>
          <h2 className='font-bold mb-4 flex items-center gap-2'>
            <Key size={16} />
            AI Provider
          </h2>
          <p className='text-sm text-gray-500 mb-4'>
            API key for content generation. Supports OpenAI or any LangChain-compatible provider.
          </p>
          <div>
            <label className='text-sm font-medium block mb-1'>OpenAI API Key</label>
            <input
              type='password'
              value={openaiKey}
              onChange={e => setOpenaiKey(e.target.value)}
              placeholder='sk-...'
              className='w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-black'
            />
          </div>
        </div>

        <button
          onClick={handleSave}
          className='bg-black text-white px-6 py-2 text-sm hover:bg-gray-800 transition-colors'
        >
          {saved ? 'Saved!' : 'Save Settings'}
        </button>
      </div>
    </div>
  )
}
