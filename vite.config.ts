import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  server: {
    host: '0.0.0.0', // Bind to all network interfaces
    port: 5173, // Specify port explicitly
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      external: [],
    },
    target: 'es2015',
  },
})
