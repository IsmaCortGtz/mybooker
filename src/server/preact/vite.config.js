import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'
import { viteSingleFile } from "vite-plugin-singlefile"
import path from "path";
import fs from "fs";

const outputDir = path.resolve(__dirname, "dist");
const newDistFolder = path.resolve(__dirname, "..", "dist");

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    preact(),
    viteSingleFile(),
    {
      name: 'publish-dist-folder',
      closeBundle: async () => {
        if (fs.existsSync(newDistFolder))
          fs.rmSync(newDistFolder, { recursive: true, force: true }); // remove old dist folder
        fs.cpSync(outputDir, newDistFolder, { recursive: true, force: true }); // copy new dist folder
      }
    }
  ],
  
  build: {
    assetsDir: "assets",
    rollupOptions: {
      output: {
        entryFileNames: `assets/[name].js`,
        chunkFileNames: `assets/[name].js`,
        assetFileNames: `assets/[name].[ext]`
      }
    }
  },

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    }
  }
})
