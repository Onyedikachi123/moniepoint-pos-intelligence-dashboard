'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BusinessSwitcher } from '../BusinessSwitcher';
import {
    LayoutDashboard,
    CreditCard,
    Smartphone,
    RotateCcw,
    AlertOctagon,
    BarChart3,
    Settings,
    Receipt,
    Users,
    Briefcase,
    Wallet,
    HelpCircle
} from 'lucide-react';
import { cn } from '@/utils/cn';

const mainNavItems = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'Transactions', href: '/transactions', icon: Receipt },
    { name: 'POS Operations', href: '/pos', icon: Smartphone },
    { name: 'Disputes', href: '/disputes', icon: AlertOctagon },
    { name: 'Reversals', href: '/reversals', icon: RotateCcw },
    { name: 'Analytics', href: '/analytics', icon: BarChart3 },
];

const secondaryNavItems = [
    { name: 'Settings', href: '/settings', icon: Settings },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-72 bg-[#F9FAFB] border-r border-slate-200 h-screen fixed left-0 top-0 hidden md:flex flex-col z-30 font-sans">
            <div className="p-6 pb-4">
                <div className="mb-6 flex items-center gap-2 px-2">
                    <div className="h-8 w-8 rounded-lg bg-[#0351E7] flex items-center justify-center">
                        <span className="text-white font-bold text-lg">M</span>
                    </div>
                    <span className="text-xl font-bold text-slate-900 tracking-tight">Moniepoint</span>
                </div>

                <BusinessSwitcher />
            </div>

            <nav className="flex-1 overflow-y-auto py-2 px-4 space-y-8">
                <div>
                    <p className="px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                        Operations
                    </p>
                    <ul className="space-y-1">
                        {mainNavItems.map((item) => {
                            const isActive = pathname === item.href;
                            const Icon = item.icon;
                            return (
                                <li key={item.name}>
                                    <Link
                                        href={item.href}
                                        className={cn(
                                            "flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 group",
                                            isActive
                                                ? "bg-white text-[#0351E7] shadow-sm border border-slate-100"
                                                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                                        )}
                                    >
                                        <Icon className={cn("h-5 w-5", isActive ? "text-[#0351E7]" : "text-slate-400 group-hover:text-slate-600")} />
                                        {item.name}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>

                <div>
                    <p className="px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                        Business
                    </p>
                    <ul className="space-y-1">
                        {secondaryNavItems.map((item) => {
                            const isActive = pathname === item.href;
                            const Icon = item.icon;
                            return (
                                <li key={item.name}>
                                    <Link
                                        href={item.href}
                                        className={cn(
                                            "flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 group",
                                            isActive
                                                ? "bg-white text-[#0351E7] shadow-sm border border-slate-100"
                                                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                                        )}
                                    >
                                        <Icon className={cn("h-5 w-5", isActive ? "text-[#0351E7]" : "text-slate-400 group-hover:text-slate-600")} />
                                        {item.name}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </nav>

            <div className="p-4 border-t border-slate-200 bg-white/50 backdrop-blur-sm">
                <Link
                    href="/support"
                    className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
                >
                    <HelpCircle className="h-5 w-5 text-slate-400" />
                    Help & Support
                </Link>
            </div>
        </aside>
    );
}
