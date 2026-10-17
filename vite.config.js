import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 1810,
    host: true,
    allowedHosts: ['mydarling.danieltruongai.com', '.danieltruongai.com']
  },
  preview: {
    port: 1810,
    host: true,
    allowedHosts: ['mydarling.danieltruongai.com', '.danieltruongai.com']
  }
});

