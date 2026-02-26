import { useEffect, useState } from 'react';
import { clsx } from 'clsx';

export default function WaterTank({ level, dark }) {
    const [animated, setAnimated] = useState(0);

    useEffect(() => {
        let frame;
        const start = performance.now();
        const duration = 1000;
        const animate = (now) => {
            const t = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - t, 3);
            setAnimated(Math.round(eased * level));
            if (t < 1) frame = requestAnimationFrame(animate);
        };
        frame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(frame);
    }, [level]);

    const color =
        animated < 25 ? '#ef4444'
            : animated < 45 ? '#f59e0b'
                : '#22c55e';

    const statusLabel =
        animated < 25 ? 'Critical – Refill Now'
            : animated < 45 ? 'Low – Schedule Refill'
                : 'Tank Level OK';

    return (
        <div className={clsx(
            'rounded-2xl p-5 glass card-hover',
            dark ? 'bg-[#161b22]/80 border border-[#21262d]' : 'bg-white/70 border border-white/60'
        )}>
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h3 className={clsx('text-sm font-semibold uppercase tracking-wide', dark ? 'text-gray-400' : 'text-gray-500')}>
                        Water Tank
                    </h3>
                    <p className="text-2xl font-bold mt-0.5" style={{ color }}>
                        {animated}<span className="text-base ml-0.5">%</span>
                    </p>
                </div>
                {/* Mini tank icon */}
                <div className={clsx(
                    'w-12 h-16 rounded-b-xl rounded-t border-2 relative overflow-hidden',
                    dark ? 'border-gray-600' : 'border-gray-300'
                )}>
                    <div
                        className="absolute bottom-0 left-0 right-0 transition-all duration-1000 ease-out"
                        style={{ height: `${animated}%`, background: color, opacity: 0.8 }}
                    />
                    {/* Wave overlay */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none"
                        style={{ top: `${100 - animated}%` }}>
                        <div
                            className="animate-wave"
                            style={{
                                width: '200%',
                                height: '8px',
                                background: `${color}60`,
                                borderRadius: '50%',
                                position: 'absolute',
                                top: '-4px',
                            }}
                        />
                    </div>
                </div>
            </div>

            {/* Bar */}
            <div className={clsx('w-full h-4 rounded-full overflow-hidden', dark ? 'bg-gray-800' : 'bg-gray-100')}>
                <div
                    className="h-full rounded-full transition-all duration-1000 ease-out relative overflow-hidden"
                    style={{ width: `${animated}%`, background: color }}
                >
                    <div className="absolute inset-0 animate-shimmer" />
                </div>
            </div>

            {/* Level markers */}
            <div className={clsx('flex justify-between text-xs mt-1', dark ? 'text-gray-500' : 'text-gray-400')}>
                <span>0%</span>
                <span>25%</span>
                <span>50%</span>
                <span>75%</span>
                <span>100%</span>
            </div>

            <div className="flex items-center gap-2 mt-3">
                <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: color }} />
                <span className="text-xs font-medium" style={{ color }}>{statusLabel}</span>
            </div>

            <div className={clsx('grid grid-cols-3 gap-2 mt-4 text-center')}>
                {[
                    { label: 'Capacity', val: '5,000 L' },
                    { label: 'Available', val: `${Math.round(level * 50)} L` },
                    { label: 'Flow Rate', val: '12 L/min' },
                ].map(({ label, val }) => (
                    <div key={label} className={clsx(
                        'rounded-xl py-2 px-1',
                        dark ? 'bg-gray-800/60' : 'bg-gray-50'
                    )}>
                        <p className="text-base font-bold" style={{ color }}>{val}</p>
                        <p className={clsx('text-xs mt-0.5', dark ? 'text-gray-500' : 'text-gray-400')}>{label}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
