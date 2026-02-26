import { clsx } from 'clsx';
import {
    ResponsiveContainer, AreaChart, Area, BarChart, Bar,
    XAxis, YAxis, CartesianGrid, Tooltip, Legend
} from 'recharts';
import { useState } from 'react';

const tabs = ['Moisture', 'Temperature', 'Humidity', 'Rainfall'];

const CustomTooltip = ({ active, payload, label, dark }) => {
    if (!active || !payload?.length) return null;
    return (
        <div className={clsx(
            'rounded-xl px-3 py-2 border text-xs shadow-xl',
            dark ? 'bg-[#161b22] border-[#21262d] text-white' : 'bg-white border-gray-200 text-gray-800'
        )}>
            <p className="font-semibold mb-1">{label}</p>
            {payload.map((p) => (
                <p key={p.dataKey} style={{ color: p.color }}>
                    {p.name}: <strong>{p.value}{p.unit}</strong>
                </p>
            ))}
        </div>
    );
};

export default function HistoricalCharts({ data, dark }) {
    const [activeTab, setActiveTab] = useState('Moisture');
    const [range, setRange] = useState('24H');

    const displayData = range === '6H' ? data.slice(-6) : range === '12H' ? data.slice(-12) : data;

    return (
        <div className={clsx(
            'rounded-2xl p-5 glass',
            dark ? 'bg-[#161b22]/80 border border-[#21262d]' : 'bg-white/70 border border-white/60'
        )}>
            {/* Header */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <h3 className={clsx('text-sm font-semibold uppercase tracking-wide', dark ? 'text-gray-400' : 'text-gray-500')}>
                    Historical Data
                </h3>
                <div className="flex items-center gap-2">
                    {/* Range selector */}
                    {['6H', '12H', '24H'].map(r => (
                        <button key={r} onClick={() => setRange(r)}
                            className={clsx(
                                'px-2.5 py-1 rounded-lg text-xs font-semibold transition-all',
                                range === r
                                    ? 'bg-green-500 text-white'
                                    : dark ? 'bg-gray-800 text-gray-400 hover:text-white' : 'bg-gray-100 text-gray-500 hover:text-gray-700'
                            )}>
                            {r}
                        </button>
                    ))}
                </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 mb-4 flex-wrap">
                {tabs.map(tab => (
                    <button key={tab} onClick={() => setActiveTab(tab)}
                        className={clsx(
                            'px-3 py-1.5 rounded-lg text-xs font-medium transition-all',
                            activeTab === tab
                                ? dark ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-green-100 text-green-700 border border-green-300'
                                : dark ? 'text-gray-500 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'
                        )}>
                        {tab}
                    </button>
                ))}
            </div>

            {/* Charts */}
            <div className="h-52">
                <ResponsiveContainer width="100%" height="100%">
                    {activeTab === 'Rainfall' ? (
                        <BarChart data={displayData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke={dark ? '#21262d' : '#f1f5f9'} />
                            <XAxis dataKey="time" tick={{ fill: dark ? '#6b7280' : '#94a3b8', fontSize: 10 }}
                                tickLine={false} axisLine={false} interval={Math.floor(displayData.length / 6)} />
                            <YAxis tick={{ fill: dark ? '#6b7280' : '#94a3b8', fontSize: 10 }}
                                tickLine={false} axisLine={false} />
                            <Tooltip content={<CustomTooltip dark={dark} />} />
                            <Bar dataKey="rainfall" name="Rainfall" unit="mm" fill="#3b82f6"
                                radius={[4, 4, 0, 0]} />
                        </BarChart>
                    ) : (
                        <AreaChart data={displayData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                            <defs>
                                <linearGradient id="gradMoisture" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="gradTemp" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="gradHumidity" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke={dark ? '#21262d' : '#f1f5f9'} />
                            <XAxis dataKey="time" tick={{ fill: dark ? '#6b7280' : '#94a3b8', fontSize: 10 }}
                                tickLine={false} axisLine={false} interval={Math.floor(displayData.length / 6)} />
                            <YAxis tick={{ fill: dark ? '#6b7280' : '#94a3b8', fontSize: 10 }}
                                tickLine={false} axisLine={false} />
                            <Tooltip content={<CustomTooltip dark={dark} />} />
                            {activeTab === 'Moisture' && (
                                <Area dataKey="moisture" name="Moisture" unit="%" stroke="#22c55e"
                                    strokeWidth={2} fill="url(#gradMoisture)" dot={false} />
                            )}
                            {activeTab === 'Temperature' && (
                                <Area dataKey="temperature" name="Temp" unit="°C" stroke="#f59e0b"
                                    strokeWidth={2} fill="url(#gradTemp)" dot={false} />
                            )}
                            {activeTab === 'Humidity' && (
                                <Area dataKey="humidity" name="Humidity" unit="%" stroke="#3b82f6"
                                    strokeWidth={2} fill="url(#gradHumidity)" dot={false} />
                            )}
                        </AreaChart>
                    )}
                </ResponsiveContainer>
            </div>
        </div>
    );
}
