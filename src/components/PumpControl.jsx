import { clsx } from 'clsx';
import { Power, Zap, Clock, DropletIcon } from 'lucide-react';
import { useState } from 'react';

export default function PumpControl({ pumpOn, onToggle, dark }) {
    const [runtime, setRuntime] = useState(147); // minutes today

    return (
        <div className={clsx(
            'rounded-2xl p-5 glass card-hover',
            dark ? 'bg-[#161b22]/80 border border-[#21262d]' : 'bg-white/70 border border-white/60'
        )}>
            <h3 className={clsx('text-sm font-semibold uppercase tracking-wide mb-4', dark ? 'text-gray-400' : 'text-gray-500')}>
                Pump Control
            </h3>

            <div className="flex items-center justify-between">
                {/* Status */}
                <div className="flex items-center gap-3">
                    <div className={clsx(
                        'w-14 h-14 rounded-2xl flex items-center justify-center relative',
                        pumpOn ? 'bg-green-500/20' : dark ? 'bg-gray-800' : 'bg-gray-100'
                    )}>
                        {pumpOn && (
                            <span className="absolute inset-0 rounded-2xl bg-green-500/20 animate-ping" />
                        )}
                        <Power className={clsx('w-7 h-7', pumpOn ? 'text-green-400' : 'text-gray-400')} />
                    </div>
                    <div>
                        <p className={clsx('text-xl font-bold', pumpOn ? 'text-green-400' : dark ? 'text-gray-400' : 'text-gray-500')}>
                            {pumpOn ? 'RUNNING' : 'STOPPED'}
                        </p>
                        <p className={clsx('text-xs', dark ? 'text-gray-500' : 'text-gray-400')}>
                            Main irrigation pump
                        </p>
                    </div>
                </div>

                {/* Toggle */}
                <button
                    onClick={onToggle}
                    className={clsx(
                        'relative w-16 h-8 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2',
                        pumpOn ? 'bg-green-500' : dark ? 'bg-gray-700' : 'bg-gray-300',
                        dark ? 'focus:ring-offset-gray-900' : 'focus:ring-offset-white'
                    )}
                    aria-label="Toggle pump"
                >
                    <span className={clsx(
                        'toggle-thumb absolute top-1 w-6 h-6 rounded-full shadow-md',
                        pumpOn ? 'translate-x-9 bg-white' : 'translate-x-1 bg-white'
                    )} />
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 mt-4">
                {[
                    { icon: Clock, label: 'Runtime Today', val: `${Math.floor(runtime / 60)}h ${runtime % 60}m`, color: '#8b5cf6' },
                    { icon: DropletIcon, label: 'Water Used', val: '1,764 L', color: '#3b82f6' },
                    { icon: Zap, label: 'Power Draw', val: '2.4 kW', color: '#f59e0b' },
                ].map(({ icon: Icon, label, val, color }) => (
                    <div key={label} className={clsx(
                        'rounded-xl p-3 text-center',
                        dark ? 'bg-gray-800/60' : 'bg-gray-50'
                    )}>
                        <Icon className="w-4 h-4 mx-auto mb-1" style={{ color }} />
                        <p className="text-sm font-bold" style={{ color }}>{val}</p>
                        <p className={clsx('text-xs mt-0.5 leading-tight', dark ? 'text-gray-500' : 'text-gray-400')}>{label}</p>
                    </div>
                ))}
            </div>

            {/* Schedule */}
            <div className={clsx('mt-4 rounded-xl p-3 border', dark ? 'border-green-500/20 bg-green-500/5' : 'border-green-200 bg-green-50')}>
                <p className={clsx('text-xs font-semibold', dark ? 'text-green-400' : 'text-green-700')}>
                    📅 Next scheduled run: Today 18:00 – 18:45
                </p>
            </div>
        </div>
    );
}
