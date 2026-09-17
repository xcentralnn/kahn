import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 8080,
    proxy: {
      '/ws': {
        target: 'ws://localhost:8081',
        ws: true,
      },
      '/api': {
        target: 'http://localhost:8081',
      },
      '/healthz': {
        target: 'http://localhost:8081',
      },
    },
  },
  preview: {
    host: '0.0.0.0',
    port: 8080,
    proxy: {
      '/ws': {
        target: 'ws://localhost:8081',
        ws: true,
      },
      '/api': {
        target: 'http://localhost:8081',
      },
      '/healthz': {
        target: 'http://localhost:8081',
      },
    },
  },
})
