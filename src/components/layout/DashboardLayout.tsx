'use client';

import { Sidebar } from './Sidebar';
import { useStore } from '@/store/useStore';
import { Bell, Search } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export function DashboardLayout({ children }: { children: React.ReactNode }) {
    const { alerts, removeAlert, currentBusiness } = useStore();

    return (
        <div className="min-h-screen bg-[#F0F2F5] font-sans">
            <Sidebar />

            <main className="md:pl-72 min-h-screen transition-all duration-300">
                {/* Header */}
                <header className="h-20 bg-white/80 backdrop-blur-md sticky top-0 z-20 border-b border-slate-200 px-8 flex items-center justify-between">
                    <div className="flex items-center gap-4 w-1/3">
                        <div className="relative w-full max-w-sm">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search transactions, disputes, or help..."
                                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                            <div className="hidden md:flex flex-col items-end mr-2">
                                <span className="text-sm font-semibold text-slate-800">Chioma Ibekwe</span>
                                <span className="text-xs text-slate-500">Super Admin</span>
                            </div>
                            <Avatar className="h-10 w-10 border-2 border-white shadow-sm cursor-pointer">
                                <AvatarImage src="https://i.pravatar.cc/150?u=chioma" />
                                <AvatarFallback>CI</AvatarFallback>
                            </Avatar>
                        </div>

                        <Button variant="ghost" size="icon" className="relative text-slate-500 hover:bg-slate-100 rounded-full h-10 w-10">
                            <Bell className="h-5 w-5" />
                            {alerts.length > 0 && (
                                <span className="absolute top-2 right-2 h-2.5 w-2.5 bg-red-500 rounded-full border-2 border-white" />
                            )}
                        </Button>
                    </div>
                </header>

                {/* Alerts Container */}
                <div className="fixed top-24 right-8 z-50 flex flex-col gap-3 pointer-events-none w-96">
                    {alerts.map((alert) => (
                        <div
                            key={alert.id}
                            className={`pointer-events-auto transform transition-all duration-300 ease-in-out hover:scale-102 shadow-lg rounded-xl p-4 border-l-4 bg-white flex items-start gap-4 ${alert.type === 'error' ? 'border-red-500' :
                                    alert.type === 'warning' ? 'border-amber-500' :
                                        'border-blue-500'
                                }`}
                        >
                            <div className="flex-1">
                                <h4 className={`text-xs font-bold uppercase tracking-wider mb-1 ${alert.type === 'error' ? 'text-red-600' :
                                        alert.type === 'warning' ? 'text-amber-600' :
                                            'text-blue-600'
                                    }`}>
                                    {alert.type}
                                </h4>
                                <p className="text-sm font-medium text-slate-700 leading-snug">{alert.message}</p>
                                <p className="text-xs text-slate-400 mt-2">{new Date(alert.timestamp).toLocaleTimeString()}</p>
                            </div>
                            <button
                                onClick={() => removeAlert(alert.id)}
                                className="text-slate-400 hover:text-slate-600 p-1 hover:bg-slate-100 rounded-md transition-colors"
                            >
                                <span className="sr-only">Close</span>
                                ×
                            </button>
                        </div>
                    ))}
                </div>

                {/* Main Content Area */}
                <div className="p-8 max-w-7xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
