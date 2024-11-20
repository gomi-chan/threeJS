import { defineConfig } from "vite";
import { ViteHtmlPlugin } from "vite-plugin-html";

export default defineConfig({
  plugins: [
    ViteHtmlPlugin(),
    // Assuming you want to use createHtmlPlugin to inject metadata
    {
      ...createHtmlPlugin({
        inject: {
          injectData: {
            title: "月の満ち欠け",
            description: "WebGLで表現した月の満ち欠け",
            ogImage: "/images/ogp.jpg",
          },
        },
      }),
    },
  ],
});
