'use client'

import { useState } from 'react'
import { Github, Key, LogOut, User } from 'lucide-react'
import { useAuth } from '@/lib/auth-context'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export default function SettingsPage() {
  const { user, profile, logout } = useAuth()
  const [openaiKey, setOpenaiKey] = useState('')
  const [saved, setSaved] = useState(false)

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    localStorage.setItem('openai_key', openaiKey)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className='max-w-2xl mx-auto'>
      <div className='mb-8'>
        <h1 className='text-2xl font-bold'>Settings</h1>
        <p className='text-muted-foreground text-sm mt-1'>Configure your integrations and API keys</p>
      </div>

      <div className='space-y-8'>
        <div className='border border-border p-6'>
          <h2 className='font-bold mb-4 flex items-center gap-2'>
            <User size={16} />
            Account
          </h2>
          <div className='flex items-center gap-4'>
            <Avatar className='w-12 h-12'>
              <AvatarImage src={profile?.avatar_url || user?.user_metadata?.avatar_url || ''} />
              <AvatarFallback>{(profile?.username || user?.user_metadata?.user_name || '?').charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <p className='font-medium'>{profile?.full_name || user?.user_metadata?.full_name || user?.email}</p>
              <p className='text-sm text-muted-foreground'>@{profile?.username || user?.user_metadata?.user_name}</p>
              {profile?.bio && <p className='text-xs text-muted-foreground mt-1'>{profile.bio}</p>}
            </div>
          </div>
          <button
            onClick={logout}
            className='mt-4 flex items-center gap-2 text-sm text-red-500 hover:text-red-700 transition-colors'
          >
            <LogOut size={14} />
            Sign out
          </button>
        </div>

        <div className='border border-border p-6'>
          <h2 className='font-bold mb-4 flex items-center gap-2'>
            <Github size={16} />
            GitHub
          </h2>
          <p className='text-sm text-green-600 flex items-center gap-2'>
            Connected as @{profile?.username || user?.user_metadata?.user_name}
          </p>
        </div>

        <div className='border border-border p-6'>
          <h2 className='font-bold mb-4 flex items-center gap-2'>
            <Key size={16} />
            AI Provider
          </h2>
          <p className='text-sm text-muted-foreground mb-4'>
            API key for content generation. Supports OpenAI or any LangChain-compatible provider.
          </p>
          <div>
            <label className='text-sm font-medium block mb-1'>OpenAI API Key</label>
            <input
              type='password'
              value={openaiKey}
              onChange={e => setOpenaiKey(e.target.value)}
              placeholder='sk-...'
              className='w-full border border-input px-3 py-2 text-sm focus:outline-none focus:border-foreground'
            />
          </div>
        </div>

        <button
          onClick={handleSave}
          className='bg-primary text-primary-foreground px-6 py-2 text-sm hover:bg-primary/90 transition-colors'
        >
          {saved ? 'Saved!' : 'Save Settings'}
        </button>
      </div>
    </div>
  )
}
