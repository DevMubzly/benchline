import MetricCard from '@/components/dashboard/MetricCard'
import { ChartLineDefault } from '@/components/dashboard/MRRLineChart'
import React from 'react'

const DashPage = () => {
  return (
    <div className='flex gap-6 min-h-screen'>
        <div className='w-2/5 flex flex-col'>
            <span className='font-bold text-2xl py-4 border-b border-black'>Overview</span>
            <div className='flex gap-6'>
                <div className='flex flex-col'>
                    <MetricCard title='Current MRR' value='$12,450' percentChange='%12.5' trend='up' description='Monthly Recurring Revenue: Predictable revenue generated from active subscriptions each month.'/>
                    <MetricCard title='Active Users' value='1,234' percentChange='%8.2' trend='up' description='Active Users: Number of unique users engaging with your product in the last 30 days.'/>
                    <MetricCard title='Churn Rate' value='2.3%' percentChange='%0.5' trend='down' description='Churn Rate: Percentage of customers who cancel their subscriptions each month.'/>
                    <MetricCard title='ARPU' value='$24.50' percentChange='%3.1' trend='up' description='Average Revenue Per User: Average revenue generated per active customer.'/>
                    <MetricCard title='Revenue' value='$45,890' percentChange='%15.8' trend='up' description='Total Revenue: All income generated from your business in the current period.'/>
                    <MetricCard title='New Subscriptions' value='156' percentChange='%22.4' trend='up' description='New Subscriptions: Number of new customers who signed up this month.'/>
                </div>
                <div className='flex-1'>
                    <ChartLineDefault />
                </div>
            </div>
        </div>
        <div className='w-3/5 bg-neutral-200'></div>
    </div>
  )
}

export default DashPage
