# Lighthouse CI Setup

## Overview

Lighthouse CI is configured to automatically audit the website's performance, accessibility, SEO, and best practices on every push and pull request.

## Configuration

- **Config file**: [.lighthouserc.js](.lighthouserc.js)
- **CI workflow**: [.github/workflows/ci.yml](.github/workflows/ci.yml)

## Running Locally

### Prerequisites

```bash
npm install
npm run build
```

### Run Full Lighthouse CI Audit

```bash
# This will build, serve, and audit all configured URLs
npm run lighthouse
```

### Run Individual Steps

```bash
# 1. Collect performance data
npm run lighthouse:collect

# 2. Run assertions against budgets
npm run lighthouse:assert

# 3. Upload results (if configured)
npm run lighthouse:upload
```

## What Gets Tested

### Pages Audited

- Homepage (all languages)
- Class pages (Dancehall, Hip Hop, Twerk)
- About page
- Contact page

### Categories

- **Performance** (target: 85+)
  - First Contentful Paint < 2s
  - Largest Contentful Paint < 2.5s
  - Cumulative Layout Shift < 0.1
  - Total Blocking Time < 300ms

- **Accessibility** (target: 90+)
  - ARIA attributes
  - Color contrast
  - Image alt text
  - Form labels
  - Keyboard navigation

- **SEO** (target: 95+)
  - Meta tags (title, description)
  - Canonical URLs
  - Hreflang links
  - Structured data

- **Best Practices** (target: 90+)
  - HTTPS
  - No console errors
  - Modern image formats
  - Efficient caching

## CI/CD Integration

Lighthouse CI runs automatically on:

- Every push to `main`, `master`, or `develop` branches
- Every pull request to these branches

### Viewing Results

1. **In CI Logs**: Check the GitHub Actions workflow logs
2. **Artifacts**: Download the lighthouse-reports artifact from the workflow run
3. **Temporary Storage**: When uploaded to temporary storage, you'll get a shareable link

## Thresholds and Assertions

Performance budgets are defined in [.lighthouserc.js](.lighthouserc.js):

```js
assertions: {
  'categories:performance': ['warn', { minScore: 0.85 }],
  'categories:accessibility': ['error', { minScore: 0.9 }],
  'categories:seo': ['error', { minScore: 0.95 }],
  'largest-contentful-paint': ['warn', { maxNumericValue: 2500 }],
  // ... more assertions
}
```

- **Error**: Will fail the CI build
- **Warn**: Will show warning but won't fail

## Troubleshooting

### Tests Failing Locally But Passing in CI

Make sure you're running on a consistent network:

```bash
# Use the same throttling settings as CI
npm run lighthouse
```

### High Variability in Results

Lighthouse runs 3 times and takes the median. If results vary:

- Close other applications
- Disable browser extensions
- Use incognito/private mode

### Performance Issues

Common fixes:

1. **Large images**: Run `npm run build:images` to optimize
2. **Large bundles**: Check bundle analyzer at `dist/stats.html`
3. **Render blocking**: Review CSS/JS loading in network tab

## Resources

- [Lighthouse CI Documentation](https://github.com/GoogleChrome/lighthouse-ci)
- [Web.dev Performance Guide](https://web.dev/performance/)
- [Core Web Vitals](https://web.dev/vitals/)
