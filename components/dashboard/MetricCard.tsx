import React from 'react'
import { TrendingUp, TrendingDown } from 'lucide-react'

interface MetricCardProps {
    title: string;
    value: string;
    percentChange?: string;
    trend?: 'up' | 'down';
}

const MetricCard = ({title, value, percentChange, trend} : MetricCardProps) => {
  const TrendIcon = trend === 'up' ? TrendingUp : TrendingDown
  const trendColor = trend === 'up' ? 'text-green-600' : 'text-red-600'

  return (
    <div className='border-b py-4 border-black space-y-1 inline-block w-fit'>
        <div className='text-xs text-gray-500'>{title}</div>
        <div className='flex items-start gap-1'>
            <div className='font-bold text-lg'>{value}</div>
            {percentChange && trend && (
                <div className={`flex items-center ${trendColor} text-xs -mt-1`}>
                    <TrendIcon size={10} />
                    <span className='font-bold ml-0.5'>{percentChange}</span>
                </div>
            )}
        </div>
    </div>
  )
}

export default MetricCard
