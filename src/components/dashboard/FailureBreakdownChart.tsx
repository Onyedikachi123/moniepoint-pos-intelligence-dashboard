'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const data = [
    { name: 'Network Failure', value: 400 },
    { name: 'Bank Timeout', value: 300 },
    { name: 'Insufficient Funds', value: 300 },
    { name: 'Device Error', value: 200 },
];

const COLORS = ['#3B82F6', '#F59E0B', '#10B981', '#EF4444'];

export function FailureBreakdownChart() {
    return (
        <div className="h-[300px] w-full bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm border border-slate-100 dark:border-slate-700">
            <h3 className="text-slate-500 text-sm font-medium">Failure Reasons</h3>
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        fill="#8884d8"
                        paddingAngle={5}
                        dataKey="value"
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip
                        contentStyle={{ backgroundColor: '#1E293B', borderRadius: '8px', border: 'none', color: '#fff' }}
                    />
                    <Legend
                        verticalAlign="bottom"
                        iconType="circle"
                        wrapperStyle={{
                            fontSize: '11px',
                            color: '#64748B',
                        }}
                    />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}
