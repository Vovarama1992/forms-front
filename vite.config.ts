import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';
import dynamicImport from 'vite-plugin-dynamic-import'



const input = process.argv[4]?.split('=')?.[1];
if (input) {
  console.log('SINGLE INPUT PROVIDED: ' + input);
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), dynamicImport()],
  assetsInclude: ['**/*.md'],
  resolve: {
    alias: {
      '@': path.join(__dirname, 'src'),
    },
  },
  server: {
    port: 3001,
    proxy: {
      '/api': "http://localhost:3000",
    }
  },
  build: {
    outDir: 'build'
  }
})
