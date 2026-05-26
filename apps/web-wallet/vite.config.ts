import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

export default defineConfig({
  root: fileURLToPath(new URL(".", import.meta.url)),
  plugins: [react()],
  define: {
    __EN3_API_BASE_URL__: JSON.stringify(process.env.EN3_API_BASE_URL ?? "")
  },
  build: {
    outDir: "dist",
    emptyOutDir: true
  },
  test: {
    environment: "node",
    include: ["src/**/*.test.ts"]
  }
});
