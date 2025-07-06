// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/ParkingLots": {
        target: "https://privately-firm-cat.ngrok-free.app",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
