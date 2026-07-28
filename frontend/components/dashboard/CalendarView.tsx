'use client'

import { useState, useRef, useEffect } from 'react'
import { ChevronLeft, ChevronRight, CalendarDays, X } from 'lucide-react'
import { formatDate } from '@/lib/utils'
import type { ContentPiece } from '@/lib/types'

interface CalendarViewProps {
  scheduledPosts: ContentPiece[]
}

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export default function CalendarView({ scheduledPosts }: CalendarViewProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth())
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [detailPost, setDetailPost] = useState<ContentPiece | null>(null)
  const modalRef = useRef<HTMLDivElement>(null)

  const firstDay = new Date(currentYear, currentMonth, 1).getDay()
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
  const today = new Date()

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setSelectedDate(null); setDetailPost(null) }
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [])

  const prevMonth = () => {
    if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear(y => y - 1) }
    else setCurrentMonth(m => m - 1)
  }

  const nextMonth = () => {
    if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear(y => y + 1) }
    else setCurrentMonth(m => m + 1)
  }

  const getPostsForDay = (day: number) => {
    return scheduledPosts.filter(p => {
      if (!p.scheduled_at) return false
      const postDate = new Date(p.scheduled_at)
      return postDate.getFullYear() === currentYear &&
        postDate.getMonth() === currentMonth &&
        postDate.getDate() === day
    })
  }

  const handleDayClick = (day: number) => {
    setSelectedDate(new Date(currentYear, currentMonth, day))
    setDetailPost(null)
  }

  const closeModal = () => {
    setSelectedDate(null)
    setDetailPost(null)
  }

  const postsForSelectedDate = selectedDate
    ? scheduledPosts.filter(p => {
        if (!p.scheduled_at) return false
        const d = new Date(p.scheduled_at)
        return d.getFullYear() === selectedDate.getFullYear() &&
          d.getMonth() === selectedDate.getMonth() &&
          d.getDate() === selectedDate.getDate()
      })
    : []

  return (
    <div className='flex gap-6'>
      <div className='flex-[7] min-w-0'>
        <div className='flex items-center justify-between mb-8'>
          <div>
            <h1 className='text-2xl font-bold'>Content Calendar</h1>
            <p className='text-muted-foreground text-sm mt-1'>Schedule and track your content across projects</p>
          </div>
          <div className='flex items-center gap-2'>
            <div className='flex gap-2'>
              <div className='w-3 h-3 bg-green-100 border border-green-300' />
              <span className='text-xs'>Published</span>
            </div>
            <div className='flex gap-2'>
              <div className='w-3 h-3 bg-blue-100 border border-blue-300' />
              <span className='text-xs'>Scheduled</span>
            </div>
          </div>
        </div>

        <div className='border border-border p-6'>
          <div className='flex items-center justify-between mb-6'>
            <button onClick={prevMonth} className='p-1 hover:bg-accent'>
              <ChevronLeft size={20} />
            </button>
            <h2 className='text-lg font-bold'>{months[currentMonth]} {currentYear}</h2>
            <button onClick={nextMonth} className='p-1 hover:bg-accent'>
              <ChevronRight size={20} />
            </button>
          </div>

          <div className='grid grid-cols-7 gap-px bg-border'>
            {daysOfWeek.map(d => (
              <div key={d} className='bg-muted p-2 text-center text-xs font-medium text-muted-foreground'>
                {d}
              </div>
            ))}
            {Array.from({ length: firstDay }).map((_, i) => (
              <div key={`empty-${i}`} className='bg-card p-2 min-h-[100px]' />
            ))}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1
              const posts = getPostsForDay(day)
              const isToday = today.getDate() === day && today.getMonth() === currentMonth && today.getFullYear() === currentYear

              return (
                <div
                  key={day}
                  onClick={() => handleDayClick(day)}
                  className={`bg-card p-2 min-h-[100px] border border-border cursor-pointer hover:bg-muted/50 transition-colors ${
                    isToday ? 'ring-2 ring-foreground ring-inset' : ''
                  }`}
                >
                  <div className={`text-sm font-medium mb-1 ${isToday ? 'text-foreground' : 'text-muted-foreground'}`}>
                    {day}
                  </div>
                  <div className='space-y-1'>
                    {posts.slice(0, 3).map((post) => (
                      <div
                        key={post.id}
                        className={`text-[10px] px-1.5 py-0.5 truncate ${
                          post.status === 'published'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-blue-100 text-blue-700'
                        }`}
                        title={post.title}
                      >
                        {post.projects?.name}: {post.title?.slice(0, 20)}
                      </div>
                    ))}
                    {posts.length > 3 && (
                      <div className='text-[10px] text-muted-foreground px-1'>+{posts.length - 3} more</div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <div className='flex-[3] min-w-0 border-l border-border pl-6'>
        <h2 className='font-bold text-lg mb-4 border-b border-border pb-2'>All Scheduled Content</h2>
        <div className='space-y-2 overflow-y-auto max-h-[calc(100vh-220px)] pr-1'>
          {scheduledPosts.filter(p => p.status === 'scheduled').length === 0 ? (
            <p className='text-sm text-muted-foreground'>No scheduled content</p>
          ) : (
            scheduledPosts.filter(p => p.status === 'scheduled').map((post) => (
              <div
                key={post.id}
                onClick={() => setDetailPost(post)}
                className='border border-border p-3 cursor-pointer hover:bg-muted/50 transition-colors'
              >
                <div className='flex items-center gap-2 mb-1'>
                  <span className='text-xs bg-blue-100 text-blue-700 px-2 py-0.5 uppercase'>{post.channel}</span>
                  {post.projects?.name && (
                    <span className='text-xs text-muted-foreground'>{post.projects.name}</span>
                  )}
                </div>
                <p className='text-sm font-medium truncate'>{post.title}</p>
                <p className='text-xs text-muted-foreground flex items-center gap-1 mt-1'>
                  <CalendarDays size={12} />
                  {post.scheduled_at ? formatDate(post.scheduled_at) : 'No date'}
                </p>
              </div>
            ))
          )}
        </div>
      </div>

      {selectedDate && (
        <div
          className='fixed inset-0 z-50 flex items-center justify-center bg-black/50'
          onMouseDown={(e) => { if (e.target === e.currentTarget) closeModal() }}
        >
          <div ref={modalRef} className='bg-card border border-border w-full max-w-lg max-h-[80vh] flex flex-col'>
            <div className='flex items-center justify-between p-4 border-b border-border'>
              <h3 className='font-bold'>
                {selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                <span className='text-muted-foreground font-normal ml-2'>({postsForSelectedDate.length} posts)</span>
              </h3>
              <button onClick={closeModal} className='p-1 hover:bg-accent'>
                <X size={16} />
              </button>
            </div>

            <div className='overflow-y-auto flex-1 p-4'>
              {detailPost ? (
                <div>
                  <button
                    onClick={() => setDetailPost(null)}
                    className='text-xs text-muted-foreground hover:text-foreground mb-4 flex items-center gap-1'
                  >
                    ← Back to all posts
                  </button>
                  <div className='flex items-center gap-2 mb-3'>
                    <span className={`text-xs px-2 py-0.5 ${
                      detailPost.status === 'published' ? 'bg-green-100 text-green-700' :
                      detailPost.status === 'scheduled' ? 'bg-blue-100 text-blue-700' :
                      'bg-muted text-foreground'
                    }`}>{detailPost.status}</span>
                    <span className='text-xs bg-muted px-2 py-0.5 uppercase'>{detailPost.channel}</span>
                    {detailPost.projects?.name && (
                      <span className='text-xs text-muted-foreground'>{detailPost.projects.name}</span>
                    )}
                  </div>
                  <h4 className='text-lg font-bold mb-2'>{detailPost.title}</h4>
                  <p className='text-sm whitespace-pre-wrap mb-4'>{detailPost.body}</p>
                  {detailPost.scheduled_at && (
                    <p className='text-xs text-muted-foreground flex items-center gap-1 mb-1'>
                      <CalendarDays size={12} />
                      Scheduled: {formatDate(detailPost.scheduled_at)}
                    </p>
                  )}
                  <p className='text-xs text-muted-foreground mt-3 italic'>{detailPost.reasoning}</p>
                  <p className='text-xs text-muted-foreground mt-1'>{detailPost.predicted_engagement}</p>
                </div>
              ) : postsForSelectedDate.length === 0 ? (
                <p className='text-sm text-muted-foreground text-center py-8'>No content scheduled for this date</p>
              ) : (
                <div className='space-y-2'>
                  {postsForSelectedDate.map((post) => (
                    <div
                      key={post.id}
                      onClick={() => setDetailPost(post)}
                      className='border border-border p-3 cursor-pointer hover:bg-muted/50 transition-colors'
                    >
                      <div className='flex items-center gap-2 mb-1'>
                        <span className={`text-xs px-2 py-0.5 ${
                          post.status === 'published' ? 'bg-green-100 text-green-700' :
                          post.status === 'scheduled' ? 'bg-blue-100 text-blue-700' :
                          'bg-muted text-foreground'
                        }`}>{post.status}</span>
                        <span className='text-xs bg-muted px-2 py-0.5 uppercase'>{post.channel}</span>
                        {post.projects?.name && (
                          <span className='text-xs text-muted-foreground'>{post.projects.name}</span>
                        )}
                      </div>
                      <p className='text-sm font-medium'>{post.title}</p>
                      <p className='text-xs text-muted-foreground mt-1 line-clamp-2'>{post.body}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
