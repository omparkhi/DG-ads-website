import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import expressApp from "./api/index.js";

function expressPlugin() {
  return {
    name: "express-plugin",
    configureServer(server) {
      server.middlewares.use(expressApp);
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), expressPlugin()],
  server: {
    port: 5173,
    host: true,
  },
});
