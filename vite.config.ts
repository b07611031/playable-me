import { defineConfig } from 'vite'

// Dev URLs may be localhost or an address on the LAN.
// VITE_HMR_HOST lets a forwarded/remote browser use a reachable WebSocket hostname.
// Production remains hosted under /playable-me/ on GitHub Pages.
const devPort = 5173
const hmrHost = process.env.VITE_HMR_HOST?.trim()

export default defineConfig(({ command }) => ({
  base: command === 'serve' ? '/' : '/playable-me/',
  server: {
    host: '0.0.0.0',
    port: devPort,
    strictPort: true,
    hmr: {
      clientPort: devPort,
      ...(hmrHost ? { host: hmrHost } : {}),
    },
  },
}))
