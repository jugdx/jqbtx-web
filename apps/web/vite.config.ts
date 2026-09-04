import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png'],
      devOptions: {
        enabled: true,
      },
      manifest: {
        name: 'JQBTX Web',
        short_name: 'JQBTX',
        start_url: '/',
        description: 'Modern Mobile-First qBittorrent Web UI',
        theme_color: '#0f111a',
        background_color: '#0f111a',
        display: 'standalone',
        orientation: 'portrait-primary',
        icons: [
          {
            src: '/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      }
    })
  ],
  server: {
    port: 3000,
    host: true,
    proxy: {
      '/api/v2': {
        target: 'http://torrents.gx', 
        changeOrigin: true,
        // On trompe la protection CSRF de qBittorrent
        headers: {
          Origin: 'http://torrents.gx',
          Referer: 'http://torrents.gx/'
        }
      }
    }
  }
})