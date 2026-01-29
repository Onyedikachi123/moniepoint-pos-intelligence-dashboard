"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

const data = [
    { hour: '8am', failures: 12 },
    { hour: '9am', failures: 19 },
    { hour: '10am', failures: 34 },
    { hour: '11am', failures: 22 },
    { hour: '12pm', failures: 45 },
    { hour: '1pm', failures: 30 },
    { hour: '2pm', failures: 25 },
    { hour: '3pm', failures: 18 },
    { hour: '4pm', failures: 15 },
    { hour: '5pm', failures: 40 },
    { hour: '6pm', failures: 28 },
];

export function TimeHeatmap() {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-sm font-medium text-slate-500">Failure Intensity (Time of Day)</CardTitle>
            </CardHeader>
            <CardContent className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data}>
                        <XAxis dataKey="hour" fontSize={11} stroke="#94a3b8" tickLine={false} axisLine={false} />
                        <Tooltip
                            cursor={{ fill: '#f1f5f9' }}
                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                        />
                        <Bar dataKey="failures" fill="#F87171" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}
