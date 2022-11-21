import { defineConfig } from 'vite';
import path from 'path';

import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [
      {
        find: "@components",
        replacement: path.resolve(__dirname, "src/components"),
      },
      {
        find: "@assets",
        replacement: path.resolve(__dirname, "src/assets"),
      },
      {
        find: "@ui",
        replacement: path.resolve(__dirname, "src/components/ui"),
      },
      {
        find: "@store",
        replacement: path.resolve(__dirname, "src/store"),
      },
      {
        find: "@hooks",
        replacement: path.resolve(__dirname, "src/hooks"),
      },
    ],
  },
  server: {
    open: true
  },
  plugins: [react()]
})
