import { clsx } from 'clsx';
import { AlertTriangle, CheckCircle, XCircle, Info } from 'lucide-react';

const levelConfig = {
    red: {
        bg: 'bg-red-600/20 border-red-500',
        text: 'text-red-400 font-black',
        icon: XCircle,
        label: 'CRITICAL',
    },
    yellow: {
        bg: 'bg-yellow-500/10 border-yellow-500/30',
        text: 'text-yellow-400 font-bold',
        icon: AlertTriangle,
        label: 'WARNING',
    },
    green: {
        bg: 'bg-neon/10 border-neon/30',
        text: 'text-neon font-bold',
        icon: CheckCircle,
        label: 'HEALTHY',
    },
};

export default function AlertsPanel({ alerts }) {
    // Sort alerts: Priority first, then level (red > yellow > green)
    const sortedAlerts = [...alerts].sort((a, b) => {
        if (a.priority) return -1;
        if (b.priority) return 1;
        const weights = { red: 0, yellow: 1, green: 2 };
        return weights[a.level] - weights[b.level];
    });

    return (
        <div className="rounded-2xl p-5 border border-dark-border bg-dark-card transition-all duration-200 overflow-hidden shadow-xl h-full flex flex-col">
            <div className="flex items-center justify-between mb-4">
                <div className="flex flex-col">
                    <span className="text-xs font-bold uppercase tracking-widest text-dark-muted">System Alerts</span>
                </div>
            </div>

            <div className="space-y-2 flex-grow overflow-y-auto pr-1 custom-scrollbar">
                {sortedAlerts.map((alert, i) => {
                    const cfg = levelConfig[alert.level];
                    const Icon = cfg.icon;
                    return (
                        <div
                            key={i}
                            className={clsx(
                                'flex items-center gap-3 p-3 rounded-xl border transition-all',
                                cfg.bg,
                                alert.level === 'red' && 'alert-pulse shadow-[0_0_15px_rgba(239,68,68,0.2)]'
                            )}
                        >
                            <div className={clsx('w-8 h-8 rounded-lg flex items-center justify-center bg-black/40 border border-white/10 flex-shrink-0')}>
                                <Icon className={clsx('w-5 h-5', cfg.text)} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className={clsx('text-[13px] leading-tight mb-0.5', cfg.text)}>{alert.msg}</p>
                                <div className="flex items-center gap-2 opacity-60">
                                    <span className="text-[9px] font-black tracking-tighter uppercase">{cfg.label}</span>
                                </div>
                            </div>
                        </div>
                    );
                })}
                {sortedAlerts.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-8 opacity-40">
                        <CheckCircle className="w-10 h-10 text-neon mb-2" />
                        <p className="text-xs font-bold uppercase tracking-widest">System Clear</p>
                    </div>
                )}
            </div>
        </div>
    );
}
