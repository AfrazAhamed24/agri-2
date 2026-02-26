// Environment configuration
export const config = {
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  openaiApiKey: process.env.OPENAI_API_KEY,
  corsOrigin: process.env.CORS_ORIGIN || '*',
};

export const validateEnv = () => {
  if (!config.openaiApiKey) {
    throw new Error('OPENAI_API_KEY is not defined');
  }
};
