// Alert utilities
export const getAlerts = (moisture, temperature, humidity, tankLevel) => {
    const alerts = [];

    // Check for Leak first (priority)
    if (tankLevel < 10) {
        alerts.push({ level: 'red', msg: 'LEAK DETECTED', priority: true });
    }

    if (tankLevel < 25)
        alerts.push({ level: 'red', msg: `Water tank critically low (${tankLevel}%)` });
    else if (tankLevel < 40)
        alerts.push({ level: 'yellow', msg: `Water tank at ${tankLevel}%` });

    if (moisture < 25)
        alerts.push({ level: 'red', msg: `Critical: Soil moisture at ${moisture}%` });
    else if (moisture < 40)
        alerts.push({ level: 'yellow', msg: `Low soil moisture detected: ${moisture}%` });
    else
        alerts.push({ level: 'green', msg: `Soil moisture healthy: ${moisture}%` });

    if (temperature > 38)
        alerts.push({ level: 'red', msg: `Extreme heat alert: ${temperature}°C` });
    else if (temperature > 33)
        alerts.push({ level: 'yellow', msg: `High temperature: ${temperature}°C` });

    if (humidity < 35)
        alerts.push({ level: 'yellow', msg: `Low humidity: ${humidity}%` });

    return alerts;
};
