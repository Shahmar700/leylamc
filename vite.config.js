import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  // Development server konfiqurasiyası
  server: {
    // 'true' yazanda bütün şəbəkələrdən giriş icazəsi verir
    host: true,
    port: 3000
  },
  // Base path konfiqurasiyası
  base: '/' // Əgər alt qovluqda deploy edirsinizsə, məsələn '/leylamc/' yazın
})