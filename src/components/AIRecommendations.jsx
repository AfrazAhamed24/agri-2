import { clsx } from 'clsx';

const priorityConfig = {
    critical: {
        bg: dark => dark ? 'bg-red-900/20 border-red-500/40' : 'bg-red-50 border-red-300',
        badge: 'bg-red-500/20 text-red-400',
        border: 'border-l-4 border-l-red-500',
        label: 'CRITICAL',
    },
    warning: {
        bg: dark => dark ? 'bg-yellow-900/20 border-yellow-500/40' : 'bg-yellow-50 border-yellow-300',
        badge: 'bg-yellow-500/20 text-yellow-400',
        border: 'border-l-4 border-l-yellow-500',
        label: 'WARNING',
    },
    success: {
        bg: dark => dark ? 'bg-green-900/20 border-green-500/40' : 'bg-green-50 border-green-300',
        badge: 'bg-green-500/20 text-green-400',
        border: 'border-l-4 border-l-green-500',
        label: 'GOOD',
    },
    info: {
        bg: dark => dark ? 'bg-blue-900/20 border-blue-500/40' : 'bg-blue-50 border-blue-300',
        badge: 'bg-blue-500/20 text-blue-400',
        border: 'border-l-4 border-l-blue-500',
        label: 'INFO',
    },
};

export default function AIRecommendations({ recommendations, dark }) {
    return (
        <div className={clsx(
            'rounded-2xl p-5 glass',
            dark ? 'bg-[#161b22]/80 border border-[#21262d]' : 'bg-white/70 border border-white/60'
        )}>
            <div className="flex items-center gap-2 mb-4">
                <div className={clsx(
                    'w-7 h-7 rounded-lg flex items-center justify-center text-sm',
                    dark ? 'bg-purple-500/20' : 'bg-purple-100'
                )}>
                    🤖
                </div>
                <h3 className={clsx('text-sm font-semibold uppercase tracking-wide', dark ? 'text-gray-400' : 'text-gray-500')}>
                    AI Recommendations
                </h3>
                <span className={clsx(
                    'ml-auto text-xs px-2 py-0.5 rounded-full font-semibold',
                    dark ? 'bg-purple-500/20 text-purple-400' : 'bg-purple-100 text-purple-700'
                )}>
                    GPT-Agro v3
                </span>
            </div>

            <div className="space-y-3">
                {recommendations.map((rec, i) => {
                    const cfg = priorityConfig[rec.priority];
                    return (
                        <div
                            key={i}
                            className={clsx(
                                'rounded-xl p-3 border transition-all duration-300 card-hover',
                                cfg.bg(dark),
                                cfg.border,
                            )}
                            style={{ animationDelay: `${i * 100}ms` }}
                        >
                            <div className="flex items-start gap-2">
                                <span className="text-xl flex-shrink-0 mt-0.5">{rec.icon}</span>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <p className={clsx('text-xs font-bold', dark ? 'text-white' : 'text-gray-800')}>
                                            {rec.title}
                                        </p>
                                        <span className={clsx('text-xs px-1.5 py-0.5 rounded font-semibold flex-shrink-0', cfg.badge)}>
                                            {cfg.label}
                                        </span>
                                    </div>
                                    <p className={clsx('text-xs leading-relaxed', dark ? 'text-gray-400' : 'text-gray-600')}>
                                        {rec.desc}
                                    </p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className={clsx(
                'mt-4 flex items-center gap-2 text-xs p-2.5 rounded-xl',
                dark ? 'bg-purple-500/5 border border-purple-500/20' : 'bg-purple-50 border border-purple-200'
            )}>
                <span className="text-purple-400">✨</span>
                <span className={clsx(dark ? 'text-purple-300' : 'text-purple-700')}>
                    AI model analyzes soil, climate & crop data for precision irrigation.
                    Estimated water savings: <strong>18–23%</strong>
                </span>
            </div>
        </div>
    );
}
