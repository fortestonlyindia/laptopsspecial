import { defineConfig } from 'astro/config';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  site: 'https://laptopsspecial.com',
  output: 'static',
  compressHTML: true,

  // Image optimization — WebP + AVIF support built-in
  image: {
    // Sharp is Astro's built-in image processor
    // Supported input: jpg, png, gif, tiff, webp, avif, svg
    // Output: webp (default), avif, png, jpg
    defaultFormat: 'webp',
    experimentalLayout: 'responsive',
    remotePatterns: [
      // Allow images from these domains (for blog post images etc)
      { protocol: 'https', hostname: '**.unsplash.com' },
      { protocol: 'https', hostname: '**.pexels.com' },
      { protocol: 'https', hostname: '**.githubusercontent.com' },
<<<<<<< HEAD
      { protocol: 'https', hostname: 'cdn.sanity.io' },
=======
>>>>>>> 10aa9b0395d12fd37a4b7d811a6f353732146442
    ],
  },

  // Prefetch ALL links as soon as they enter viewport
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport',
  },

  build: {
    inlineStylesheets: 'auto',
    assets: '_astro',
  },

  vite: {
    resolve: {
      alias: {
        '@layouts': path.resolve(__dirname, 'src/layouts'),
        '@pages':   path.resolve(__dirname, 'src/pages'),
<<<<<<< HEAD
        '@lib':     path.resolve(__dirname, 'src/lib'),
=======
>>>>>>> 10aa9b0395d12fd37a4b7d811a6f353732146442
        '@':        path.resolve(__dirname, 'src'),
      },
    },
    build: {
      cssMinify: true,
      minify: 'esbuild',
      rollupOptions: {
        output: { manualChunks: undefined },
      },
    },
<<<<<<< HEAD
    optimizeDeps: {
      exclude: ['@sanity/client'],
    },
=======
>>>>>>> 10aa9b0395d12fd37a4b7d811a6f353732146442
    esbuild: {
      drop: ['console', 'debugger'],
      legalComments: 'none',
    },
  },
});
