// Sensor data utilities
export const fields = [
    { id: 'f1', name: 'North Field – Wheat', area: '12.5 acres' },
    { id: 'f2', name: 'South Field – Rice', area: '8.3 acres' },
    { id: 'f3', name: 'East Plot – Vegetables', area: '4.7 acres' },
    { id: 'f4', name: 'West Block – Cotton', area: '15.1 acres' },
];

export const sensorDefaults = {
    f1: { moisture: 62, temperature: 28, humidity: 65, tankLevel: 74, pumpOn: true, runtimeToday: 147, waterUsed: 1764 },
    f2: { moisture: 38, temperature: 31, humidity: 70, tankLevel: 45, pumpOn: false, runtimeToday: 85, waterUsed: 1020 },
    f3: { moisture: 80, temperature: 25, humidity: 78, tankLevel: 88, pumpOn: false, runtimeToday: 12, waterUsed: 144 },
    f4: { moisture: 22, temperature: 33, humidity: 50, tankLevel: 20, pumpOn: true, runtimeToday: 210, waterUsed: 2520 },
};

export const generateHistory = () => {
    const now = new Date();
    return Array.from({ length: 24 }, (_, i) => {
        const t = new Date(now.getTime() - (23 - i) * 3600000);
        const hour = `${t.getHours().toString().padStart(2, '0')}:00`;
        return {
            time: hour,
            moisture: Math.round(40 + Math.sin(i / 4) * 20 + Math.random() * 8),
            temperature: Math.round(24 + Math.cos(i / 6) * 6 + Math.random() * 2),
            humidity: Math.round(55 + Math.sin(i / 5 + 1) * 15 + Math.random() * 5),
            rainfall: i % 8 === 0 ? Math.round(Math.random() * 12) : 0,
        };
    });
};

export const weatherData = {
    condition: 'Partly Cloudy',
    icon: '⛅',
    temp: 29,
    feelsLike: 31,
    wind: '14 km/h NE',
    uvIndex: 6,
    rainChance: 20,
    forecast: [
        { day: 'Today', icon: '⛅', high: 29, low: 21, rain: 20 },
        { day: 'Thu', icon: '☀️', high: 32, low: 23, rain: 5 },
        { day: 'Fri', icon: '🌧️', high: 26, low: 19, rain: 75 },
        { day: 'Sat', icon: '⛈️', high: 24, low: 18, rain: 85 },
        { day: 'Sun', icon: '🌤️', high: 28, low: 20, rain: 15 },
    ],
};
