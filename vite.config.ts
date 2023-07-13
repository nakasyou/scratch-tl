import { crx, defineManifest } from "@crxjs/vite-plugin"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const manifest = defineManifest({
  manifest_version: 3,
  name: "Scratch TL",
  version: "0.1.0",
  permissions: ["bookmarks"],
  action: {
    default_popup: "index.html",
  },
  content_scripts: [
    {
      matches: ["https://scratch.mit.edu/*"],
      js: ["./src/tl/main.ts"]
    }
  ]
});

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), crx({ manifest })],
})
