import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import { imagetools } from 'vite-imagetools';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // Image optimization - automatically generates WebP/AVIF
    imagetools({
      defaultDirectives: (url) => {
        if (url.searchParams.has('optimize')) {
          return new URLSearchParams({
            format: 'webp;avif;jpg',
            quality: '80',
          });
        }
        return new URLSearchParams();
      },
    }),
    // Bundle analyzer - generates stats.html after build
    visualizer({
      filename: './dist/stats.html',
      open: false,
      gzipSize: true,
      brotliSize: true,
      template: 'treemap', // or 'sunburst', 'network'
    }),
  ],
  build: {
    // Enable source maps for Sentry error tracking
    sourcemap: true,
    // Split CSS per component for better caching
    cssCodeSplit: true,
    // Minification with Terser for better compression
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        passes: 2,
        pure_funcs: ['console.log', 'console.debug', 'console.info'],
      },
      mangle: {
        safari10: true,
      },
    },
    // Optimize chunk splitting
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Vendor chunks
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) {
              return 'react-vendor';
            }
            if (id.includes('react-router-dom') || id.includes('react-helmet-async')) {
              return 'router-vendor';
            }
            if (id.includes('dompurify')) {
              return 'dompurify-vendor';
            }
            if (id.includes('@sentry')) {
              return 'sentry-vendor';
            }
            // Other node_modules in a common vendor chunk
            return 'vendor';
          }

          // Split translations by locale
          if (id.includes('i18n/locales/es/')) {
            return 'locale-es';
          }
          if (id.includes('i18n/locales/en/')) {
            return 'locale-en';
          }
          if (id.includes('i18n/locales/ca/')) {
            return 'locale-ca';
          }
          if (id.includes('i18n/locales/fr/')) {
            return 'locale-fr';
          }

          // Split dance configs
          if (id.includes('config/dance-configs/')) {
            return 'dance-configs';
          }

          // Split components into chunks
          if (id.includes('components/shared/')) {
            return 'shared-components';
          }

          // Return undefined for default Vite chunking
          return undefined;
        },
        // Optimize chunk size
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
    },
    // Increase chunk size warning limit
    chunkSizeWarningLimit: 1000,
  },
  css: {
    // Ensure CSS is processed correctly
    devSourcemap: false,
  },
});
