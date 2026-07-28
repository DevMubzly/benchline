'use client'

import { useState, useRef, useEffect } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Settings, Search, Bell, LogOut, ChevronDown } from "lucide-react"
import ThemeToggle from "@/components/ui/theme-toggle"
import { usePathname } from "next/navigation"
import { useAuth } from '@/lib/auth-context'
import { useProject } from '@/lib/project-context'
import NotificationDropdown from './NotificationDropdown'
import SearchModal from './SearchModal'

const NavItems = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Projects', href: '/dashboard/projects' },
    { label: 'Content', href: '/dashboard/content' },
    { label: 'Calendar', href: '/dashboard/calendar' },
]

const NavigationBar = () => {
  const pathname = usePathname()
  const [showNotifications, setShowNotifications] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [showProjectMenu, setShowProjectMenu] = useState(false)
  const userMenuRef = useRef<HTMLDivElement>(null)
  const projectMenuRef = useRef<HTMLDivElement>(null)
  const [signingOut, setSigningOut] = useState(false)
  const { user, profile, logout } = useAuth()
  const { selectedProjectId, setSelectedProjectId, projects, selectedProject } = useProject()

  useEffect(() => {
    if (!showUserMenu && !showProjectMenu) return
    const handleClick = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) setShowUserMenu(false)
      if (projectMenuRef.current && !projectMenuRef.current.contains(e.target as Node)) setShowProjectMenu(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [showUserMenu, showProjectMenu])

  if (pathname.startsWith('/auth')) return null

  return (
    <div className='sticky top-0 z-50 bg-background flex items-center justify-between w-full py-6 px-8 border-b border-border box-border'>
        <div className='flex items-center gap-3'>
            <div className='font-bold text-lg'>
                <a href='/dashboard'>BENCHLINE</a>
            </div>
            <div className='relative' ref={projectMenuRef}>
                <button
                    onClick={() => setShowProjectMenu(p => !p)}
                    className='flex items-center gap-1.5 text-xs border border-border px-2.5 py-1 hover:bg-accent transition-colors'
                >
                    {selectedProject ? selectedProject.name : 'All Projects'}
                    <ChevronDown size={12} />
                </button>
                {showProjectMenu && (
                    <div className='absolute top-full left-0 mt-2 w-48 border border-border bg-card shadow-lg z-50'>
                        <button
                            onClick={() => { setSelectedProjectId(null); setShowProjectMenu(false) }}
                            className={`w-full text-left px-3 py-2 text-sm hover:bg-accent ${!selectedProjectId ? 'font-bold bg-accent/50' : ''}`}
                        >
                            All Projects
                        </button>
                        <div className='border-t border-border' />
                        {projects.map(p => (
                            <button
                                key={p.id}
                                onClick={() => { setSelectedProjectId(p.id); setShowProjectMenu(false) }}
                                className={`w-full text-left px-3 py-2 text-sm hover:bg-accent ${selectedProjectId === p.id ? 'font-bold bg-accent/50' : ''}`}
                            >
                                {p.name}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
        <div>
            <nav className='flex items-center justify-center gap-12'>
                {NavItems.map((item) => (
                    <a href={item.href} key={item.label} className={pathname === item.href ? 'font-bold' : ''}>
                        <span className='relative inline-block group'>
                            {item.label}
                            <span className='absolute bottom-0 left-0 h-0.5 bg-foreground w-0 group-hover:w-full transition-all duration-300 ease-out'></span>
                        </span>
                    </a>
                ))}
            </nav>
        </div>
        <div className='flex items-center'>
            <div className='flex items-center gap-1 mr-4'>
                <button className='flex items-center justify-center w-7 h-7 hover:bg-accent cursor-pointer' onClick={() => window.location.href = '/dashboard/settings'}>
                    <Settings size={14} />
                </button>
                <button className='flex items-center justify-center w-7 h-7 hover:bg-accent cursor-pointer' onClick={() => setShowSearch(true)}>
                    <Search size={14} />
                </button>
                <div className='relative flex items-center justify-center w-7 h-7'>
                    <button className='flex items-center justify-center w-full h-full hover:bg-accent cursor-pointer' onClick={() => setShowNotifications(p => !p)}>
                        <Bell size={14} />
                    </button>
                    {showNotifications && <NotificationDropdown onClose={() => setShowNotifications(false)} />}
                </div>
                <ThemeToggle />
            </div>
            <div className='h-6 w-px bg-gray-300 dark:bg-gray-600 mr-4'></div>
            <div className='relative flex items-center' ref={userMenuRef}>
                <button className='cursor-pointer' onClick={() => setShowUserMenu(p => !p)}>
                    <Avatar>
                        <AvatarImage src={profile?.avatar_url || user?.user_metadata?.avatar_url || 'https://github.com/shadcn.png'} />
                        <AvatarFallback>{(profile?.username || user?.user_metadata?.user_name || '?').charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                </button>
                {showUserMenu && (
                    <div className='absolute top-full right-0 mt-2 w-56 border border-border bg-card shadow-lg z-50'>
                        <div className='px-4 py-3 border-b border-border'>
                            <p className='text-sm font-medium'>{profile?.full_name || user?.user_metadata?.full_name || user?.email}</p>
                            <p className='text-xs text-muted-foreground'>@{profile?.username || user?.user_metadata?.user_name}</p>
                        </div>
                        <button
                            onClick={() => { setShowUserMenu(false); window.location.href = '/dashboard/settings' }}
                            className='w-full text-left px-4 py-2 text-sm hover:bg-accent flex items-center gap-2'
                        >
                            <Settings size={14} />
                            Settings
                        </button>
                        <button
                            onClick={async () => { setShowUserMenu(false); setSigningOut(true); await logout() }}
                            disabled={signingOut}
                            className='w-full text-left px-4 py-2 text-sm hover:bg-accent flex items-center gap-2 border-t border-border text-red-500 disabled:opacity-50'
                        >
                            {signingOut ? <span className='w-3.5 h-3.5 border border-red-500 border-t-transparent rounded-full animate-spin' /> : <LogOut size={14} />}
                            Sign out
                        </button>
                    </div>
                )}
            </div>
        </div>
        {showSearch && <SearchModal onClose={() => setShowSearch(false)} />}
    </div>
  )
}

export default NavigationBar
