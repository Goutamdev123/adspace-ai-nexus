import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      external: [
        "@tsparticles/react",
        "@react-three/fiber",      // 👈 Add this
        "@react-three/drei",       // 👈 Optionally externalize this too
      ],
    },
  },
  optimizeDeps: {
    include: [
      "@tsparticles/react",
      "@react-three/fiber",       // 👈 Include for pre-bundling
      "@react-three/drei",        // 👈 Include if you're using drei too
    ],
  },
}));
