import { useEffect, useState } from 'react';
import { clsx } from 'clsx';

function polarToCartesian(cx, cy, r, angleDeg) {
    const rad = ((angleDeg - 90) * Math.PI) / 180;
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function describeArc(cx, cy, r, startAngle, endAngle) {
    const s = polarToCartesian(cx, cy, r, endAngle);
    const e = polarToCartesian(cx, cy, r, startAngle);
    const large = endAngle - startAngle <= 180 ? '0' : '1';
    return `M ${s.x} ${s.y} A ${r} ${r} 0 ${large} 0 ${e.x} ${e.y}`;
}

export default function MoistureGauge({ value, dark }) {
    const [animated, setAnimated] = useState(0);

    useEffect(() => {
        let frame;
        const start = performance.now();
        const duration = 1200;
        const animate = (now) => {
            const t = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - t, 3);
            setAnimated(Math.round(eased * value));
            if (t < 1) frame = requestAnimationFrame(animate);
        };
        frame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(frame);
    }, [value]);

    const cx = 100, cy = 100, r = 75;
    const startAngle = -220;
    const endAngle = 40;
    const range = endAngle - startAngle;
    const currentAngle = startAngle + (range * animated) / 100;

    const color =
        animated < 30 ? '#ef4444'
            : animated < 50 ? '#f59e0b'
                : '#39FF14';

    const bgColor = dark ? '#21262d' : '#e2e8f0';
    const trackPath = describeArc(cx, cy, r, startAngle, endAngle);
    const valuePath = describeArc(cx, cy, r, startAngle, currentAngle);

    const label =
        animated < 30 ? 'Critical'
            : animated < 50 ? 'Low'
                : animated < 80 ? 'Optimal'
                    : 'Saturated';

    return (
        <div className="flex flex-col items-center">
            <div className="relative w-48 h-48 flex items-center justify-center">
                <svg width="200" height="200" viewBox="0 0 200 200" className="absolute inset-0">
                    {/* Background track */}
                    <path d={trackPath} fill="none" stroke={bgColor} strokeWidth="14" strokeLinecap="round" />
                    {/* Value arc */}
                    <path d={valuePath} fill="none" stroke={color} strokeWidth="14" strokeLinecap="round"
                        style={{ filter: `drop-shadow(0 0 6px ${color}80)` }} />
                    {/* Tick marks */}
                    {[0, 25, 50, 75, 100].map((tick) => {
                        const angle = startAngle + (range * tick) / 100;
                        const inner = polarToCartesian(cx, cy, r - 10, angle);
                        const outer = polarToCartesian(cx, cy, r + 4, angle);
                        return (
                            <line key={tick} x1={inner.x} y1={inner.y} x2={outer.x} y2={outer.y}
                                stroke={dark ? '#374151' : '#94a3b8'} strokeWidth="2" strokeLinecap="round" />
                        );
                    })}
                </svg>

                {/* Center text */}
                <div className="flex flex-col items-center z-10">
                    <span className="text-4xl font-bold" style={{ color }}>{animated}</span>
                    <span className={clsx('text-sm font-medium', dark ? 'text-gray-400' : 'text-gray-500')}>%</span>
                    <span className="text-xs font-semibold mt-1 px-2 py-0.5 rounded-full"
                        style={{ background: `${color}20`, color }}>
                        {label}
                    </span>
                </div>
            </div>

            <div className="flex flex-col items-center mt-4">
                <span className="text-sm font-bold tracking-tight text-white uppercase">Soil Moisture</span>
            </div>

            <p className="text-[10px] font-bold text-neon mt-1 uppercase tracking-widest opacity-80 transition-opacity">
                Optimal: 50% - 80%
            </p>
        </div>
    );
}
