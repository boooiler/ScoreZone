import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import eslint from 'vite-plugin-eslint' 
import tsconfigPaths from 'vite-tsconfig-paths'
import path from 'path'
import dotenv from 'dotenv'

dotenv.config()

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), eslint(), tsconfigPaths ()],
  resolve: {
    alias: [{
      find: '@',
      replacement: path.resolve(__dirname, './src')
    }]
  },
  server: {
    port: 3001,
    open: true,
    proxy: {
      '/football-api': {
        target: process.env.VITE_API_URL_FOOTBALL,
        changeOrigin: true,
        rewrite: path => path.replace(/^\/football-api/, '')
      }
    }
  },
  preview: {
    port: 3001
  }
})
