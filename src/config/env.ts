export const env = {
    
    API_NAME: import.meta.env.VITE_API_NAME || 'my-project',
    API_URL: import.meta.env.VITE_API_URL || 'http://localhost:3060',
    API_TIMEOUT: Number(import.meta.env.VITE_API_TIMEOUT) || 10000,
    GOOGLE_MAP_API_KEY: String(import.meta.env.REACT_APP_GOOGLE_MAP_API_KEY) || '',

    google: {
        apiKey: String(import.meta.env.REACT_APP_GOOGLE_MAP_API_KEY) || '',
    }
};