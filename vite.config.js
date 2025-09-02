import { defineConfig } from 'vite'

// Adjust the base path so the app works when served from GitHub Pages
// Base must match the repository name exactly.
export default defineConfig({
  base: '/class-finder/',
})
