import { Card, CardContent } from "@/components/ui/card";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/utils/cn";

interface StatCardProps {
    title: string;
    value: string;
    trend?: string;
    trendUp?: boolean;
    icon?: React.ReactNode;
    subtitle?: string;
}

export function StatCard({ title, value, trend, trendUp, icon, subtitle }: StatCardProps) {
    return (
        <Card>
            <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                    <div className="p-2 bg-slate-50 rounded-lg text-slate-500 border border-slate-100">
                        {icon}
                    </div>
                    {trend && (
                        <div className={cn(
                            "flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full",
                            trendUp ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
                        )}>
                            {trendUp ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                            {trend}
                        </div>
                    )}
                </div>

                <div className="space-y-1">
                    <p className="text-sm font-medium text-slate-500">{title}</p>
                    <h3 className="text-2xl font-bold text-slate-900 tracking-tight">{value}</h3>
                    {subtitle && <p className="text-xs text-slate-400">{subtitle}</p>}
                </div>
            </CardContent>
        </Card>
    );
}
