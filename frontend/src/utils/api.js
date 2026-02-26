// API utilities
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const chatWithAI = async (message, sensorContext) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/chat`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message,
                sensorContext,
            }),
        });

        const data = await response.json();
        
        // Return data regardless of status - let caller handle errors
        if (!response.ok) {
            return { error: data.error || `HTTP ${response.status}: ${response.statusText}` };
        }

        return data;
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
