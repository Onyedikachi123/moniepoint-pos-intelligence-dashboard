import { create } from 'zustand';

export interface Alert {
    id: string;
    type: 'info' | 'warning' | 'error' | 'success';
    message: string;
    timestamp: string;
}

interface Business {
    id: string;
    name: string;
    accountNumber: string;
    role: string;
    employees: number;
    verified: boolean;
}

interface AppState {
    // Alerts
    alerts: Alert[];
    addAlert: (alert: Omit<Alert, 'id' | 'timestamp'>) => void;
    removeAlert: (id: string) => void;
    clearAlerts: () => void;

    // Business Context
    currentBusiness: Business;
    availableBusinesses: Business[];
    switchBusiness: (businessId: string) => void;
}

export const useStore = create<AppState>((set) => ({
    // Alerts State
    alerts: [],
    addAlert: (alert) => {
        const id = Math.random().toString(36).substring(7);
        const timestamp = new Date().toISOString();
        set((state) => ({
            alerts: [...state.alerts, { ...alert, id, timestamp }],
        }));

        // Auto remove after 10 seconds
        setTimeout(() => {
            set((state) => ({
                alerts: state.alerts.filter((a) => a.id !== id),
            }));
        }, 10000);
    },
    removeAlert: (id) =>
        set((state) => ({
            alerts: state.alerts.filter((a) => a.id !== id),
        })),
    clearAlerts: () => set({ alerts: [] }),

    // Business State (Mock Data as default)
    currentBusiness: {
        id: 'biz_1',
        name: 'Awal & Sons Ventures Limited',
        accountNumber: '1278300012',
        role: 'Business Owner',
        employees: 24,
        verified: true
    },
    availableBusinesses: [
        {
            id: 'biz_1',
            name: 'Awal & Sons Ventures Limited',
            accountNumber: '1278300012',
            role: 'Business Owner',
            employees: 24,
            verified: true
        },
        {
            id: 'biz_2',
            name: 'Aero Contractors Ltd.',
            accountNumber: '2201364718',
            role: 'Manager',
            employees: 120,
            verified: true
        },
        {
            id: 'biz_3',
            name: 'BMW Retail Services',
            accountNumber: '2201364719',
            role: 'Business Owner',
            employees: 5,
            verified: false
        }
    ],
    switchBusiness: (businessId) => set((state) => {
        const selected = state.availableBusinesses.find(b => b.id === businessId);
        return selected ? { currentBusiness: selected } : {};
    }),
}));
