import { defineConfig } from 'vite'

export default defineConfig({
  base: '/the_library_task/',
  build: {
    rolldownOptions: {
      output: {
        entryFileNames: 'index.js',
        chunkFileNames: '[name].js',
        assetFileNames: 'assets/[name].[ext]'
      }
    }
  }
})