import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  //build 시에 모든 console.log를 제거
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_condole: true,
        drop_debugger: true
      }
    }
  }
});
