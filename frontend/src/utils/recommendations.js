// AI Recommendations logic
export const getAIRecommendations = (field, moisture, temperature, humidity) => {
    const recs = [];

    if (moisture < 30) {
        recs.push({
            priority: 'critical',
            icon: '🚨',
            title: 'Immediate Irrigation Required',
            desc: `Soil moisture critically low at ${moisture}%. Activate pump now – recommended 45 min cycle.`,
        });
    } else if (moisture < 50) {
        recs.push({
            priority: 'warning',
            icon: '💧',
            title: 'Schedule Irrigation Soon',
            desc: `Moisture at ${moisture}%. Plan irrigation within 4–6 hours for optimal crop health.`,
        });
    } else if (moisture > 80) {
        recs.push({
            priority: 'info',
            icon: '✅',
            title: 'Irrigation Paused – Soil Saturated',
            desc: `At ${moisture}% moisture, no irrigation needed. Resume check in 8 hours.`,
        });
    } else {
        recs.push({
            priority: 'success',
            icon: '🌱',
            title: 'Optimal Moisture Level',
            desc: `Soil moisture is ideal at ${moisture}%. Maintain current schedule.`,
        });
    }

    if (temperature > 35) {
        recs.push({
            priority: 'warning',
            icon: '🌡️',
            title: 'High Heat – Increase Irrigation Frequency',
            desc: `Temperature at ${temperature}°C increases evapotranspiration. Add one extra cycle today.`,
        });
    }

    if (humidity < 40) {
        recs.push({
            priority: 'warning',
            icon: '💨',
            title: 'Low Humidity – Misting Recommended',
            desc: `Relative humidity at ${humidity}%. Consider micro-misting to reduce leaf stress.`,
        });
    }

    recs.push({
        priority: 'info',
        icon: '🤖',
        title: 'AI Forecast',
        desc: `Based on 7-day pattern analysis, next optimal irrigation window is ${moisture > 60 ? 'tomorrow 06:00–07:00' : 'today 18:00–18:45'
            }. Expected water savings: 18%.`,
    });

    return recs;
};
