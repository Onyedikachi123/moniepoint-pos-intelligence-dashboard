'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
    Legend
} from 'recharts';
import {
    TrendingUp,
    TrendingDown,
    AlertCircle,
    Activity,
    Calendar,
    Download,
    ArrowUpRight,
    ArrowDownRight
} from 'lucide-react';

// Mock Data
const transactionTrendData = [
    { time: '00:00', success: 4200, failed: 120 },
    { time: '04:00', success: 3800, failed: 90 },
    { time: '08:00', success: 12000, failed: 450 },
    { time: '12:00', success: 15600, failed: 890 },
    { time: '16:00', success: 14200, failed: 670 },
    { time: '20:00', success: 9800, failed: 230 },
    { time: '23:59', success: 5400, failed: 150 },
];

const failureReasonData = [
    { name: 'Network Timeout', value: 45, color: '#EF4444' }, // Red-500
    { name: 'Insuff. Funds', value: 30, color: '#F59E0B' },   // Amber-500
    { name: 'Issuer Decline', value: 15, color: '#3B82F6' },  // Blue-500
    { name: 'Hardware Error', value: 10, color: '#64748B' },  // Slate-500
];

const hourlyFailureData = [
    { hour: '9am', failures: 12 },
    { hour: '10am', failures: 19 },
    { hour: '11am', failures: 32 },
    { hour: '12pm', failures: 45 },
    { hour: '1pm', failures: 28 },
    { hour: '2pm', failures: 15 },
    { hour: '3pm', failures: 22 },
];

// Recharts Custom Tooltip
const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white p-3 border border-slate-200 shadow-lg rounded-lg">
                <p className="text-sm font-semibold text-slate-700 mb-1">{label}</p>
                {payload.map((entry: any, index: number) => (
                    <div key={index} className="flex items-center gap-2 text-xs">
                        <div
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: entry.color }}
                        />
                        <span className="text-slate-600 capitalize">
                            {entry.name}:
                        </span>
                        <span className="font-medium text-slate-900">
                            {entry.value.toLocaleString()}
                        </span>
                    </div>
                ))}
            </div>
        );
    }
    return null;
};

