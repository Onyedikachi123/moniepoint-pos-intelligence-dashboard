'use client';

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
    { time: '08:00', success: 4000, failed: 240 },
    { time: '09:00', success: 3000, failed: 139 },
    { time: '10:00', success: 2000, failed: 980 },
    { time: '11:00', success: 2780, failed: 390 },
    { time: '12:00', success: 1890, failed: 480 },
    { time: '13:00', success: 2390, failed: 380 },
    { time: '14:00', success: 3490, failed: 430 },
];

export function TransactionTrendChart() {
    return (
        <div className="h-[300px] w-full bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm border border-slate-100 dark:border-slate-700">
            <h3 className="text-slate-500 text-sm font-medium mb-4">Transaction Volume (Last 6 Hours)</h3>
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                    data={data}
                    margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                >
                    <defs>
                        <linearGradient id="colorSuccess" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10B981" stopOpacity={0.1} />
                            <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorFailed" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#EF4444" stopOpacity={0.1} />
                            <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                    <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fill: '#94A3B8', fontSize: 12 }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94A3B8', fontSize: 12 }} />
                    <Tooltip
                        contentStyle={{ backgroundColor: '#1E293B', borderRadius: '8px', border: 'none', color: '#fff' }}
                        itemStyle={{ color: '#fff' }}
                    />
                    <Area type="monotone" dataKey="success" stroke="#10B981" strokeWidth={2} fillOpacity={1} fill="url(#colorSuccess)" />
                    <Area type="monotone" dataKey="failed" stroke="#EF4444" strokeWidth={2} fillOpacity={1} fill="url(#colorFailed)" />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}
