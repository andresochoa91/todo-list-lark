import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true, // Optional: makes test APIs like describe, it, expect globally available
    environment: 'jsdom', // This enables the JSDOM environment
    setupFiles: './test.setup.js',
  },
});