export default function AnalyticsPage() {
    const [timeRange, setTimeRange] = useState('24h');

    return (
        <DashboardLayout>
            <div className="space-y-6">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Analytics</h1>
                        <p className="text-slate-500 mt-1">
                            Real-time insights into your business performance and transaction health.
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" className="gap-2">
                            <Calendar className="h-4 w-4" />
                            <span>Oct 24, 2024 - Oct 25, 2024</span>
                        </Button>
                        <Button variant="outline" size="icon">
                            <Download className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                {/* Tabs & Controls */}
                <Tabs defaultValue="overview" className="space-y-6">
                    <div className="flex items-center justify-between">
                        <TabsList>
                            <TabsTrigger value="overview">Overview</TabsTrigger>
                            <TabsTrigger value="performance">POS Performance</TabsTrigger>
                            <TabsTrigger value="financials">Financials</TabsTrigger>
                        </TabsList>

                        <div className="hidden md:flex bg-slate-100 p-1 rounded-lg">
                            {['24h', '7d', '30d', '12m'].map((range) => (
                                <button
                                    key={range}
                                    onClick={() => setTimeRange(range)}
                                    className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${timeRange === range
                                            ? 'bg-white text-slate-900 shadow-sm'
                                            : 'text-slate-500 hover:text-slate-700'
                                        }`}
                                >
                                    {range.toUpperCase()}
                                </button>
                            ))}
                        </div>
                    </div>

                    <TabsContent value="overview" className="space-y-6">
                        {/* KPI Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium text-slate-500">
                                        Total Revenue
                                    </CardTitle>
                                    <span className="text-emerald-500 bg-emerald-50 p-1 rounded-full">
                                        <ArrowUpRight className="h-4 w-4" />
                                    </span>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold text-slate-900">₦45,231,890</div>
                                    <p className="text-xs text-slate-500 mt-1">
                                        <span className="text-emerald-600 font-medium">+12.5%</span> from yesterday
                                    </p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium text-slate-500">
                                        Transaction Volume
                                    </CardTitle>
                                    <span className="text-emerald-500 bg-emerald-50 p-1 rounded-full">
                                        <Activity className="h-4 w-4" />
                                    </span>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold text-slate-900">65,248</div>
                                    <p className="text-xs text-slate-500 mt-1">
                                        <span className="text-emerald-600 font-medium">+4.3%</span> from yesterday
                                    </p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium text-slate-500">
                                        Failure Rate
                                    </CardTitle>
                                    <span className="text-red-500 bg-red-50 p-1 rounded-full">
                                        <AlertCircle className="h-4 w-4" />
                                    </span>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold text-slate-900">2.4%</div>
                                    <p className="text-xs text-slate-500 mt-1">
                                        <span className="text-red-600 font-medium">+0.8%</span> from yesterday
                                    </p>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Main Trend Chart */}
                        <Card className="col-span-4">
                            <CardHeader>
                                <CardTitle>Transaction Trends</CardTitle>
                                <CardDescription>Success vs. Failed transactions over the last 24 hours.</CardDescription>
                            </CardHeader>
                            <CardContent className="px-2">
                                <div className="h-[300px] w-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart data={transactionTrendData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                                            <defs>
                                                <linearGradient id="colorSuccess" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#0351E7" stopOpacity={0.3} />
                                                    <stop offset="95%" stopColor="#0351E7" stopOpacity={0} />
                                                </linearGradient>
                                                <linearGradient id="colorFailed" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#EF4444" stopOpacity={0.3} />
                                                    <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
                                                </linearGradient>
                                            </defs>
                                            <XAxis
                                                dataKey="time"
                                                stroke="#94A3B8"
                                                fontSize={12}
                                                tickLine={false}
                                                axisLine={false}
                                            />
                                            <YAxis
                                                stroke="#94A3B8"
                                                fontSize={12}
                                                tickLine={false}
                                                axisLine={false}
                                                tickFormatter={(value) => `${value / 1000}k`}
                                            />
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                                            <Tooltip content={<CustomTooltip />} />
                                            <Area
                                                type="monotone"
                                                dataKey="success"
                                                stroke="#0351E7"
                                                fillOpacity={1}
                                                fill="url(#colorSuccess)"
                                                strokeWidth={2}
                                                name="Successful"
                                            />
                                            <Area
                                                type="monotone"
                                                dataKey="failed"
                                                stroke="#EF4444"
                                                fillOpacity={1}
                                                fill="url(#colorFailed)"
                                                strokeWidth={2}
                                                name="Failed"
                                            />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Bottom Charts Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Failure Breakdown */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Failure Breakdown</CardTitle>
                                    <CardDescription>Top reasons for transaction failures.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="h-[300px] flex items-center justify-center">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <PieChart>
                                                <Pie
                                                    data={failureReasonData}
                                                    cx="50%"
                                                    cy="50%"
                                                    innerRadius={60}
                                                    outerRadius={90}
                                                    paddingAngle={5}
                                                    dataKey="value"
                                                >
                                                    {failureReasonData.map((entry, index) => (
                                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                                    ))}
                                                </Pie>
                                                <Tooltip content={<CustomTooltip />} />
                                                <Legend
                                                    verticalAlign="bottom"
                                                    height={36}
                                                    iconType="circle"
                                                />
                                            </PieChart>
                                        </ResponsiveContainer>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Hourly Trends */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Hourly Failure Volume</CardTitle>
                                    <CardDescription>Peak failure times during operating hours.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="h-[300px]">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <BarChart data={hourlyFailureData} layout="vertical" margin={{ top: 0, right: 30, left: 0, bottom: 0 }}>
                                                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#E2E8F0" />
                                                <XAxis type="number" hide />
                                                <YAxis
                                                    dataKey="hour"
                                                    type="category"
                                                    stroke="#64748B"
                                                    fontSize={12}
                                                    tickLine={false}
                                                    axisLine={false}
                                                    width={40}
                                                />
                                                <Tooltip
                                                    cursor={{ fill: '#F1F5F9' }}
                                                    content={({ active, payload }) => {
                                                        if (active && payload && payload.length) {
                                                            return (
                                                                <div className="bg-slate-900 text-white text-xs p-2 rounded shadow-md">
                                                                    {payload[0].value} Failures
                                                                </div>
                                                            )
                                                        }
                                                        return null;
                                                    }}
                                                />
                                                <Bar
                                                    dataKey="failures"
                                                    fill="#64748B"
                                                    radius={[0, 4, 4, 0]}
                                                    barSize={20}
                                                />
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    <TabsContent value="performance">
                        <Card>
                            <CardHeader>
                                <CardTitle>POS Terminal Performance</CardTitle>
                                <CardDescription>Terminal-level uptime and error rates.</CardDescription>
                            </CardHeader>
                            <CardContent className="h-[400px] flex items-center justify-center text-slate-400">
                                Detailed POS performance metrics area.
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="financials">
                        <Card>
                            <CardHeader>
                                <CardTitle>Financial Reconciliation</CardTitle>
                                <CardDescription>Dispute vs Reversal financial impact.</CardDescription>
                            </CardHeader>
                            <CardContent className="h-[400px] flex items-center justify-center text-slate-400">
                                Financial reconciliation data area.
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </DashboardLayout>
    );
}
