import { useQuery } from '@tanstack/react-query';
import { useStore } from '@/store/useStore';

export interface Transaction {
    id: string;
    terminalId: string;
    amount: number;
    status: 'success' | 'failed' | 'reversed';
    type: string;
    timestamp: string;
    failureReason?: string;
    reversalEta?: string;
    bank: string;
    customerName: string;
}

export function useTransactions() {
    const currentBusiness = useStore((state) => state.currentBusiness);

    return useQuery({
        queryKey: ['transactions', currentBusiness.id],
        queryFn: async () => {
            const res = await fetch(`https://api.moniepoint.local/transactions?businessId=${currentBusiness.id}`);
            if (!res.ok) throw new Error('Network response was not ok');
            return res.json();
        },
    });
}
