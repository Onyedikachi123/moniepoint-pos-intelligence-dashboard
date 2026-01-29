"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TimelineStatus } from "./TimelineStatus";
import { useTransactions, Transaction } from "@/hooks/useTransactions";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function RecentTransactions() {
    const { data: transactions, isLoading } = useTransactions();

    if (isLoading) {
        return (
            <Card>
                <CardContent className="p-8 text-center text-slate-500">
                    Loading transactions...
                </CardContent>
            </Card>
        );
    }

    const getTimeline = (txn: Transaction) => {
        if (txn.status === 'success') {
            return [
                { status: 'completed', label: 'Initiated' },
                { status: 'completed', label: 'Processing' },
                { status: 'completed', label: 'Completed' },
            ];
        }
        if (txn.status === 'failed') {
            return [
                { status: 'completed', label: 'Initiated' },
                { status: 'failed', label: txn.failureReason || 'Failed' },
                { status: 'current', label: 'Reversal Queued', timestamp: txn.reversalEta ? `ETA: ${new Date(txn.reversalEta).toLocaleTimeString()}` : undefined },
                { status: 'pending', label: 'Reversal Success' },
            ];
        }
        return [];
    };

    return (
        <Card className="overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between border-b border-slate-100 bg-slate-50/50 py-4 px-6">
                <CardTitle className="text-base font-semibold text-slate-800">Recent Transactions</CardTitle>
                <Link href="/transactions">
                    <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                        View All <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                </Link>
            </CardHeader>
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-600">
                    <thead className="bg-slate-50 text-xs uppercase font-medium text-slate-500">
                        <tr>
                            <th className="px-6 py-3">Terminal ID</th>
                            <th className="px-6 py-3">Amount</th>
                            <th className="px-6 py-3">Status</th>
                            <th className="px-6 py-3 whitespace-nowrap">Timeline Tracker</th>
                            <th className="px-6 py-3">Time</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {transactions?.slice(0, 5).map((txn: any) => (
                            <tr key={txn.id} className="hover:bg-slate-50 transition-colors group">
                                <td className="px-6 py-4 font-medium text-slate-900">{txn.terminalId}</td>
                                <td className="px-6 py-4 font-mono font-medium">₦{txn.amount.toLocaleString()}</td>
                                <td className="px-6 py-4">
                                    <Badge variant={txn.status === 'success' ? 'success' : 'destructive'} className="uppercase">
                                        {txn.status}
                                    </Badge>
                                    {txn.status === 'failed' && (
                                        <p className="text-[10px] text-red-500 mt-1 font-medium truncate max-w-[100px]">{txn.failureReason}</p>
                                    )}
                                </td>
                                <td className="px-6 py-4">
                                    {/* @ts-ignore */}
                                    <TimelineStatus steps={getTimeline(txn)} />
                                </td>
                                <td className="px-6 py-4 text-xs text-slate-500 whitespace-nowrap">
                                    {new Date(txn.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Card>
    );
}
