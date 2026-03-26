import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * VITE_DEV_API_PROXY must match server PORT (e.g. http://localhost:5000).
 * Defaults to 4000 if unset — set in client/.env.development when using another port.
 */
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const target = "https://bcakendsingh.onrender.com";

  return {
    plugins: [react()],
    server: {
      port: 5173,
      proxy: {
        '/api': { target, changeOrigin: true },
        '/uploads': { target, changeOrigin: true },
      },
    },
  };
});
