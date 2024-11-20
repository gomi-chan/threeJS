import { defineConfig } from "vite";
import ViteHtmlPlugin from "vite-plugin-html"; // Corrected import

export default defineConfig({
  plugins: [
    ViteHtmlPlugin({
      inject: {
        injectData: {
          title: "月の満ち欠け",
          description: "WebGLで表現した月の満ち欠け",
          ogImage: "/images/ogp.jpg",
        },
      },
    }),
  ],
});
