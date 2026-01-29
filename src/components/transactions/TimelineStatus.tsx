import { cn } from '@/utils/cn';

interface TimelineStep {
    status: 'completed' | 'current' | 'pending' | 'failed';
    label: string;
    timestamp?: string;
}

interface TimelineStatusProps {
    steps: TimelineStep[];
}

export function TimelineStatus({ steps }: TimelineStatusProps) {
    if (!steps || steps.length === 0) return null;

    return (
        <div className="flex items-center gap-1 w-full max-w-[200px]">
            {steps.map((step, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center group relative">
                    <div
                        className={cn(
                            "w-full h-1.5 rounded-full transition-all duration-300",
                            step.status === 'completed' ? "bg-green-500" :
                                step.status === 'failed' ? "bg-red-500" :
                                    step.status === 'current' ? "bg-amber-400 animate-pulse" :
                                        "bg-slate-200"
                        )}
                    />
                    {/* Tooltip on hover */}
                    <div className="absolute bottom-3 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-800 text-white text-[10px] px-2 py-1 rounded shadow-lg whitespace-nowrap z-10 pointer-events-none">
                        {step.label}
                        {step.timestamp && <span className="block opacity-75">{step.timestamp}</span>}
                    </div>
                </div>
            ))}
        </div>
    );
}
