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
        // 注意這裡名字隨意，只要有輸出這個檔案就行
        '404': resolve(__dirname, '404.html'),
      },
    },
  },
})