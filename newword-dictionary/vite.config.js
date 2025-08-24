import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  return {
    plugins: [react()],
    build: {
      minify: 'terser',
      terserOptions: mode === 'production'
        ? {
            compress: {
              drop_console: true,   // 프로덕션 빌드에서 console 제거
              drop_debugger: true   // debugger 제거
            }
          }
        : {}
    }
  };
});

