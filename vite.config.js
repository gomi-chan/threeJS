import { defineConfig } from "vite";
import { createHtmlPlugin } from "vite-plugin-html";

export default defineConfig({
  plugins: [
    createHtmlPlugin({
      inject: {
        // メタタグを動的に設定
        injectData: {
          title: "月の満ち欠け",
          description: "WebGLで表現した月の満ち欠け",
          ogImage: "/images/ogp.jpg",
        },
      },
    }),
  ],
});
