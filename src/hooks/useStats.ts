import { useQuery } from '@tanstack/react-query';
import { useStore } from '@/store/useStore';

export function useStats() {
    const currentBusiness = useStore((state) => state.currentBusiness);

    return useQuery({
        queryKey: ['stats', currentBusiness.id],
        queryFn: async () => {
            const res = await fetch(`https://api.moniepoint.local/stats?businessId=${currentBusiness.id}`);
            if (!res.ok) throw new Error('Failed to fetch stats');
            return res.json();
        },
    });
}
