import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // forwards /api requests from the Vite dev server to the Express backend
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
})
