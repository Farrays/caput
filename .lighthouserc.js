/**
 * Lighthouse CI Configuration
 * Defines performance budgets and assertions for automated quality checks
 */

export default {
  ci: {
    collect: {
      // Build and serve the production app
      startServerCommand: 'npm run preview',
      startServerReadyPattern: 'Local:.*http://localhost:4173',
      startServerReadyTimeout: 30000,
      numberOfRuns: 3, // Run 3 times and take median

      // URLs to test
      url: [
        'http://localhost:4173',
        'http://localhost:4173/es',
        'http://localhost:4173/es/clases',
        'http://localhost:4173/es/clases/dancehall-barcelona',
        'http://localhost:4173/es/clases/hip-hop-barcelona',
        'http://localhost:4173/es/clases/twerk-barcelona',
        'http://localhost:4173/es/sobre-nosotros',
        'http://localhost:4173/es/contacto',
      ],

      // Lighthouse settings
      settings: {
        // Emulate mobile device (default)
        formFactor: 'mobile',
        screenEmulation: {
          mobile: true,
          width: 375,
          height: 667,
          deviceScaleFactor: 2,
        },
        throttling: {
          // Simulate slow 4G
          rttMs: 150,
          throughputKbps: 1638.4,
          cpuSlowdownMultiplier: 4,
        },
        // Skip PWA audits (not relevant for this project)
        skipAudits: ['installable-manifest', 'service-worker', 'apple-touch-icon'],
      },
    },

    assert: {
      // Assertion level (warn or error)
      preset: 'lighthouse:recommended',

      assertions: {
        // Performance metrics
        'first-contentful-paint': ['warn', { maxNumericValue: 2000 }],
        'largest-contentful-paint': ['warn', { maxNumericValue: 2500 }],
        'cumulative-layout-shift': ['warn', { maxNumericValue: 0.1 }],
        'total-blocking-time': ['warn', { maxNumericValue: 300 }],
        'speed-index': ['warn', { maxNumericValue: 3500 }],
        'interactive': ['warn', { maxNumericValue: 3800 }],

        // Category scores (0-1 scale)
        'categories:performance': ['warn', { minScore: 0.85 }],
        'categories:accessibility': ['error', { minScore: 0.9 }],
        'categories:best-practices': ['warn', { minScore: 0.9 }],
        'categories:seo': ['error', { minScore: 0.95 }],

        // Best practices
        'uses-http2': 'off', // Not applicable for localhost
        'uses-passive-event-listeners': 'warn',
        'no-document-write': 'error',
        'geolocation-on-start': 'error',
        'notification-on-start': 'error',

        // SEO critical audits
        'document-title': 'error',
        'html-has-lang': 'error',
        'meta-description': 'error',
        'link-text': 'warn',
        'crawlable-anchors': 'warn',
        'canonical': 'error',
        'hreflang': 'warn',

        // Accessibility critical audits
        'aria-allowed-attr': 'error',
        'aria-required-attr': 'error',
        'button-name': 'error',
        'color-contrast': 'warn',
        'heading-order': 'warn',
        'html-lang-valid': 'error',
        'image-alt': 'error',
        'label': 'error',
        'link-name': 'error',
        'list': 'warn',
        'meta-viewport': 'error',

        // Resource optimization
        'render-blocking-resources': 'warn',
        'unminified-css': 'error',
        'unminified-javascript': 'error',
        'unused-css-rules': 'off', // Can be noisy with TailwindCSS
        'unused-javascript': 'warn',
        'modern-image-formats': 'warn',
        'uses-optimized-images': 'warn',
        'uses-text-compression': 'warn',
        'uses-responsive-images': 'warn',
        'efficient-animated-content': 'warn',
      },
    },

    upload: {
      // Upload results to temporary public storage
      target: 'temporary-public-storage',

      // Alternatively, upload to Lighthouse CI server (if configured)
      // target: 'lhci',
      // serverBaseUrl: 'https://your-lhci-server.com',
      // token: process.env.LHCI_TOKEN,
    },
  },
};
