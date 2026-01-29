'use client';

import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { TransactionsTable } from '@/components/transactions/TransactionsTable';

export default function ReversalsPage() {
    return (
        <DashboardLayout>
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Reversals</h1>
                    <p className="text-slate-500 mt-1">Track and manage automated and manual reversals.</p>
                </div>
                <TransactionsTable />
            </div>
        </DashboardLayout>
    );
}
