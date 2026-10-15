import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  publicDir: mode === "admin" ? false : "public",
  plugins: [
    react(),
    {
      name: "admin-document",
      transformIndexHtml(html) {
        if (mode !== "admin") return html;
        return html
          .replace(
            /<title>.*?<\/title>/s,
            "<title>디자인무드 | 포트폴리오 관리</title>",
          )
          .replace(/<meta name="description"[^>]*>/, '<meta name="description" content="디자인무드 관리자 전용 포트폴리오 편집 화면" />')
          .replace(/<link rel="canonical"[^>]*>/, '<link rel="canonical" href="https://admin.designmood.kr/" />')
          .replace(/<meta property="og:[^>]*>\s*/g, "")
          .replace(
            "</head>",
            '<meta name="robots" content="noindex,nofollow" /></head>',
          );
      },
    },
  ],
  preview: {
    allowedHosts: true,
    port: 4173,
    host: true,
  },
  server: {
    allowedHosts: true,
  },
}));
