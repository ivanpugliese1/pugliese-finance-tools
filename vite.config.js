// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  base: '/pugliese-finance-tools/',
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        bonus: 'src/pages/bonus.html',
        dollar: 'src/pages/dollar.html',
        salary: 'src/pages/salary.html',
      }
    }
  }
})