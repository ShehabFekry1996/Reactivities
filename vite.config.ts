import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";
import { defineConfig } from "vite";
import mkcert from "vite-plugin-mkcert";
// https://vite.dev/config/
export default defineConfig({
  build: {
    outDir: "../Reactivities-ASP.NET/API/wwwroot",
    emptyOutDir: true,
  },
  server: {
    port: 3001,
  },
  plugins: [react(), mkcert(), babel({ presets: [reactCompilerPreset()] })],
});
