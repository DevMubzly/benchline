'use client'

import { useEffect, useRef } from 'react'
import { Bell, X, GitCommit, Sparkles, CalendarDays, GitPullRequest, Package } from 'lucide-react'
import { MOCK_NOTIFICATIONS } from '@/lib/mock'
import { formatDate } from '@/lib/utils'

interface NotificationDropdownProps {
  onClose: () => void
}

const typeIcon: Record<string, React.ReactNode> = {
  release: <Package size={14} />,
  pr: <GitPullRequest size={14} />,
  commit: <GitCommit size={14} />,
  published: <Sparkles size={14} />,
  scheduled: <CalendarDays size={14} />,
}

export default function NotificationDropdown({ onClose }: NotificationDropdownProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose()
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [onClose])

  return (
    <div
      ref={ref}
      className='absolute top-full right-0 mt-2 w-96 border border-border bg-card shadow-lg z-50'
    >
      <div className='flex items-center justify-between px-4 py-3 border-b border-border'>
        <h3 className='font-bold text-sm'>Notifications</h3>
        <button onClick={onClose} className='text-muted-foreground hover:text-foreground'>
          <X size={14} />
        </button>
      </div>
      <div className='max-h-96 overflow-y-auto'>
        {MOCK_NOTIFICATIONS.length === 0 && (
          <p className='text-muted-foreground text-xs text-center py-6'>No notifications</p>
        )}
        {MOCK_NOTIFICATIONS.map((n) => (
          <div
            key={n.id}
            className={`px-4 py-3 border-b border-border hover:bg-accent transition-colors ${!n.read ? 'bg-muted' : ''}`}
          >
            <div className='flex items-start gap-3'>
              <div className={`mt-0.5 ${!n.read ? 'text-foreground' : 'text-muted-foreground/40'}`}>
                {typeIcon[n.type] || <Bell size={14} />}
              </div>
              <div className='flex-1 min-w-0'>
                <p className={`text-sm ${!n.read ? 'font-medium' : ''}`}>{n.title}</p>
                <p className='text-xs text-muted-foreground truncate'>{n.body}</p>
                <p className='text-xs text-muted-foreground mt-1'>{formatDate(n.created_at)}</p>
              </div>
              {!n.read && <div className='w-1.5 h-1.5 bg-foreground mt-1.5 shrink-0' />}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
