import { defineStore } from 'pinia';
import authService from '@/services/auth';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isLoggedIn: authService.isLoggedIn(),
    username: authService.getUsername() || null
  }),
  
  getters: {
    // İstifadəçinin giriş etdiyini yoxlayır
    userIsAuthenticated: (state) => state.isLoggedIn,
    
    // İstifadəçi adını qaytarır
    currentUsername: (state) => state.username,
  },
  
  actions: {
    // İstifadəçi girişi
    async login(username, password) {
      try {
        const response = await authService.login(username, password);
        this.isLoggedIn = true;
        this.username = username;
        return response;
      } catch (error) {
        throw error;
      }
    },
    
    // İstifadəçi çıxışı
    logout() {
      authService.logout();
      this.isLoggedIn = false;
      this.username = null;
    },
    
    // Auth vəziyyətini yenilə
    checkAuthState() {
      this.isLoggedIn = authService.isLoggedIn();
      this.username = authService.getUsername();
    }
  }
});