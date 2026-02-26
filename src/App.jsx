import { useState, useEffect, useCallback } from 'react';
import { RefreshCw } from 'lucide-react';
import { clsx } from 'clsx';
import MoistureGauge from './components/MoistureGauge';
import ClimateCards from './components/ClimateCards';
import WaterTank from './components/WaterTank';
import PumpControl from './components/PumpControl';
import FieldSelector from './components/FieldSelector';
import HistoricalCharts from './components/HistoricalCharts';
import AlertsPanel from './components/AlertsPanel';
import Chatbot from './components/Chatbot';
import {
  fields, sensorDefaults, generateHistory,
  getAIRecommendations, getAlerts,
} from './data';

export default function App() {
  const [selectedField, setSelectedField] = useState('f1');
  const [sensors, setSensors] = useState({ ...sensorDefaults });
  const [historyData, setHistoryData] = useState(generateHistory());
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [refreshing, setRefreshing] = useState(false);

  // Current field sensor values
  const current = sensors[selectedField];

  // Simulate live data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setSensors(prev => {
        const next = { ...prev };
        Object.keys(next).forEach(key => {
          const isPumpActive = next[key].pumpOn;
          next[key] = {
            ...next[key],
            moisture: Math.max(10, Math.min(95, next[key].moisture + (isPumpActive ? 2.5 : -1.2) + (Math.random() - 0.5) * 1)),
            temperature: Math.max(18, Math.min(42, next[key].temperature + (Math.random() - 0.5) * 1)),
            humidity: Math.max(25, Math.min(95, next[key].humidity + (Math.random() - 0.5) * 2)),
            runtimeToday: isPumpActive ? (next[key].runtimeToday || 0) + 0.5 : (next[key].runtimeToday || 0),
            waterUsed: isPumpActive ? (next[key].waterUsed || 0) + 6 : (next[key].waterUsed || 0),
          };
          next[key].moisture = Math.round(next[key].moisture);
          next[key].temperature = Math.round(next[key].temperature);
          next[key].humidity = Math.round(next[key].humidity);
        });
        return next;
      });
      setLastUpdated(new Date());
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setHistoryData(generateHistory());
      setLastUpdated(new Date());
      setRefreshing(false);
    }, 800);
  }, []);

  const handlePumpToggle = useCallback(() => {
    setSensors(prev => ({
      ...prev,
      [selectedField]: { ...prev[selectedField], pumpOn: !prev[selectedField].pumpOn },
    }));
  }, [selectedField]);

  const alerts = getAlerts(
    current.moisture, current.temperature, current.humidity, current.tankLevel
  );

  const timeStr = lastUpdated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  // Chatbot Context
  const sensorContext = {
    moisture: Math.round(current.moisture),
    temperature: Math.round(current.temperature),
    humidity: Math.round(current.humidity),
    tankLevel: current.tankLevel,
    pumpOn: current.pumpOn,
    fieldName: fields.find(f => f.id === selectedField)?.name ?? 'Unknown',
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-dark-bg text-white font-sans selection:bg-neon/30">

      {/* TOP BAR / HEADER */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-dark-card z-30 shrink-0">
        <div className="flex items-center gap-6">
          <div className="flex flex-col">
            <h1 className="text-xl font-black tracking-tighter uppercase text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-neon animate-pulse" />
              AgroSmart Control Center
            </h1>
          </div>
          <div className="h-10 w-[1px] bg-white/10" />
          <div className="flex flex-col">
            <p className="text-[10px] font-bold text-dark-muted uppercase tracking-widest">System Live</p>
            <p className="text-[11px] font-medium text-neon">Last Updated: {timeStr}</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={handleRefresh}
            className="p-2.5 rounded-xl border border-white/10 bg-white/5 hover:border-neon/50 transition-all group"
          >
            <RefreshCw className={clsx("w-5 h-5 text-dark-muted group-hover:text-neon", refreshing && "animate-spin")} />
          </button>
          <FieldSelector selectedField={selectedField} onSelect={setSelectedField} />
        </div>
      </header>

      {/* DASHBOARD GRID */}
      <main className="flex-1 flex flex-col overflow-hidden">

        {/* TOP 60% - LIVE MONITORS */}
        <section className="h-[60%] grid grid-cols-4 gap-4 p-4 min-h-[400px]">

          {/* Column 1: Core Vitals */}
          <MoistureGauge value={Math.round(current.moisture)} />

          {/* Column 2: System Health */}
          <div className="flex flex-col gap-4">
            <div className="flex-1 min-h-0">
              <WaterTank level={current.tankLevel} />
            </div>
            <div className="flex-1 min-h-0">
              <PumpControl
                pumpOn={current.pumpOn}
                onToggle={handlePumpToggle}
                flowRate={current.pumpOn ? 12.4 : 0}
                runtimeToday={current.runtimeToday}
                waterUsed={current.waterUsed}
              />
            </div>
          </div>

          {/* Column 3: Weather */}
          <ClimateCards
            temperature={Math.round(current.temperature)}
            humidity={Math.round(current.humidity)}
          />

          {/* Column 4: Alerts */}
          <AlertsPanel alerts={alerts} />

        </section>

        {/* BOTTOM 40% - HISTORICAL ANALYSIS */}
        <section className="h-[40%] px-4 pb-4">
          <HistoricalCharts data={historyData} />
        </section>

      </main>

      {/* Floating Chatbot */}
      <Chatbot dark={true} sensorContext={sensorContext} />

      {/* Simple Status Footer */}
      <footer className="px-6 py-2 border-t border-white/5 bg-black/20 text-[10px] uppercase font-bold tracking-widest text-dark-muted flex justify-between items-center z-30 shrink-0">
        <div className="flex items-center gap-4">
          <span>{fields.find(f => f.id === selectedField)?.name}</span>
          <span className="w-1 h-1 rounded-full bg-white/20" />
          <span>Real-time Telemetry Enabled</span>
        </div>
        <div className="flex items-center gap-2">
          <span className={clsx("w-2 h-2 rounded-full", current.pumpOn ? "bg-neon shadow-[0_0_8px_#39FF14]" : "bg-white/20")} />
          <span>Pump Status: {current.pumpOn ? "Active" : "Idle"}</span>
        </div>
      </footer>
    </div>
  );
}
