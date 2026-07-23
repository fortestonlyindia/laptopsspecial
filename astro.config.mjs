import { defineConfig } from "astro/config";
import { fileURLToPath } from "url";
import path from "path";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
export default defineConfig({
  site: "https://laptopsspecial.com",
  output: "static",
  compressHTML: true,
  // Image optimization — WebP + AVIF support built-in
  image: {
    // Sharp is Astro's built-in image processor
    // Supported input: jpg, png, gif, tiff, webp, avif, svg
    // Output: webp (default), avif, png, jpg
    defaultFormat: "webp",
    experimentalLayout: "responsive",
    remotePatterns: [
      // Allow images from these domains (for blog post images etc)
      { protocol: "https", hostname: "**.unsplash.com" },
      { protocol: "https", hostname: "**.pexels.com" },
      { protocol: "https", hostname: "**.pixabay.com" },
      { protocol: "https", hostname: "**.githubusercontent.com" },
    ],
  },
  // Prefetch ALL links as soon as they enter viewport
  prefetch: {
    prefetchAll: true,
    defaultStrategy: "viewport",
  },
  build: {
    inlineStylesheets: "auto",
    assets: "_astro",
  },
  vite: {
    resolve: {
      alias: {
        "@layouts": path.resolve(__dirname, "src/layouts"),
        "@pages": path.resolve(__dirname, "src/pages"),
        "@": path.resolve(__dirname, "src"),
      },
    },
    build: {
      cssMinify: true,
      minify: "esbuild",
      rollupOptions: {
        output: { manualChunks: undefined },
      },
    },
    esbuild: {
      drop: ["console", "debugger"],
      legalComments: "none",
    },
  },
});
