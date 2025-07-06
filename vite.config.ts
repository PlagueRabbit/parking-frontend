// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/parking-frontend/', // 👈 리포지토리 이름
  plugins: [react()],
})
