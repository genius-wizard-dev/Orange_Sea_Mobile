import axios from "axios";

const authServiceInstance = axios.create({
    baseURL: "http://192.168.243.8:8000", 
    timeout: 10000, // Add timeout
});

authServiceInstance.interceptors.response.use(
    response => response,
    error => {
        if (error.code === 'ECONNABORTED') {
            error.customMessage = 'Request timed out. Please check your connection.';
        } else if (error.message === 'Network Error') {
            error.customMessage = 'Unable to connect to server. Please check your internet connection.';
        } else if (error.response) {
            error.customMessage = error.response.data?.message || 'Server error occurred';
        } else {
            error.customMessage = 'An unexpected error occurred';
        }
        
        console.error('API Error:', {
            endpoint: error.config?.url,
            method: error.config?.method,
            message: error.customMessage,
            originalError: error.message
        });

        return Promise.reject(error);
    }
);

export default authServiceInstance;
