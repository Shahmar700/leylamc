import axios from 'axios';

const API_URL = 'https://bytexerp.online/api';

class AuthService {
  /**
   * İstifadəçi girişi
   * @param {string} username - İstifadəçi adı
   * @param {string} password - Şifrə
   * @returns {Promise} - API cavabı
   */
  async login(username, password) {
    try {
      const response = await axios.post(`${API_URL}/token/`, { username, password });
      
      if (response.data.access) {
        // Token-ləri localStorage-də saxla
        localStorage.setItem('access_token', response.data.access);
        localStorage.setItem('refresh_token', response.data.refresh);
        localStorage.setItem('username', username);
      }
      
      return response.data;
    } catch (error) {
      throw error;
    }
  }
  
  /**
   * İstifadəçi çıxışı - bütün token-ləri təmizlə
   */
  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('username');
  }
  
  /**
   * Refresh token istifadə edərək yeni access token al
   * @returns {Promise} - Yeni access token
   */
  async refreshToken() {
    try {
      const refreshToken = localStorage.getItem('refresh_token');
      
      if (!refreshToken) {
        return Promise.reject('Yeniləmə tokeni yoxdur');
      }
      
      const response = await axios.post(`${API_URL}/token/refresh/`, {
        refresh: refreshToken
      });
      
      if (response.data.access) {
        localStorage.setItem('access_token', response.data.access);
        // Refresh token də dəyişdirilirsə:
        if (response.data.refresh) {
          localStorage.setItem('refresh_token', response.data.refresh);
        }
        return response.data;
      }
    } catch (error) {
      // Token yeniləmə zamanı xəta - istifadəçini çıxış etdirmək lazımdır
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('username');
      throw error;
    }
  }
  
  /**
   * Token-in etibarlı olub-olmadığını yoxla
   * @returns {Promise<boolean>} - Token etibarlıdırsa true
   */
  async verifyToken() {
    try {
      const token = this.getToken();
      
      if (!token) {
        return false;
      }
      
      await axios.post(`${API_URL}/token/verify/`, { token });
      return true;
    } catch (error) {
      return false;
    }
  }
  
  /**
   * Access token-i localStorage-dən al
   * @returns {string|null} - Access token
   */
  getToken() {
    return localStorage.getItem('access_token');
  }
  
  /**
   * İstifadəçi daxil olubmu yoxla
   * @returns {boolean} - İstifadəçi daxil olubsa true
   */
  isLoggedIn() {
    return !!this.getToken();
  }
  
  /**
   * Daxil olmuş istifadəçi adını al
   * @returns {string|null} - İstifadəçi adı
   */
  getUsername() {
    return localStorage.getItem('username');
  }
  
  /**
   * JWT payload-ını decode et
   * @param {string} token - JWT token
   * @returns {Object} - Decode edilmiş payload
   */
  decodeToken(token) {
    if (!token) return null;
    
    // JWT token-in payload hissəsini çıxar
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const payload = JSON.parse(window.atob(base64));
    
    return payload;
  }
}

export default new AuthService();