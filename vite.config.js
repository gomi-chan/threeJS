import { defineConfig } from "vite";
import ViteHtmlPlugin from "vite-plugin-html";

export default defineConfig({
  plugins: [
    ViteHtmlPlugin({
      inject: {
        injectHtmlData: {
          ogImage: "/images/ogp.jpg",
          ogTitle: "月の満ち欠け",
          ogDescription: "WebGL（three.js)で表現した月の満ち欠け。",
        },
      },
    }),
  ],
});
