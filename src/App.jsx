import { useState, useEffect, useCallback } from 'react';
import { Sun, Moon, Menu, Bell, RefreshCw } from 'lucide-react';
import { clsx } from 'clsx';
import Sidebar from './components/Sidebar';
import MoistureGauge from './components/MoistureGauge';
import ClimateCards from './components/ClimateCards';
import WaterTank from './components/WaterTank';
import PumpControl from './components/PumpControl';
import FieldSelector from './components/FieldSelector';
import HistoricalCharts from './components/HistoricalCharts';
import AlertsPanel from './components/AlertsPanel';
import WeatherWidget from './components/WeatherWidget';
import AIRecommendations from './components/AIRecommendations';
import Chatbot from './components/Chatbot';
import {
  fields, sensorDefaults, generateHistory,
  getAIRecommendations, getAlerts,
} from './data';

export default function App() {
  const [dark, setDark] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedField, setSelectedField] = useState('f1');
  const [sensors, setSensors] = useState({ ...sensorDefaults });
  const [historyData, setHistoryData] = useState(generateHistory());
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [refreshing, setRefreshing] = useState(false);

  // Current field sensor values
  const current = sensors[selectedField];

  // Simulate live data updates every 30s
  useEffect(() => {
    const interval = setInterval(() => {
      setSensors(prev => {
        const next = { ...prev };
        Object.keys(next).forEach(key => {
          next[key] = {
            ...next[key],
            moisture: Math.max(10, Math.min(95, next[key].moisture + (Math.random() - 0.48) * 3)),
            temperature: Math.max(18, Math.min(42, next[key].temperature + (Math.random() - 0.5) * 1)),
            humidity: Math.max(25, Math.min(95, next[key].humidity + (Math.random() - 0.5) * 2)),
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
  const aiRecs = getAIRecommendations(
    selectedField, current.moisture, current.temperature, current.humidity
  );
  const criticalAlerts = alerts.filter(a => a.level === 'red').length;

  const timeStr = lastUpdated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  // Sensor context passed to the chatbot
  const sensorContext = {
    moisture: Math.round(current.moisture),
    temperature: Math.round(current.temperature),
    humidity: Math.round(current.humidity),
    tankLevel: current.tankLevel,
    pumpOn: current.pumpOn,
    fieldName: fields.find(f => f.id === selectedField)?.name ?? 'Unknown Field',
  };

  return (
    <div className={clsx('flex h-screen overflow-hidden', dark ? 'bg-[#0d1117] text-white' : 'bg-gradient-to-br from-green-50 to-blue-50 text-gray-900')}>

      {/* Mobile sidebar overlay */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* Sidebar – hidden on mobile, overlay on toggle */}
      <div className={clsx(
        'fixed lg:relative inset-y-0 left-0 z-50 lg:z-auto transition-transform duration-300',
        mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      )}>
        <Sidebar
          collapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(c => !c)}
          dark={dark}
          activeTab={activeTab}
          onTabChange={(tab) => { setActiveTab(tab); setMobileSidebarOpen(false); }}
        />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

        {/* Top Header */}
        <header className={clsx(
          'flex items-center gap-3 px-4 md:px-6 py-3 border-b flex-shrink-0',
          dark ? 'bg-[#0d1117]/80 border-[#21262d] backdrop-blur' : 'bg-white/80 border-gray-200 backdrop-blur'
        )}>
          {/* Mobile menu */}
          <button
            className="lg:hidden p-2 rounded-lg"
            onClick={() => setMobileSidebarOpen(true)}
          >
            <Menu className={clsx('w-5 h-5', dark ? 'text-gray-400' : 'text-gray-600')} />
          </button>

          {/* Page title */}
          <div className="flex-1 min-w-0">
            <h1 className="text-base md:text-lg font-bold truncate">
              {activeTab === 'dashboard' && '🌾 Overview Dashboard'}
              {activeTab === 'moisture' && '💧 Soil Moisture'}
              {activeTab === 'climate' && '🌡️ Climate Monitor'}
              {activeTab === 'analytics' && '📊 Analytics'}
              {activeTab === 'alerts' && '🔔 Alerts'}
              {activeTab === 'weather' && '⛅ Weather'}
              {activeTab === 'ai' && '🤖 AI Insights'}
            </h1>
            <p className={clsx('text-xs hidden sm:block', dark ? 'text-gray-500' : 'text-gray-400')}>
              Last updated: {timeStr} • Live sensor feed
            </p>
          </div>

          {/* Field selector */}
          <div className="hidden md:block">
            <FieldSelector selectedField={selectedField} onSelect={setSelectedField} dark={dark} />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleRefresh}
              className={clsx(
                'p-2 rounded-xl transition-all',
                dark ? 'hover:bg-gray-800 text-gray-400' : 'hover:bg-gray-100 text-gray-500'
              )}
              title="Refresh data"
            >
              <RefreshCw className={clsx('w-4 h-4', refreshing && 'animate-spin')} />
            </button>

            {/* Alert bell */}
            <div className="relative">
              <button className={clsx(
                'p-2 rounded-xl transition-all',
                dark ? 'hover:bg-gray-800 text-gray-400' : 'hover:bg-gray-100 text-gray-500'
              )}>
                <Bell className="w-4 h-4" />
              </button>
              {criticalAlerts > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full alert-pulse" />
              )}
            </div>

            {/* Dark/light toggle */}
            <button
              onClick={() => setDark(d => !d)}
              className={clsx(
                'p-2 rounded-xl transition-all',
                dark ? 'hover:bg-gray-800 text-yellow-400' : 'hover:bg-gray-100 text-gray-600'
              )}
              title="Toggle dark mode"
            >
              {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </header>

        {/* Mobile field selector */}
        <div className={clsx(
          'md:hidden px-4 py-2 border-b flex-shrink-0',
          dark ? 'border-[#21262d] bg-[#0d1117]' : 'border-gray-200 bg-white/60'
        )}>
          <FieldSelector selectedField={selectedField} onSelect={setSelectedField} dark={dark} />
        </div>

        {/* Scrollable page body */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="max-w-7xl mx-auto space-y-6 animate-fade-in">

            {/* ─── DASHBOARD / MOISTURE / ANALYTICS / DEFAULT ─── */}
            {(activeTab === 'dashboard' || activeTab === 'moisture' || activeTab === 'analytics') && (
              <>
                {/* Top summary KPI row */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {[
                    { label: 'Soil Moisture', val: `${Math.round(current.moisture)}%`, color: current.moisture < 30 ? '#ef4444' : current.moisture < 50 ? '#f59e0b' : '#22c55e', emoji: '💧' },
                    { label: 'Temperature', val: `${Math.round(current.temperature)}°C`, color: '#f59e0b', emoji: '🌡️' },
                    { label: 'Humidity', val: `${Math.round(current.humidity)}%`, color: '#3b82f6', emoji: '💨' },
                    { label: 'Tank Level', val: `${current.tankLevel}%`, color: current.tankLevel < 25 ? '#ef4444' : current.tankLevel < 45 ? '#f59e0b' : '#22c55e', emoji: '🪣' },
                  ].map(({ label, val, color, emoji }) => (
                    <div key={label} className={clsx(
                      'rounded-2xl p-4 glass card-hover',
                      dark ? 'bg-[#161b22]/80 border border-[#21262d]' : 'bg-white/70 border border-white/60'
                    )}>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-lg">{emoji}</span>
                        <p className={clsx('text-xs font-medium', dark ? 'text-gray-400' : 'text-gray-500')}>{label}</p>
                      </div>
                      <p className="text-2xl font-bold" style={{ color }}>{val}</p>
                    </div>
                  ))}
                </div>

                {/* Main grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Left column */}
                  <div className="space-y-6">
                    {/* Moisture gauge card */}
                    <div className={clsx(
                      'rounded-2xl p-6 glass flex flex-col items-center',
                      dark ? 'bg-[#161b22]/80 border border-[#21262d]' : 'bg-white/70 border border-white/60'
                    )}>
                      <MoistureGauge value={Math.round(current.moisture)} dark={dark} />
                    </div>
                    {/* Pump control */}
                    <PumpControl pumpOn={current.pumpOn} onToggle={handlePumpToggle} dark={dark} />
                  </div>

                  {/* Center column */}
                  <div className="space-y-6">
                    <ClimateCards
                      temperature={Math.round(current.temperature)}
                      humidity={Math.round(current.humidity)}
                      dark={dark}
                    />
                    <WaterTank level={current.tankLevel} dark={dark} />
                  </div>

                  {/* Right column */}
                  <div className="space-y-6">
                    <AlertsPanel alerts={alerts} dark={dark} />
                    <AIRecommendations recommendations={aiRecs} dark={dark} />
                  </div>
                </div>

                {/* Charts – full width */}
                <HistoricalCharts data={historyData} dark={dark} />
              </>
            )}

            {/* ─── WEATHER ─── */}
            {activeTab === 'weather' && (
              <div className="max-w-2xl mx-auto">
                <WeatherWidget dark={dark} />
              </div>
            )}

            {/* ─── ALERTS ─── */}
            {activeTab === 'alerts' && (
              <div className="max-w-2xl mx-auto">
                <AlertsPanel alerts={alerts} dark={dark} />
              </div>
            )}

            {/* ─── AI ─── */}
            {activeTab === 'ai' && (
              <div className="max-w-2xl mx-auto">
                <AIRecommendations recommendations={aiRecs} dark={dark} />
              </div>
            )}

            {/* ─── CLIMATE ─── */}
            {activeTab === 'climate' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-6">
                  <ClimateCards
                    temperature={Math.round(current.temperature)}
                    humidity={Math.round(current.humidity)}
                    dark={dark}
                  />
                </div>
                <div>
                  <WeatherWidget dark={dark} />
                </div>
              </div>
            )}
          </div>
        </main>

        {/* Footer */}
        <footer className={clsx(
          'px-6 py-2 border-t text-xs flex items-center justify-between flex-shrink-0',
          dark ? 'border-[#21262d] text-gray-600' : 'border-gray-200 text-gray-400'
        )}>
          <span>AgroSmart Irrigation • {fields.find(f => f.id === selectedField)?.name}</span>
          <span className={clsx('flex items-center gap-1.5', current.pumpOn ? 'text-green-500' : '')}>
            <span className={clsx('w-1.5 h-1.5 rounded-full', current.pumpOn ? 'bg-green-500 animate-pulse' : 'bg-gray-500')} />
            Pump {current.pumpOn ? 'Active' : 'Idle'}
          </span>
        </footer>
      </div>

      {/* Floating Chatbot – fixed position, renders over everything */}
      <Chatbot dark={dark} sensorContext={sensorContext} />
    </div>
  );
}
