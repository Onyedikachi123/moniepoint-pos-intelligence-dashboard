'use client';

import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { FailureBreakdownChart } from '@/components/dashboard/FailureBreakdownChart';
import { TimeHeatmap } from '@/components/dashboard/TimeHeatmap';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, SignalHigh, WifiOff, BatteryWarning } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { TransactionsTable } from '@/components/transactions/TransactionsTable';

export default function POSTerminalPage() {
    return (
        <DashboardLayout>
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">POS Operations</h1>
                    <p className="text-slate-500 mt-1">Real-time health monitoring and failure analytics for 248 terminals.</p>
                </div>

                {/* Health Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Card className="bg-green-500 text-white border-green-600">
                        <CardContent className="p-6">
                            <p className="text-green-100 text-sm font-medium">Online Terminals</p>
                            <h3 className="text-3xl font-bold mt-1">242</h3>
                            <p className="text-xs text-green-100 mt-2 bg-green-600/30 w-fit px-2 py-0.5 rounded">97.5% Uptime</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-6">
                            <p className="text-slate-500 text-sm font-medium">Network Failures</p>
                            <h3 className="text-3xl font-bold mt-1 text-slate-900">4.2%</h3>
                            <div className="flex items-center gap-1 text-xs text-red-500 mt-2">
                                <SignalHigh className="h-3 w-3" />
                                <span>+1.2% spike detected</span>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-6">
                            <p className="text-slate-500 text-sm font-medium">Active Alerts</p>
                            <h3 className="text-3xl font-bold mt-1 text-slate-900">3</h3>
                            <div className="flex items-center gap-1 text-xs text-amber-500 mt-2">
                                <AlertTriangle className="h-3 w-3" />
                                <span>2 Low Battery, 1 Net</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <FailureBreakdownChart />
                    <TimeHeatmap />
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Recent POS Failures</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {/* Reusing table for now, would filter by failures normally */}
                        <TransactionsTable />
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    );
}
