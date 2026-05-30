import React from 'react'
import { TrendingUp, TrendingDown, Info } from 'lucide-react'

interface MetricCardProps {
    title: string;
    value: string;
    percentChange?: string;
    trend?: 'up' | 'down';
    description?: string;
}

const MetricCard = ({title, value, percentChange, trend, description} : MetricCardProps) => {
  const TrendIcon = trend === 'up' ? TrendingUp : TrendingDown
  const trendColor = trend === 'up' ? 'text-green-600' : 'text-red-600'

  return (
    <div className='border-b py-4 border-black space-y-1 inline-block w-fit group relative'>
        <div className='flex items-center gap-1'>
            <div className='text-xs text-gray-500'>{title}</div>
            {description && (
                <div className="relative inline-block">
                    <Info size={12} className="text-gray-400 cursor-help hover:text-gray-600" />
                    <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-36 bg-gray-900 text-white text-xs rounded px-3 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10 pointer-events-none">
                        {description}
                    </div>
                </div>
            )}
        </div>
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
