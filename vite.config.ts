
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // If deploying to a sub-path, for example, https://example.com/my-app/,
  // set the 'base' option to '/my-app/'.
  // base: '/my-app/',
})
