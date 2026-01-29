'use client';

import { useEffect, useState } from 'react';

export function MSWProvider({ children }: { children: React.ReactNode }) {
    const [mswReady, setMswReady] = useState(false);

    useEffect(() => {
        async function enableMocking() {
            if (typeof window !== 'undefined') {
                const { worker } = await import('../mocks/browser');
                await worker.start({
                    onUnhandledRequest: 'bypass',
                });
                setMswReady(true);
            }
        }

        enableMocking();
    }, []);

    if (!mswReady) {
        return null; // Or a loading spinner
    }

    return <>{children}</>;
}
