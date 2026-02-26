import { clsx } from 'clsx';
import { weatherData } from '../data';

export default function WeatherWidget({ dark }) {
    const { condition, icon, temp, feelsLike, wind, uvIndex, rainChance, forecast } = weatherData;

    return (
        <div className={clsx(
            'rounded-2xl overflow-hidden glass',
            dark ? 'bg-[#161b22]/80 border border-[#21262d]' : 'bg-white/70 border border-white/60'
        )}>
            {/* Hero section with gradient */}
            <div className={clsx(
                'px-5 pt-5 pb-4',
                dark
                    ? 'bg-gradient-to-br from-blue-900/40 to-green-900/40'
                    : 'bg-gradient-to-br from-blue-50 to-green-50'
            )}>
                <div className="flex items-start justify-between">
                    <div>
                        <p className={clsx('text-xs font-semibold uppercase tracking-wide mb-1', dark ? 'text-gray-400' : 'text-gray-500')}>
                            Weather
                        </p>
                        <div className="flex items-end gap-2">
                            <span className="text-5xl font-bold" style={{ color: dark ? '#93c5fd' : '#1d4ed8' }}>
                                {temp}°
                            </span>
                            <span className="text-4xl mb-1">{icon}</span>
                        </div>
                        <p className={clsx('text-sm mt-1', dark ? 'text-gray-400' : 'text-gray-600')}>{condition}</p>
                    </div>
                    <div className={clsx('flex flex-col gap-1 text-right text-xs', dark ? 'text-gray-500' : 'text-gray-400')}>
                        <span>Feels {feelsLike}°C</span>
                        <span>💨 {wind}</span>
                        <span>☂️ {rainChance}% rain</span>
                        <span>☀️ UV {uvIndex}</span>
                    </div>
                </div>
            </div>

            {/* 5-day forecast */}
            <div className="px-5 py-3">
                <div className="flex justify-between gap-1">
                    {forecast.map((day) => (
                        <div key={day.day} className={clsx(
                            'flex-1 flex flex-col items-center gap-1 py-2 rounded-xl text-center',
                            dark ? 'hover:bg-gray-800/60' : 'hover:bg-gray-50',
                            'transition-all'
                        )}>
                            <p className={clsx('text-xs font-semibold', dark ? 'text-gray-400' : 'text-gray-500')}>{day.day}</p>
                            <span className="text-xl">{day.icon}</span>
                            <p className={clsx('text-xs font-bold', dark ? 'text-white' : 'text-gray-800')}>{day.high}°</p>
                            <p className={clsx('text-xs', dark ? 'text-gray-500' : 'text-gray-400')}>{day.low}°</p>
                            <div className="w-full h-1 rounded-full overflow-hidden" style={{ background: dark ? '#1f2937' : '#e5e7eb' }}>
                                <div className="h-full rounded-full bg-blue-400" style={{ width: `${day.rain}%` }} />
                            </div>
                            <p className="text-xs text-blue-400">{day.rain}%</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
