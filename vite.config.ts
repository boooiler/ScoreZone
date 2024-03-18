import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'
import path from 'path'
import { defineConfig } from 'vite'
import eslint from 'vite-plugin-eslint' 
import tsconfigPaths from 'vite-tsconfig-paths'

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
    port: 3001
  },
  preview: {
    port: 3001
  }
})
