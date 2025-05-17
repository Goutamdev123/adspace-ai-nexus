import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      external: [
        "@tsparticles/react", // ✅ Externalize tsparticles only
      ],
    },
  },
  optimizeDeps: {
    include: [
      "@tsparticles/react",
      "@react-three/fiber", // ✅ Pre-bundled for dev
      "@react-three/drei",
    ],
  },
});
