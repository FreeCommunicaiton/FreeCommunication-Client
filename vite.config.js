import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: process.env.API_URL || 'http://host.docker.internal:8000', // Lol devcontainer
        changeOrigin: true,
        secure: false,
      }
    }
  }
})