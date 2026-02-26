// API utilities
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const chatWithAI = async (message, sensorContext) => {
    try {
        const response = await fetch(`${API_BASE_URL}/chat`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message,
                sensorContext,
            }),
        });

        if (!response.ok) {
            throw new Error('API Error: ' + response.statusText);
        }

        return await response.json();
    } catch (error) {
        console.error('Chat API error:', error);
        throw error;
    }
};

export const healthCheck = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/health`);
        return await response.json();
    } catch (error) {
        console.error('Health check failed:', error);
        return { status: 'offline' };
    }
};
