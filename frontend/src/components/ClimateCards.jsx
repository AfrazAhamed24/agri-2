import { clsx } from 'clsx';
import { Thermometer, Droplets, Wind, Eye } from 'lucide-react';

function StatCard({ icon: Icon, label, value, unit, color }) {
    return (
        <div className="flex flex-col items-center justify-center p-4 border border-dark-border bg-dark-bg/20 rounded-xl transition-all duration-300 hover:border-neon/30">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-dark-bg border border-dark-border mb-2">
                <Icon className="w-4 h-4 text-neon" />
            </div>
            <p className="text-xl font-black text-white leading-none">
                {value}<span className="text-[10px] font-bold ml-0.5 opacity-60 uppercase">{unit}</span>
            </p>
            <div className="flex flex-col items-center mt-2">
                <span className="text-[9px] font-bold uppercase tracking-widest text-dark-muted leading-tight">{label}</span>
            </div>
        </div>
    );
}

export default function ClimateCards({ temperature, humidity }) {
    return (
        <div className="rounded-2xl p-5 border border-dark-border bg-dark-card transition-all duration-200 overflow-hidden shadow-xl h-full flex flex-col">
            <div className="flex flex-col mb-4">
                <span className="text-xs font-bold uppercase tracking-widest text-dark-muted">Weather Overview</span>
            </div>

            <div className="grid grid-cols-2 gap-3 flex-grow">
                <StatCard
                    icon={Thermometer}
                    label="Temperature"
                    value={temperature}
                    unit="°C"
                />
                <StatCard
                    icon={Droplets}
                    label="Humidity"
                    value={humidity}
                    unit="%"
                />
                <StatCard
                    icon={Wind}
                    label="Wind Speed"
                    value="14"
                    unit="km/h"
                />
                <StatCard
                    icon={Eye}
                    label="UV Index"
                    value="6"
                    unit="UV"
                />
            </div>
        </div>
    );
}
