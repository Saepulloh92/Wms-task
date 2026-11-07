import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// base "./" = jalan di GitHub Pages (subpath repo) maupun hosting biasa.
export default defineConfig({ base: "./", plugins: [react()], build: { target: "es2019" } });
