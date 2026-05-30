'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight, CalendarDays } from 'lucide-react'
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

  const firstDay = new Date(currentYear, currentMonth, 1).getDay()
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
  const today = new Date()

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

  return (
    <div>
      <div className='flex items-center justify-between mb-8'>
        <div>
          <h1 className='text-2xl font-bold'>Content Calendar</h1>
          <p className='text-gray-500 text-sm mt-1'>Schedule and track your content across projects</p>
        </div>
        <div className='flex items-center gap-4'>
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
      </div>

      <div className='border border-black p-6'>
        <div className='flex items-center justify-between mb-6'>
          <button onClick={prevMonth} className='p-1 hover:bg-gray-100'>
            <ChevronLeft size={20} />
          </button>
          <h2 className='text-lg font-bold'>{months[currentMonth]} {currentYear}</h2>
          <button onClick={nextMonth} className='p-1 hover:bg-gray-100'>
            <ChevronRight size={20} />
          </button>
        </div>

        <div className='grid grid-cols-7 gap-px bg-gray-200'>
          {daysOfWeek.map(d => (
            <div key={d} className='bg-gray-50 p-2 text-center text-xs font-medium text-gray-500'>
              {d}
            </div>
          ))}
          {Array.from({ length: firstDay }).map((_, i) => (
            <div key={`empty-${i}`} className='bg-white p-2 min-h-[100px]' />
          ))}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1
            const posts = getPostsForDay(day)
            const isToday = today.getDate() === day && today.getMonth() === currentMonth && today.getFullYear() === currentYear

            return (
              <div
                key={day}
                className={`bg-white p-2 min-h-[100px] border border-gray-100 ${
                  isToday ? 'ring-2 ring-black ring-inset' : ''
                }`}
              >
                <div className={`text-sm font-medium mb-1 ${isToday ? 'text-black' : 'text-gray-400'}`}>
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
                    <div className='text-[10px] text-gray-400 px-1'>+{posts.length - 3} more</div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className='mt-8'>
        <h2 className='font-bold text-lg mb-4 border-b border-black pb-2'>All Scheduled Content</h2>
        <div className='space-y-2'>
          {scheduledPosts.filter(p => p.status === 'scheduled').map((post) => (
            <div key={post.id} className='border border-gray-200 p-3 flex items-center justify-between'>
              <div>
                <div className='flex items-center gap-2'>
                  <span className='text-xs bg-blue-100 text-blue-700 px-2 py-0.5'>{post.channel}</span>
                  <span className='text-sm font-medium'>{post.title}</span>
                </div>
                {post.projects?.name && (
                  <p className='text-xs text-gray-400 mt-1'>{post.projects.name}</p>
                )}
              </div>
              <div className='text-xs text-gray-500 flex items-center gap-1'>
                <CalendarDays size={12} />
                {post.scheduled_at ? formatDate(post.scheduled_at) : 'No date'}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
