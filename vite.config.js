import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  base: '/coffee-shop-web/',
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        // 這裡新增一份 404.html，內容會跟 index.html 一樣
        fallback: resolve(__dirname, 'index.html'),
      },
    },
  },
})