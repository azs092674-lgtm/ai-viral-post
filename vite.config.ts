import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    proxy: {
      '/api': {
        target: 'https://f1b106db-16f9-4169-b39a-19f7ba85d0f9.supabase.co/functions/v1',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        headers: {
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImYxYjEwNmRiMTZmOTQxNjliMzlhMTlmN2JhODVkMGY5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU0ODQyODMsImV4cCI6MjA1MTA2MDI4M30.mBN_dN8BwT5f6lJCm7c0bLKz9GzjSQRYHn5_WM3qo_o'
        }
      }
    }
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
