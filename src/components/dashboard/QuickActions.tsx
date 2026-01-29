import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, QrCode, Smartphone, Zap } from "lucide-react";

export function QuickActions() {
    const actions = [
        { label: "Transfer", icon: Zap, color: "text-amber-600", bg: "bg-amber-100" },
        { label: "Pay Bills", icon: Smartphone, color: "text-blue-600", bg: "bg-blue-100" },
        { label: "Scan QR", icon: QrCode, color: "text-purple-600", bg: "bg-purple-100" },
        { label: "Statement", icon: Copy, color: "text-green-600", bg: "bg-green-100" },
    ];

    return (
        <Card className="p-6">
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">Quick Actions</h3>
            <div className="grid grid-cols-4 gap-4">
                {actions.map((action) => (
                    <button
                        key={action.label}
                        className="flex flex-col items-center gap-3 p-4 rounded-xl hover:bg-slate-50 transition-colors group"
                    >
                        <div className={`h-12 w-12 rounded-full flex items-center justify-center ${action.bg} ${action.color} group-hover:scale-110 transition-transform`}>
                            <action.icon className="h-6 w-6" />
                        </div>
                        <span className="text-sm font-medium text-slate-700">{action.label}</span>
                    </button>
                ))}
            </div>
        </Card>
    );
}
