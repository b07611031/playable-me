import { defineConfig } from 'vite'

// Local development runs at http://localhost:5173/.
// GitHub Pages still hosts production at /playable-me/.
export default defineConfig(({ command }) => ({
  base: command === 'serve' ? '/' : '/playable-me/',
}))
