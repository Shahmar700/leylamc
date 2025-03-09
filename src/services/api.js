import axios from 'axios';
import authService from './auth';

const api = axios.create({
  baseURL: 'http://bytexerp.online/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Sorğu göndərilmədən əvvəl işləyən interceptor
api.interceptors.request.use(
  (config) => {
    const token = authService.getToken();
    
    // Əgər token varsa, sorğu başlıqlarına əlavə et
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Cavab alındıqdan sonra işləyən interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    
    // Token etibarsız (401 xətası) və əvvəlcədən təkrar cəhd edilməyibsə
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // Yeni token al
        const newToken = await authService.refreshToken();
        
        // Yeni token ilə sorğunu təkrarla
        originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        // Token yenilənə bilməzsə istifadəçini çıxış et
        authService.logout();
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

export default api;