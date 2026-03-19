import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'logo-bandico.png'],
      manifest: {
        name: 'Bandico Group',
        short_name: 'Bandico',
        description: 'Application Web Progressive de Bandico Group',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'logo-bandico.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'logo-bandico.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      },
      devOptions: {
        enabled: true
      }
    })
  ],
})
