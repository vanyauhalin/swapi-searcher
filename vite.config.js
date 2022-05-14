import { resolve } from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// eslint-disable-next-line import/no-default-export
export default defineConfig(() => ({
  plugins: [react()],
  resolve: {
    alias: {
      src: resolve('src'),
    },
  },
}));
