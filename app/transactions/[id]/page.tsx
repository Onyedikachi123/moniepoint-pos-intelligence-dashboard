'use client';

import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TimelineStatus } from '@/components/transactions/TimelineStatus';
import { ArrowLeft, Printer, Share2, HelpCircle } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Badge } from '@/components/ui/badge';

export default function TransactionDetailsPage() {
    const params = useParams();
    const id = params.id as string;

    // Mock data based on ID - normally fetched via MSW or hook
    const transaction = {
        id,
        amount: 25000,
        status: 'failed',
        failureReason: 'Issuer Bank Timeout',
        terminalId: 'POS-2023-894',
        timestamp: new Date().toISOString(),
        customer: 'Chinedu O.',
        cardType: 'Mastercard •••• 4242',
        timeline: [
            { status: 'completed', label: 'Transaction Initiated', timestamp: '14:30:05' },
            { status: 'completed', label: 'Terminal Processing', timestamp: '14:30:07' },
            { status: 'failed', label: 'Issuer Bank Timeout', timestamp: '14:30:45' },
            { status: 'current', label: 'Reversal Initiated', timestamp: '14:31:00' },
            { status: 'pending', label: 'Reversal Completed' },
        ]
    };

    return (
        <DashboardLayout>
            <div className="max-w-3xl mx-auto space-y-6">
                <div className="flex items-center gap-4">
                    <Link href="/transactions">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">Transaction Details</h1>
                        <p className="text-sm text-slate-500">ID: {id}</p>
                    </div>
                    <div className="ml-auto flex gap-2">
                        <Button variant="outline" size="sm" className="gap-2">
                            <Share2 className="h-4 w-4" />
                            Share
                        </Button>
                        <Button variant="outline" size="sm" className="gap-2">
                            <Printer className="h-4 w-4" />
                            Receipt
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-2 space-y-6">
                        <Card>
                            <CardHeader className="pb-4 border-b border-slate-100">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <CardDescription>Amount</CardDescription>
                                        <CardTitle className="text-3xl font-mono mt-1">
                                            ₦{transaction.amount.toLocaleString()}
                                        </CardTitle>
                                    </div>
                                    <Badge variant="destructive" className="px-3 py-1 text-sm uppercase">
                                        {transaction.status}
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardContent className="pt-6 space-y-4">
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <p className="text-slate-500">Terminal ID</p>
                                        <p className="font-medium text-slate-900">{transaction.terminalId}</p>
                                    </div>
                                    <div>
                                        <p className="text-slate-500">Card Type</p>
                                        <p className="font-medium text-slate-900">{transaction.cardType}</p>
                                    </div>
                                    <div>
                                        <p className="text-slate-500">Customer</p>
                                        <p className="font-medium text-slate-900">{transaction.customer}</p>
                                    </div>
                                    <div>
                                        <p className="text-slate-500">Date/Time</p>
                                        <p className="font-medium text-slate-900">{new Date(transaction.timestamp).toLocaleString()}</p>
                                    </div>
                                </div>

                                {transaction.status === 'failed' && (
                                    <div className="bg-red-50 border border-red-100 rounded-lg p-4 mt-4 flex items-start gap-3">
                                        <HelpCircle className="h-5 w-5 text-red-600 mt-0.5" />
                                        <div>
                                            <p className="text-sm font-semibold text-red-900">Failure Reason: {transaction.failureReason}</p>
                                            <p className="text-xs text-red-700 mt-1">The customer's bank failed to respond in time.</p>
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Smart Reversal Timeline</CardTitle>
                            </CardHeader>
                            <CardContent>
                                {/* @ts-ignore */}
                                <TimelineStatus steps={transaction.timeline} />
                                <div className="mt-8 space-y-8 pl-2">
                                    {/* Detailed vertical timeline for the page view */}
                                    {transaction.timeline.map((step, i) => (
                                        <div key={i} className="relative pl-8 border-l border-slate-200 last:border-0 pb-0">
                                            <div className={`absolute left-[-5px] top-1 h-2.5 w-2.5 rounded-full border-2 border-white ${
                                                // @ts-ignore
                                                step.status === 'completed' ? 'bg-green-500' :
                                                    // @ts-ignore
                                                    step.status === 'failed' ? 'bg-red-500' :
                                                        // @ts-ignore
                                                        step.status === 'current' ? 'bg-amber-500 animate-pulse' : 'bg-slate-300'
                                                }`} />
                                            <div>
                                                <p className="text-sm font-medium text-slate-900">{step.label}</p>
                                                {/* @ts-ignore */}
                                                {step.timestamp && <p className="text-xs text-slate-500">{step.timestamp}</p>}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-sm font-medium text-slate-500">AI Analysis</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="p-3 bg-blue-50 rounded-lg text-sm text-blue-900">
                                    <strong>Recommendation:</strong> Do not re-attempt immediately. Wait 10 minutes for bank service restoration.
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500">Related Failures</p>
                                    <p className="text-lg font-bold text-slate-900">14</p>
                                    <p className="text-xs text-slate-400">in this area in last 10m</p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
