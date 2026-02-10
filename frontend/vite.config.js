import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        port: 5173,
        strictPort: true, // Fail if port is busy instead of switching
        host: '0.0.0.0' // Expose to network (good for localhost issues sometimes)
    }
})
