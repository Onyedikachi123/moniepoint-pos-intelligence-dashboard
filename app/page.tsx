'use client';

import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatCard } from '@/components/dashboard/StatCard';
import { TransactionTrendChart } from '@/components/dashboard/TransactionTrendChart';
import { FailureBreakdownChart } from '@/components/dashboard/FailureBreakdownChart';
import { RecentTransactions } from '@/components/transactions/RecentTransactions';
import { QuickActions } from '@/components/dashboard/QuickActions';
import { useStats } from '@/hooks/useStats';
import { Activity, AlertOctagon, CheckCircle2, RotateCcw } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { AlertSimulator } from '@/components/dashboard/AlertSimulator';

export default function Home() {
  const { data: stats } = useStats();
  const currentBusiness = useStore(state => state.currentBusiness);

  return (
    <DashboardLayout>
      <AlertSimulator />
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Dashboard</h1>
            <p className="text-slate-500 mt-1">Overview for <span className="font-semibold text-slate-700">{currentBusiness.name}</span></p>
          </div>
          <div className="text-right">
            <p className="text-sm text-slate-500">Last updated</p>
            <p className="text-sm font-medium text-slate-900">Just now</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Volume"
            value={stats ? `₦${(stats.volume / 1000000).toFixed(2)}M` : '...'}
            trend="+12.5%"
            trendUp={true}
            icon={<Activity className="h-5 w-5 text-blue-600" />}
            subtitle="Processed this month"
          />
          <StatCard
            title="Success Rate"
            value={stats ? `${stats.successRate}%` : '...'}
            trend="-0.4%"
            trendUp={false}
            icon={<CheckCircle2 className="h-5 w-5 text-green-600" />}
            subtitle="vs. 99.2% target"
          />
          <StatCard
            title="Active Disputes"
            value={stats?.pendingReversals.toString() || '...'}
            trend="+2"
            trendUp={false}
            icon={<AlertOctagon className="h-5 w-5 text-amber-600" />}
            subtitle="Requires attention"
          />
          <StatCard
            title="Pending Reversals"
            value="14"
            trend="-5%"
            trendUp={true}
            icon={<RotateCcw className="h-5 w-5 text-purple-600" />}
            subtitle="4 processed today"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Charts */}
          <div className="lg:col-span-2 space-y-8">
            <TransactionTrendChart />
            <RecentTransactions />
          </div>

          {/* Right Column - Secondary Info */}
          <div className="space-y-8">
            <QuickActions />
            <FailureBreakdownChart />

            {/* Promo/Info Card */}
            <div className="bg-gradient-to-br from-[#0351E7] to-[#0238a3] rounded-xl p-6 text-white shadow-lg">
              <h3 className="font-bold text-lg mb-2">Moniepoint Business Weekly</h3>
              <p className="text-blue-100 text-sm mb-4">
                Your transaction volume is up 15% this week. Keep up the great work!
              </p>
              <button className="bg-white/20 hover:bg-white/30 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors">
                View Report
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
