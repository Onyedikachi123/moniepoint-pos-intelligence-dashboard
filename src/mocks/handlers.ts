import { http, HttpResponse } from 'msw';

const generateTransactions = (count: number, businessId: string = 'biz_1') => {
    return Array.from({ length: count }).map((_, i) => {
        // Deterministic randomness based on businessId to make them look different
        const seed = businessId.charCodeAt(4) + i;
        const status = (seed * 9301 + 49297) % 233280 / 233280 > (businessId === 'biz_1' ? 0.9 : 0.7) ? 'failed' : 'success';

        const failureReasons = ['Network Failure', 'Bank Timeout', 'Insufficient Funds', 'Device Error'];
        const failureReason = status === 'failed' ? failureReasons[Math.floor(Math.random() * failureReasons.length)] : null;

        return {
            id: `txn_${businessId}_${Math.random().toString(36).substr(2, 9)}`,
            terminalId: `POS-${businessId.toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`,
            amount: Math.floor(Math.random() * 50000) + 500,
            status,
            type: 'card_withdrawal',
            timestamp: new Date(Date.now() - Math.floor(Math.random() * 86400000)).toISOString(), // Last 24h
            failureReason,
            reversalEta: status === 'failed' ? new Date(Date.now() + Math.floor(Math.random() * 3600000)).toISOString() : null,
            bank: 'Zenith Bank',
            customerName: 'Customer ' + (i + 1),
            businessId,
        };
    });
};

const db = {
    biz_1: generateTransactions(25, 'biz_1'),
    biz_2: generateTransactions(50, 'biz_2'),
    biz_3: generateTransactions(10, 'biz_3')
};

export const handlers = [
    // GET /api/transactions?businessId=...
    http.get('https://api.moniepoint.local/transactions', ({ request }) => {
        const url = new URL(request.url);
        const businessId = url.searchParams.get('businessId') || 'biz_1';
        // @ts-ignore
        const data = db[businessId] || [];
        return HttpResponse.json(data);
    }),

    // GET /api/stats?businessId=...
    http.get('https://api.moniepoint.local/stats', ({ request }) => {
        const url = new URL(request.url);
        const businessId = url.searchParams.get('businessId') || 'biz_1';
        // @ts-ignore
        const txns = db[businessId] || [];

        const total = txns.length;
        const failed = txns.filter((t: any) => t.status === 'failed').length;
        const success = txns.filter((t: any) => t.status === 'success').length;
        const volume = txns.reduce((acc: number, curr: any) => acc + curr.amount, 0);

        return HttpResponse.json({
            totalTxns: total,
            successRate: total > 0 ? ((success / total) * 100).toFixed(1) : 0,
            failedTxns: failed,
            pendingReversals: Math.floor(failed * 0.4),
            volume: volume
        });
    }),

    // GET /api/stats/failures
    http.get('https://api.moniepoint.local/stats/failures', () => {
        return HttpResponse.json([
            { name: 'Network Failure', value: 400 },
            { name: 'Bank Timeout', value: 300 },
            { name: 'Insufficient Funds', value: 300 },
            { name: 'Device Error', value: 200 },
        ]);
    }),

    // GET /api/alerts
    http.get('https://api.moniepoint.local/alerts', () => {
        return HttpResponse.json([
            {
                id: 'alert_1',
                type: 'warning',
                message: 'High network failure rate detected in Lagos Island.',
                timestamp: new Date().toISOString(),
            }
        ]);
    }),
];
