// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: "/shadowDB/",  // 👈 这个必须有！
  plugins: [react()],
})
