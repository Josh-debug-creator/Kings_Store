import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/Kings_Store/admin", // Add this to match your repository name
  build: {
    outDir: "build", // Ensure the output directory is set to "build"
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
      },
    },
  },
});
