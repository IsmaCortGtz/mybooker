import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import preact from '@preact/preset-vite'
import path from "path";
import fs from "fs";

const outputDir = path.resolve(__dirname, "dist");
const newDistFolder = path.resolve(__dirname, "..", "dist");

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    preact(),
    VitePWA({ 
      registerType: 'prompt',
      manifest: {
        name: 'My Booker',
        start_url: "/",
        short_name: 'MyBooker',
        description: 'App to download books from the web',
        theme_color: '#222222',
        background_color: '#222222',
        display: 'standalone',
        lang: 'es',
      } 
    }),
    {
      name: 'publish-dist-folder',
      closeBundle: async () => {
        fs.cpSync(outputDir, newDistFolder, { recursive: true, force: true });
      }
    }
  ],

  build: {
    manifest: true,
  },

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    }
  }
})
