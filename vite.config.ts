import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteLogger from './src/plugins/viteLogger';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), viteLogger()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@api': path.resolve(__dirname, './src/api'),
      '@components': path.resolve(__dirname, './src/components'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@styles': path.resolve(__dirname, './src/styles'),
      '@utils': path.resolve(__dirname, './src/utils'),
    },
  },
  server: {
    port: 3000,
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
})
