import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { inspectAttr } from 'kimi-plugin-inspect-react'

/* ── Memory Crash Guard ─────────────────────────────────────────────── */
if (!process.env.NODE_OPTIONS?.includes('max-old-space-size')) {
  process.env.NODE_OPTIONS = `${process.env.NODE_OPTIONS || ''} --max-old-space-size=4096`.trim();
}

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [inspectAttr(), react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    hmr: { overlay: false },       // prevent crash cascade from HMR overlay
    watch: { usePolling: false },   // native FS watcher (lower memory)
  },
  build: {
    assetsInlineLimit: 0,
    chunkSizeWarningLimit: 600,
    sourcemap: false,
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          gsap: ['gsap'],
          ui: ['lucide-react', 'clsx', 'tailwind-merge'],
          firebase: ['firebase/app', 'firebase/auth', 'firebase/firestore', 'firebase/functions'],
          shopify: ['sonner', 'zustand'],
          charts: ['recharts'],
        }
      }
    }
  }
});
