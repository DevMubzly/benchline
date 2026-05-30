import React from 'react'
import { TrendingUp, TrendingDown, AlertTriangle, Zap, Users, DollarSign, Activity, GitBranch, GitCommit, BarChart3 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'

const SecondHalfContent = () => {
  return (
    <div className='p-6 h-full overflow-auto space-y-4'>

      {/* Reports Overview Section */}
      <Card className='mb-4 border-2 border-purple-500 bg-purple-50'>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <BarChart3 size={18} className='text-purple-600' />
            Reports Overview
          </CardTitle>
          <CardDescription>Key analytics reports and insights</CardDescription>
        </CardHeader>
        <CardContent>
          <div className='grid grid-cols-3 gap-4'>
            <div className='space-y-2'>
              <div className='flex items-center justify-between'>
                <span className='text-sm text-gray-600'>Total Revenue (MTD)</span>
                <span className='text-lg font-bold text-gray-900'>{'$45,890'}</span>
              </div>
              <div className='flex items-center justify-between'>
                <span className='text-sm text-gray-600'>New Subscriptions</span>
                <span className='text-lg font-bold text-green-600'>+156</span>
              </div>
              <div className='flex items-center justify-between'>
                <span className='text-sm text-gray-600'>Churned Customers</span>
                <span className='text-lg font-bold text-red-600'>-12</span>
              </div>
            </div>

            <div className='space-y-2'>
              <div className='flex items-center justify-between'>
                <span className='text-sm text-gray-600'>Avg. Deal Size</span>
                <span className='text-lg font-bold text-gray-900'>{'$89.50'}</span>
              </div>
              <div className='flex items-center justify-between'>
                <span className='text-sm text-gray-600'>Conversion Rate</span>
                <span className='text-lg font-bold text-gray-900'>3.2%</span>
              </div>
              <div className='flex items-center justify-between'>
                <span className='text-sm text-gray-600'>LTV</span>
                <span className='text-lg font-bold text-gray-900'>{'$1,245'}</span>
              </div>
            </div>

            <div className='h-32 flex items-center justify-center bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg'>
              <div className='text-center'>
                <p className='text-xs text-gray-500'>Revenue Distribution</p>
                <div className='flex items-center gap-4 mt-2'>
                  <div className='flex items-center gap-2'>
                    <div className='w-4 h-4 rounded bg-blue-500'></div>
                    <span className='text-sm font-medium'>Monthly 65%</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <div className='w-3 h-3 rounded bg-purple-500'></div>
                    <span className='text-sm font-medium'>Annual 35%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Revenue by Plan Type */}
      <Card className='mb-4'>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <DollarSign size={18} />
            Revenue by Plan Type
          </CardTitle>
          <CardDescription>Subscription distribution this month</CardDescription>
        </CardHeader>
        <CardContent>
          <div className='space-y-4'>
            <div className='space-y-3'>
              <div className='flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200'>
                <div>
                  <p className='font-semibold text-sm text-gray-900'>Pro Plan</p>
                  <p className='text-xs text-gray-500'>$39/month</p>
                </div>
                <div className='text-right'>
                  <p className='text-lg font-bold text-gray-900'>{'$15,604'}</p>
                  <p className='text-xs text-green-600'>65% of MRR</p>
                </div>
              </div>
              <div className='flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200'>
                <div>
                  <p className='font-semibold text-sm text-gray-900'>Enterprise Plan</p>
                  <p className='text-xs text-gray-500'>$499/month</p>
                </div>
                <div className='text-right'>
                  <p className='text-lg font-bold text-gray-900'>{'$8,093'}</p>
                  <p className='text-xs text-green-600'>34% of MRR</p>
                </div>
              </div>
              <div className='flex items-center justify-between p-3 bg-purple-50 rounded-lg border border-purple-200'>
                <div>
                  <p className='font-semibold text-sm text-gray-900'>Annual Plans</p>
                  <p className='text-xs text-gray-500'>Avg. $342/year</p>
                </div>
                <div className='text-right'>
                  <p className='text-lg font-bold text-gray-900'>{'$1,242'}</p>
                  <p className='text-xs text-green-600'>1% of MRR</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card className='mb-4'>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <Activity size={18} />
            Recent Activity
          </CardTitle>
          <CardDescription>Latest Stripe subscriptions and payments</CardDescription>
        </CardHeader>
        <CardContent className='space-y-3'>
          <div className='flex items-start gap-3 p-3 bg-green-50 rounded-lg border border-green-200'>
            <div className='flex-shrink-0 w-8 h-8 rounded-full bg-green-600 flex items-center justify-center'>
              <Users size={16} className='text-white' />
            </div>
            <div className='flex-1 min-w-0'>
              <p className='text-sm font-medium text-gray-900'>New Subscription</p>
              <p className='text-xs text-gray-600'>TechCorp Inc. - Pro Plan - $499/month</p>
              <p className='text-xs text-gray-400'>2 hours ago</p>
            </div>
          </div>
          <div className='flex items-start gap-3 p-3 bg-green-50 rounded-lg border border-green-200'>
            <div className='flex-shrink-0 w-8 h-8 rounded-full bg-green-600 flex items-center justify-center'>
              <Users size={16} className='text-white' />
            </div>
            <div className='flex-1 min-w-0'>
              <p className='text-sm font-medium text-gray-900'>New Subscription</p>
              <p className='text-xs text-gray-600'>John Smith - Indie Plan - $19/month</p>
              <p className='text-xs text-gray-400'>5 hours ago</p>
            </div>
          </div>
          <div className='flex items-start gap-3 p-3 bg-orange-50 rounded-lg border border-orange-200'>
            <div className='flex-shrink-0 w-8 h-8 rounded-full bg-orange-600 flex items-center justify-center'>
              <AlertTriangle size={16} className='text-white' />
            </div>
            <div className='flex-1 min-w-0'>
              <p className='text-sm font-medium text-gray-900'>Subscription Cancelled</p>
              <p className='text-xs text-gray-600'>Acme Startup - $39/month</p>
              <p className='text-xs text-gray-400'>Yesterday</p>
            </div>
          </div>
          <div className='flex items-start gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200'>
            <div className='flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center'>
              <DollarSign size={16} className='text-white' />
            </div>
            <div className='flex-1 min-w-0'>
              <p className='text-sm font-medium text-gray-900'>Invoice Paid</p>
              <p className='text-xs text-gray-600'>Global Solutions - $2,450 one-time</p>
              <p className='text-xs text-gray-400'>1 day ago</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI Insights Section */}
      <Card className='mb-4 border-2 border-blue-500 bg-blue-50'>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <Zap size={18} className='text-blue-600' />
            AI Insights
          </CardTitle>
          <CardDescription>Intelligent recommendations based on your data</CardDescription>
        </CardHeader>
        <CardContent className='space-y-3'>
          <div className='bg-white p-3 rounded-lg border border-blue-200'>
            <div className='flex items-start gap-2'>
              <TrendingUp size={16} className='text-green-600 mt-0.5' />
              <div>
                <p className='font-semibold text-sm text-gray-900'>Revenue Opportunity Detected</p>
                <p className='text-xs text-gray-600 mt-1'>
                  Your Enterprise segment customers have 23% higher churn than SMB. Consider offering annual discounts to lock in revenue.
                </p>
              </div>
            </div>
          </div>
          <div className='bg-white p-3 rounded-lg border border-blue-200'>
            <div className='flex items-start gap-2'>
              <AlertTriangle size={16} className='text-orange-600 mt-0.5' />
              <div>
                <p className='font-semibold text-sm text-gray-900'>Churn Risk Alert</p>
                <p className='text-xs text-gray-600 mt-1'>
                  3 customers with declining usage patterns may cancel next month. Proactive outreach recommended.
                </p>
              </div>
            </div>
          </div>
          <div className='bg-white p-3 rounded-lg border border-blue-200'>
            <div className='flex items-start gap-2'>
              <TrendingUp size={16} className='text-blue-600 mt-0.5' />
              <div>
                <p className='font-semibold text-sm text-gray-900'>Feature Suggestion</p>
                <p className='text-xs text-gray-600 mt-1'>
                  Customers using Team features have 45% higher LTV. Consider highlighting this in onboarding.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* GitHub Metrics Section */}
      <Card className='border-2 border-gray-600 bg-gray-50'>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <GitBranch size={18} className='text-gray-600' />
            GitHub Metrics - Benchline Analytics
          </CardTitle>
          <CardDescription>Development activity and deployment performance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className='grid grid-cols-2 gap-4'>
            <div className='space-y-2'>
              <div className='flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200'>
                <span className='text-sm text-gray-600'>PRs Merged (MTD)</span>
                <span className='text-2xl font-bold text-gray-900'>24</span>
              </div>
              <div className='flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200'>
                <span className='text-sm text-gray-600'>Avg. Merge Time</span>
                <span className='text-2xl font-bold text-gray-900'>4.2 hrs</span>
              </div>
              <div className='flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200'>
                <span className='text-sm text-gray-600'>Deployments</span>
                <span className='text-2xl font-bold text-gray-900'>12</span>
              </div>
              <div className='flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200'>
                <span className='text-sm text-gray-600'>Lead Time</span>
                <span className='text-2xl font-bold text-gray-900'>2.1 days</span>
              </div>
            </div>

            <div className='space-y-2'>
              <div className='flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200'>
                <span className='text-sm text-gray-600'>Contributors</span>
                <span className='text-2xl font-bold text-gray-900'>5</span>
              </div>
              <div className='flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200'>
                <span className='text-sm text-gray-600'>Open Issues</span>
                <span className='text-2xl font-bold text-gray-900'>8</span>
              </div>
              <div className='flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200'>
                <span className='text-sm text-gray-600'>Code Commits</span>
                <span className='text-2xl font-bold text-gray-900'>156</span>
              </div>
              <div className='flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200'>
                <span className='text-sm text-gray-600'>Deployment Freq.</span>
                <span className='text-2xl font-bold text-gray-900'>2.1x/week</span>
              </div>
            </div>
          </div>

          <div className='mt-4 p-3 bg-gray-100 rounded-lg border border-gray-200'>
            <div className='flex items-start gap-2'>
              <GitCommit size={16} className='text-gray-600' />
              <div>
                <p className='font-semibold text-sm text-gray-900'>Dev → Revenue Correlation</p>
                <p className='text-xs text-gray-600 mt-1'>
                  Higher deployment frequency (3x/month) correlates with 23% higher MRR growth.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

    </div>
  )
}

export default SecondHalfContent
