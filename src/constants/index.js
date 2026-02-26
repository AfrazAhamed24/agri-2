// Application constants
export const FIELDS = [
    { id: 'f1', name: 'North Field – Wheat', area: '12.5 acres' },
    { id: 'f2', name: 'South Field – Rice', area: '8.3 acres' },
    { id: 'f3', name: 'East Plot – Vegetables', area: '4.7 acres' },
    { id: 'f4', name: 'West Block – Cotton', area: '15.1 acres' },
];

export const SENSOR_DEFAULTS = {
    f1: { moisture: 62, temperature: 28, humidity: 65, tankLevel: 74, pumpOn: true, runtimeToday: 147, waterUsed: 1764 },
    f2: { moisture: 38, temperature: 31, humidity: 70, tankLevel: 45, pumpOn: false, runtimeToday: 85, waterUsed: 1020 },
    f3: { moisture: 80, temperature: 25, humidity: 78, tankLevel: 88, pumpOn: false, runtimeToday: 12, waterUsed: 144 },
    f4: { moisture: 22, temperature: 33, humidity: 50, tankLevel: 20, pumpOn: true, runtimeToday: 210, waterUsed: 2520 },
};

export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const ALERT_LEVELS = {
    RED: 'red',
    YELLOW: 'yellow',
    GREEN: 'green',
};

export const PRIORITY_LEVELS = {
    CRITICAL: 'critical',
    WARNING: 'warning',
    INFO: 'info',
    SUCCESS: 'success',
};
