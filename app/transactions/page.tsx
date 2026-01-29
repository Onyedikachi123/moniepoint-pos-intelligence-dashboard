'use client';

import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { TransactionsTable } from '@/components/transactions/TransactionsTable';

export default function TransactionsPage() {
    return (
        <DashboardLayout>
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Transactions</h1>
                    <p className="text-slate-500 mt-1">View and manage all your POS transactions and disputes.</p>
                </div>
                <TransactionsTable />
            </div>
        </DashboardLayout>
    );
}
