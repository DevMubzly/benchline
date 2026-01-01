import MetricCard from '@/components/dashboard/MetricCard'
import { ChartLineDefault } from '@/components/dashboard/MRRLineChart'
import React from 'react'

const ReportsPage = () => {
  return (
    <div className='flex gap-6 h-full'>
        <div className='w-2/5 flex flex-col'>
            <span className='font-bold text-2xl py-4 border-b border-black'>Overview</span>
            <div className='flex gap-6'>
                <div className='flex flex-col'>
                    <MetricCard title='Current MRR' value='$12,450' percentChange='%12.5' trend='up'/>
                    <MetricCard title='Active Users' value='1,234' percentChange='%8.2' trend='up'/>
                    <MetricCard title='Churn Rate' value='2.3%' percentChange='%0.5' trend='down'/>
                    <MetricCard title='ARPU' value='$24.50' percentChange='%3.1' trend='up'/>
                    <MetricCard title='Revenue' value='$45,890' percentChange='%15.8' trend='up'/>
                    <MetricCard title='New Subscriptions' value='156' percentChange='%22.4' trend='up'/>
                </div>
                <div className='flex-1'>
                    <ChartLineDefault />
                </div>
            </div>
        </div>
        <div className='w-3/5 bg-neutral-200'>2ND HALF </div>
    </div>
  )
}

export default ReportsPage
