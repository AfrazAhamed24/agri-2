import { clsx } from 'clsx';
import {
    LayoutDashboard, Droplets, Thermometer, BarChart2, Bell,
    Cloud, Cpu, ChevronLeft, Menu, Leaf
} from 'lucide-react';

const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'moisture', label: 'Soil Moisture', icon: Droplets },
    { id: 'climate', label: 'Climate', icon: Thermometer },
    { id: 'analytics', label: 'Analytics', icon: BarChart2 },
    { id: 'alerts', label: 'Alerts', icon: Bell },
    { id: 'weather', label: 'Weather', icon: Cloud },
    { id: 'ai', label: 'AI Insights', icon: Cpu },
];

export default function Sidebar({ collapsed, onToggle, dark, activeTab, onTabChange }) {
    return (
        <aside
            className={clsx(
                'h-screen flex flex-col transition-all duration-300 ease-in-out flex-shrink-0 relative',
                collapsed ? 'w-16' : 'w-60',
                dark
                    ? 'bg-[#0d1117] border-r border-[#21262d]'
                    : 'bg-gradient-to-b from-green-900 to-green-800 border-r border-green-700'
            )}
        >
            {/* Logo */}
            <div className={clsx(
                'flex items-center gap-3 px-4 py-5 border-b transition-all',
                dark ? 'border-[#21262d]' : 'border-green-700/50'
            )}>
                <div className="w-9 h-9 rounded-xl bg-green-500 flex items-center justify-center flex-shrink-0 shadow-lg shadow-green-500/30">
                    <Leaf className="w-5 h-5 text-white" />
                </div>
                {!collapsed && (
                    <div className="animate-fade-in">
                        <p className="text-white font-bold text-lg leading-none">AgroSmart</p>
                        <p className={clsx('text-xs mt-0.5', dark ? 'text-green-400' : 'text-green-300')}>Irrigation AI</p>
                    </div>
                )}
            </div>

            {/* Nav */}
            <nav className="flex-1 py-4 overflow-y-auto">
                {navItems.map(({ id, label, icon: Icon }) => (
                    <button
                        key={id}
                        onClick={() => onTabChange(id)}
                        className={clsx(
                            'w-full flex items-center gap-3 px-4 py-3 mb-1 transition-all duration-200 relative group',
                            activeTab === id
                                ? dark
                                    ? 'bg-green-500/20 text-green-400'
                                    : 'bg-white/20 text-white'
                                : dark
                                    ? 'text-gray-400 hover:text-green-400 hover:bg-green-500/10'
                                    : 'text-green-200 hover:text-white hover:bg-white/10'
                        )}
                    >
                        {activeTab === id && (
                            <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 bg-green-400 rounded-r-full" />
                        )}
                        <Icon className="w-5 h-5 flex-shrink-0" />
                        {!collapsed && (
                            <span className="text-sm font-medium animate-fade-in">{label}</span>
                        )}
                        {collapsed && (
                            <div className={clsx(
                                'absolute left-14 z-50 px-2 py-1 rounded-lg text-xs font-medium pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap',
                                dark ? 'bg-gray-800 text-white' : 'bg-green-900 text-white'
                            )}>
                                {label}
                            </div>
                        )}
                    </button>
                ))}
            </nav>

            {/* Collapse toggle */}
            <button
                onClick={onToggle}
                className={clsx(
                    'absolute -right-3 top-7 w-6 h-6 rounded-full border flex items-center justify-center transition-all z-10',
                    dark
                        ? 'bg-[#161b22] border-[#21262d] text-gray-400 hover:text-green-400'
                        : 'bg-green-700 border-green-600 text-green-200 hover:text-white'
                )}
            >
                <ChevronLeft className={clsx('w-3 h-3 transition-transform', collapsed && 'rotate-180')} />
            </button>

            {/* Bottom version */}
            {!collapsed && (
                <div className={clsx('px-4 py-3 border-t text-xs', dark ? 'border-[#21262d] text-gray-600' : 'border-green-700/50 text-green-400/60')}>
                    v2.4.1 • Live Data
                </div>
            )}
        </aside>
    );
}
