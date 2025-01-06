import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    optimizeDeps: {
        exclude: [
            // Add dependencies that are causing optimization issues
            'chunk-EFTEWGEA',
            'chunk-CT2QV5C3'
        ]
    }
})
