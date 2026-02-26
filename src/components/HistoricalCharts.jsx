import { clsx } from 'clsx';
import {
    ResponsiveContainer, AreaChart, Area, BarChart, Bar,
    XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceArea, ReferenceLine
} from 'recharts';
import { useState } from 'react';

const tabs = [
    { en: 'Moisture' },
    { en: 'Temperature' },
    { en: 'Humidity' },
    { en: 'Rainfall' }
];

const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null;
    return (
        <div className="rounded-xl px-3 py-2 border border-dark-border bg-dark-card text-white text-xs shadow-2xl">
            <p className="font-black mb-1 flex items-baseline gap-2">
                <span>{label}</span>
                <span className="text-[10px] text-neon opacity-70 italic">{(payload[0].dataKey).toUpperCase()}</span>
            </p>
            {payload.map((p) => (
                <p key={p.dataKey} className="font-bold">
                    {p.value}<span className="text-[9px] ml-0.5 opacity-60 uppercase">{p.unit}</span>
                </p>
            ))}
        </div>
    );
};

export default function HistoricalCharts({ data }) {
    const [activeTab, setActiveTab] = useState('Moisture');
    const [range, setRange] = useState('24H');

    const displayData = range === '6H' ? data.slice(-6) : range === '12H' ? data.slice(-12) : data;

    return (
        <div className="rounded-2xl p-5 border border-dark-border bg-dark-card transition-all duration-200 overflow-hidden shadow-xl">
            {/* Header */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <div className="flex flex-col">
                    <span className="text-xs font-bold uppercase tracking-widest text-dark-muted">Historical Data</span>
                </div>

                <div className="flex items-center gap-2">
                    {['6H', '12H', '24H'].map(r => (
                        <button key={r} onClick={() => setRange(r)}
                            className={clsx(
                                'px-3 py-1 rounded-lg text-[10px] font-black tracking-widest transition-all',
                                range === r
                                    ? 'bg-neon text-black'
                                    : 'bg-dark-bg text-dark-muted hover:text-white border border-dark-border'
                            )}>
                            {r}
                        </button>
                    ))}
                </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 mb-6 flex-wrap">
                {tabs.map(tab => (
                    <button key={tab.en} onClick={() => setActiveTab(tab.en)}
                        className={clsx(
                            'px-4 py-2 rounded-xl text-[10px] font-black tracking-widest uppercase transition-all flex flex-col items-center border',
                            activeTab === tab.en
                                ? 'bg-neon/10 border-neon text-neon'
                                : 'border-dark-border text-dark-muted hover:border-white/20'
                        )}>
                        <span>{tab.en}</span>
                    </button>
                ))}
            </div>

            {/* Charts */}
            <div className="h-[40vh] min-h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                    {activeTab === 'Rainfall' ? (
                        <BarChart data={displayData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#1e1e1e" vertical={false} />
                            <XAxis dataKey="time" tick={{ fill: '#666', fontSize: 10, fontWeight: 800 }}
                                tickLine={false} axisLine={false} interval={Math.floor(displayData.length / 6)} />
                            <YAxis tick={{ fill: '#666', fontSize: 10, fontWeight: 800 }}
                                tickLine={false} axisLine={false} />
                            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.05)' }} />
                            <Bar dataKey="rainfall" name="Rainfall" unit="mm" fill="#39FF14"
                                radius={[4, 4, 0, 0]} />
                        </BarChart>
                    ) : (
                        <AreaChart data={displayData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                            <defs>
                                <linearGradient id="gradNeon" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#39FF14" stopOpacity={0.2} />
                                    <stop offset="95%" stopColor="#39FF14" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#1e1e1e" vertical={false} />
                            <XAxis dataKey="time" tick={{ fill: '#666', fontSize: 10, fontWeight: 800 }}
                                tickLine={false} axisLine={false} interval={Math.floor(displayData.length / 6)} />
                            <YAxis tick={{ fill: '#666', fontSize: 10, fontWeight: 800 }}
                                tickLine={false} axisLine={false} />
                            <Tooltip content={<CustomTooltip />} />

                            {activeTab === 'Moisture' && (
                                <>
                                    <ReferenceArea y1={50} y2={80} fill="#39FF14" fillOpacity={0.05} />
                                    {displayData.map((d, i) => {
                                        if (d.moisture < 40 && i % 4 === 0) {
                                            return <ReferenceLine key={i} x={d.time} stroke="#39FF14" strokeWidth={1} strokeDasharray="5 5" strokeOpacity={0.3} />;
                                        }
                                        return null;
                                    })}
                                    <Area dataKey="moisture" name="Moisture" unit="%" stroke="#39FF14"
                                        strokeWidth={3} fill="url(#gradNeon)" dot={false} />
                                </>
                            )}
                            {activeTab === 'Temperature' && (
                                <Area dataKey="temperature" name="Temp" unit="°C" stroke="#f59e0b"
                                    strokeWidth={3} fill="url(#gradNeon)" dot={false} />
                            )}
                            {activeTab === 'Humidity' && (
                                <Area dataKey="humidity" name="Humidity" unit="%" stroke="#39FF14"
                                    strokeWidth={3} fill="url(#gradNeon)" dot={false} />
                            )}
                        </AreaChart>
                    )}
                </ResponsiveContainer>
            </div>
        </div>
    );
}
