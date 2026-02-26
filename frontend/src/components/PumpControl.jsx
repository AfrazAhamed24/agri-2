import { clsx } from 'clsx';
import { Power, Zap, Clock, DropletIcon } from 'lucide-react';
import { useState } from 'react';

export default function PumpControl({ pumpOn, onToggle, flowRate = 0, runtimeToday = 0, waterUsed = 0, dark }) {
    const powerDraw = pumpOn ? 2.4 : 0; // kW when active

    return (
        <div className="rounded-2xl p-5 border border-dark-border bg-dark-card transition-all duration-200 overflow-hidden shadow-xl">
            <div className="flex flex-col mb-4">
                <span className="text-xs font-bold uppercase tracking-widest text-dark-muted">Pump Control</span>
            </div>

            <div className="flex items-center justify-between">
                {/* Status */}
                <div className="flex items-center gap-3">
                    <div className={clsx(
                        'w-14 h-14 rounded-xl flex items-center justify-center relative border',
                        pumpOn ? 'bg-neon/10 border-neon' : 'bg-dark-bg border-dark-border'
                    )}>
                        {pumpOn && (
                            <span className="absolute inset-0 rounded-xl bg-neon/20 animate-ping" />
                        )}
                        <Power className={clsx('w-6 h-6', pumpOn ? 'text-neon' : 'text-dark-muted')} />
                    </div>
                    <div>
                        <p className={clsx('text-xl font-black tracking-tight', pumpOn ? 'text-neon' : 'text-dark-muted')}>
                            {pumpOn ? 'RUNNING' : 'STOPPED'}
                        </p>
                        <p className="text-[10px] uppercase font-bold text-dark-muted tracking-tighter">
                            Main System Pump
                        </p>
                    </div>
                </div>

                {/* Large Tactile Toggle */}
                <button
                    onClick={onToggle}
                    className={clsx(
                        'relative w-20 h-10 rounded-full transition-all duration-300 focus:outline-none shadow-inner',
                        pumpOn ? 'bg-neon' : 'bg-dark-bg border-2 border-dark-border'
                    )}
                >
                    <span className={clsx(
                        'absolute top-1 w-7 h-7 rounded-full shadow-lg transition-transform duration-300 flex items-center justify-center',
                        pumpOn ? 'translate-x-11.5 bg-black' : 'translate-x-1.5 bg-white'
                    )} style={{ transform: pumpOn ? 'translateX(44px)' : 'translateX(4px)' }}>
                        <span className={clsx('w-1 h-3 rounded-full', pumpOn ? 'bg-neon' : 'bg-gray-300')} />
                    </span>
                </button>
            </div>

            {/* FLOW RATE BAR */}
            <div className="mt-6 mb-2">
                <div className="flex justify-between items-baseline mb-2">
                    <div className="flex flex-col">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-dark-muted">Flow Rate</span>
                    </div>
                    <p className={clsx('text-2xl font-black', pumpOn ? 'text-white' : 'text-dark-muted')}>
                        {flowRate.toFixed(1)} <span className="text-sm font-bold opacity-60">L/min</span>
                    </p>
                </div>

                {/* Health Bar Wrapper */}
                <div className="w-full h-3 rounded-full bg-dark-bg relative overflow-hidden border border-dark-border">
                    <div className="absolute top-0 bottom-0 left-[50%] right-[25%] bg-neon/10 border-x border-neon/20 z-0" />
                    <div
                        className={clsx('absolute top-0 bottom-0 left-0 transition-all duration-1000 ease-out z-10', flowRate >= 10 && flowRate <= 15 ? 'bg-neon' : (pumpOn ? 'bg-red-500' : 'bg-transparent'))}
                        style={{ width: `${Math.min((flowRate / 20) * 100, 100)}%` }}
                    />
                </div>
                <div className="flex justify-between text-[9px] font-bold mt-1.5 px-1 tracking-tighter text-dark-muted uppercase">
                    <span>0</span>
                    <span className="text-neon opacity-80">10-15 L/m Optimal</span>
                    <span>20</span>
                </div>
            </div>

            {/* Stats Compact Grid */}
            <div className="grid grid-cols-2 gap-2 mt-4">
                {[
                    { label: 'Runtime', val: `${Math.floor(runtimeToday / 60)}h ${Math.floor(runtimeToday % 60)}m`, color: '#39FF14' },
                    { label: 'Power', val: `${powerDraw} kW`, color: '#39FF14' },
                ].map(({ label, val, color }) => (
                    <div key={label} className="bg-dark-bg/60 rounded-xl p-2 border border-dark-border/50 text-center">
                        <p className="text-lg font-black text-white">{val}</p>
                        <p className="text-[9px] font-bold uppercase tracking-tighter text-dark-muted mt-0.5 whitespace-pre-line">{label}</p>
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
