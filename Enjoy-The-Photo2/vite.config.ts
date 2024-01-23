import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['compromise']
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['flickity', 'react-flickity-component', 'axios'], // This creates a 'vendor' chunk that includes flickity and axios
          'react': ['react', 'react-dom'] // This creates a 'react' chunk that includes react and react-dom
        }
      }
    }
  }
})




