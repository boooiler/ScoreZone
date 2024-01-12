import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import eslint from 'vite-plugin-eslint' 
import tsconfigPaths from 'vite-tsconfig-paths'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), eslint(), tsconfigPaths ()],
  server: {
    port: 3000,
    open: true
  },
  preview: {
    port: 3000
  },
  resolve: {
    alias: {
      find: '@',
      replacement: path.resolve(__dirname, './src')
    }
  }
})
