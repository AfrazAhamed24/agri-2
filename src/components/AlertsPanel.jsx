import { clsx } from 'clsx';
import { AlertTriangle, CheckCircle, XCircle, Info } from 'lucide-react';

const levelConfig = {
    red: {
        bg: dark => dark ? 'bg-red-500/10 border-red-500/30' : 'bg-red-50 border-red-200',
        text: dark => dark ? 'text-red-400' : 'text-red-700',
        icon: XCircle,
        dot: 'bg-red-500',
        label: 'Critical',
    },
    yellow: {
        bg: dark => dark ? 'bg-yellow-500/10 border-yellow-500/30' : 'bg-yellow-50 border-yellow-200',
        text: dark => dark ? 'text-yellow-400' : 'text-yellow-700',
        icon: AlertTriangle,
        dot: 'bg-yellow-400',
        label: 'Warning',
    },
    green: {
        bg: dark => dark ? 'bg-green-500/10 border-green-500/30' : 'bg-green-50 border-green-200',
        text: dark => dark ? 'text-green-400' : 'text-green-700',
        icon: CheckCircle,
        dot: 'bg-green-500',
        label: 'OK',
    },
};

export default function AlertsPanel({ alerts, dark }) {
    const criticalCount = alerts.filter(a => a.level === 'red').length;
    const warningCount = alerts.filter(a => a.level === 'yellow').length;

    return (
        <div className={clsx(
            'rounded-2xl p-5 glass',
            dark ? 'bg-[#161b22]/80 border border-[#21262d]' : 'bg-white/70 border border-white/60'
        )}>
            <div className="flex items-center justify-between mb-4">
                <h3 className={clsx('text-sm font-semibold uppercase tracking-wide', dark ? 'text-gray-400' : 'text-gray-500')}>
                    Alerts
                </h3>
                <div className="flex items-center gap-2">
                    {criticalCount > 0 && (
                        <span className="px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 text-xs font-bold">
                            {criticalCount} Critical
                        </span>
                    )}
                    {warningCount > 0 && (
                        <span className="px-2 py-0.5 rounded-full bg-yellow-500/20 text-yellow-400 text-xs font-bold">
                            {warningCount} Warning
                        </span>
                    )}
                </div>
            </div>

            <div className="space-y-2">
                {alerts.map((alert, i) => {
                    const cfg = levelConfig[alert.level];
                    const Icon = cfg.icon;
                    return (
                        <div
                            key={i}
                            className={clsx(
                                'flex items-center gap-3 px-3 py-2.5 rounded-xl border transition-all',
                                cfg.bg(dark),
                                alert.level === 'red' && 'alert-pulse'
                            )}
                        >
                            <Icon className={clsx('w-4 h-4 flex-shrink-0', cfg.text(dark))} />
                            <p className={clsx('text-xs font-medium flex-1', cfg.text(dark))}>{alert.msg}</p>
                            <span className={clsx(
                                'text-xs px-1.5 py-0.5 rounded font-semibold flex-shrink-0',
                                dark ? 'bg-black/20' : 'bg-black/5',
                                cfg.text(dark)
                            )}>
                                {cfg.label}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
