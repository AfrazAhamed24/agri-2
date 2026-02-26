import { clsx } from 'clsx';
import { Thermometer, Droplets, Wind, Eye } from 'lucide-react';

function StatCard({ icon: Icon, label, value, unit, color, dark, trend }) {
    return (
        <div className={clsx(
            'relative rounded-2xl p-5 card-hover overflow-hidden transition-all duration-300',
            dark
                ? 'bg-[#161b22]/80 border border-[#21262d] hover:border-green-500/30'
                : 'bg-white/70 border border-white/60 hover:border-green-300',
            'glass'
        )}>
            {/* Background blob */}
            <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full opacity-10"
                style={{ background: color }} />

            <div className="flex items-start justify-between">
                <div className={clsx(
                    'w-10 h-10 rounded-xl flex items-center justify-center',
                )} style={{ background: `${color}20` }}>
                    <Icon className="w-5 h-5" style={{ color }} />
                </div>
                {trend && (
                    <span className={clsx(
                        'text-xs font-semibold px-2 py-0.5 rounded-full',
                        trend > 0
                            ? 'bg-red-500/10 text-red-400'
                            : 'bg-green-500/10 text-green-400'
                    )}>
                        {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}{unit}
                    </span>
                )}
            </div>

            <div className="mt-3">
                <p className="text-3xl font-bold" style={{ color }}>
                    {value}
                    <span className="text-lg font-medium ml-1 opacity-70">{unit}</span>
                </p>
                <p className={clsx('text-sm mt-1 font-medium', dark ? 'text-gray-400' : 'text-gray-500')}>{label}</p>
            </div>
        </div>
    );
}

export default function ClimateCards({ temperature, humidity, dark }) {
    return (
        <div className="grid grid-cols-2 gap-4">
            <StatCard
                icon={Thermometer}
                label="Temperature"
                value={temperature}
                unit="°C"
                color="#f59e0b"
                dark={dark}
                trend={temperature > 30 ? +2 : -1}
            />
            <StatCard
                icon={Droplets}
                label="Humidity"
                value={humidity}
                unit="%"
                color="#3b82f6"
                dark={dark}
                trend={humidity > 60 ? +3 : -2}
            />
            <StatCard
                icon={Wind}
                label="Wind Speed"
                value="14"
                unit="km/h"
                color="#8b5cf6"
                dark={dark}
            />
            <StatCard
                icon={Eye}
                label="UV Index"
                value="6"
                unit=" UV"
                color="#ef4444"
                dark={dark}
            />
        </div>
    );
}
