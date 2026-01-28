import axios from 'axios';

const axiosInstance = axios.create({
  // baseURL: process.env.API_URL || 'https://api.alvaro-dev.xyz', // Usa una variable de entorno
  baseURL: process.env.API_URL || 'http://localhost:8081', // Usa una variable de entorno
  timeout: 10000, // Tiempo máximo de espera para las solicitudes
});

// Interceptores (opcional) para manejar errores globalmente
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Axios error:', error.response || error.message);
    return Promise.reject(error);
  },
);

export default axiosInstance;
