'use client';

import { useStore } from '@/store/useStore';
import { useEffect } from 'react';

export function AlertSimulator() {
    const { addAlert } = useStore();

    useEffect(() => {
        // Simulate an alert appearing after 5 seconds
        const timer1 = setTimeout(() => {
            addAlert({
                type: 'warning',
                message: 'High network latency detected in Lagos region. Transactions may be slow.',
            });
        }, 5000);

        // Simulate another one later
        const timer2 = setTimeout(() => {
            addAlert({
                type: 'error',
                message: 'Zeus Network (GTBank) is currently down. Reversals queued.',
            });
        }, 15000);

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
        };
    }, [addAlert]);

    return null; // Invisible component
}
