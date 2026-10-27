import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// On GitHub Pages the site lives at /<repo-name>/.
// If your repository has a different name, change 'happy-birthday-mom' below.
export default defineConfig({
  plugins: [react()],
  base: process.env.GITHUB_ACTIONS ? '/happy-birthday-mom/' : '/',
})
