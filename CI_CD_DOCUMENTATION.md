# CI/CD Pipeline Documentation

## Overview

Automated CI/CD pipeline using GitHub Actions for continuous integration, testing, and deployment.

## Workflows

### 1. Main CI/CD Pipeline (`.github/workflows/ci.yml`)

**Trigger:** Push and Pull Requests to `master`, `main`, `develop`

**Jobs:**

- ✅ **Lint & Type Check**: ESLint, TypeScript, Prettier
- ✅ **Unit Tests**: Vitest with coverage reports
- ✅ **E2E Tests**: Playwright browser tests
- ✅ **Security Audit**: npm audit for vulnerabilities
- ✅ **Build**: Production build with artifact upload
- ✅ **Accessibility Tests**: pa11y-ci a11y validation

**Status Checks Required:**

- All lint and type checks must pass
- All tests must pass
- Build must succeed

### 2. Lighthouse CI (`.github/workflows/lighthouse.yml`)

**Trigger:** Push and Pull Requests to `master`, `main`

**Features:**

- 🚦 Performance monitoring (3 runs average)
- 📊 Accessibility score (minimum 95%)
- 🔍 SEO score (minimum 95%)
- 📈 Core Web Vitals tracking
- 💬 PR comments with results

**Thresholds:**

- Performance: ≥90%
- Accessibility: ≥95%
- Best Practices: ≥90%
- SEO: ≥95%

### 3. Dependency Review (`.github/workflows/dependency-review.yml`)

**Trigger:** Pull Requests

**Features:**

- 🔐 Security vulnerability scanning
- ⚖️ License compliance check
- 📦 Dependency change tracking
- 🚫 Blocks high-severity issues

**License Policy:**

- ❌ Denied: GPL-3.0, AGPL-3.0
- ✅ Allowed: MIT, Apache-2.0, BSD, ISC

### 4. Dependabot (`.github/dependabot.yml`)

**Schedule:** Weekly (Mondays at 09:00 CET)

**Features:**

- 🤖 Automatic dependency updates
- 📦 Groups dependencies by type
- 🏷️ Auto-labels PRs
- 👥 Auto-assigns reviewers
- 🔄 Maximum 5 open PRs

**Update Types:**

- Production dependencies (weekly)
- Development dependencies (weekly)
- GitHub Actions (weekly)

**Ignored Updates:**

- React/React-DOM major versions (manual review required)

## Setup Instructions

### 1. GitHub Repository Settings

#### Enable Actions

1. Go to **Settings** → **Actions** → **General**
2. Enable **Allow all actions and reusable workflows**
3. Set **Workflow permissions** to **Read and write permissions**

#### Branch Protection Rules

1. Go to **Settings** → **Branches**
2. Add rule for `master`/`main`:
   - ✅ Require pull request reviews (1 reviewer)
   - ✅ Require status checks to pass:
     - `Lint & Type Check`
     - `Unit Tests`
     - `Build Application`
   - ✅ Require branches to be up to date
   - ✅ Include administrators

#### Secrets Configuration

Add these secrets in **Settings** → **Secrets and variables** → **Actions**:

```bash
# Optional: For CodeCov integration
CODECOV_TOKEN=<your-codecov-token>

# Optional: For Sentry releases
SENTRY_AUTH_TOKEN=<your-sentry-token>
SENTRY_ORG=<your-sentry-org>
SENTRY_PROJECT=<your-sentry-project>
```

### 2. Local Testing

#### Run CI Pipeline Locally

```bash
# Install dependencies
npm ci

# Run all checks (same as CI)
npm run lint
npm run typecheck
npm run format:check
npm run test:run
npm run test:coverage
npm run build

# Run E2E tests
npx playwright install --with-deps
npm run build
npx playwright test
```

#### Test Lighthouse Locally

```bash
# Build the app
npm run build

# Start preview server
npm run preview &

# Run Lighthouse CI
npx @lhci/cli@latest autorun
```

### 3. Badge Integration

Add these badges to your README.md:

```markdown
![CI](https://github.com/USERNAME/REPO/workflows/CI%2FCD%20Pipeline/badge.svg)
![Lighthouse](https://github.com/USERNAME/REPO/workflows/Lighthouse%20CI/badge.svg)
![Security](https://github.com/USERNAME/REPO/workflows/Dependency%20Review/badge.svg)
```

## Continuous Deployment

### Automatic Deployment (Netlify/Vercel)

These platforms automatically deploy on push to `master`:

**Netlify:**

- Build command: `npm run build`
- Publish directory: `dist`
- Node version: 20

**Vercel:**

- Framework preset: Vite
- Build command: `npm run build`
- Output directory: `dist`

### Manual Deployment Workflow (Optional)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [master]
  workflow_dispatch:

jobs:
  deploy:
    runs-on: ubuntu-latest
    environment: production
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run build
      # Add deployment steps for your hosting provider
```

## Performance Budgets

### Bundle Size Limits

- Main bundle: < 100 KB (gzipped)
- Vendor bundle: < 250 KB (gzipped)
- Locale bundles: < 100 KB each (gzipped)

### Core Web Vitals Targets

- **LCP** (Largest Contentful Paint): < 2.5s
- **FID** (First Input Delay): < 100ms
- **CLS** (Cumulative Layout Shift): < 0.1

### Lighthouse Scores

- Performance: ≥ 90
- Accessibility: ≥ 95
- Best Practices: ≥ 90
- SEO: ≥ 95

## Troubleshooting

### Tests Failing in CI but Passing Locally

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run test:run
```

### Lighthouse CI Failing

```bash
# Check if preview server starts
npm run build
npm run preview

# Access http://localhost:4173 manually
```

### Playwright Tests Timeout

```bash
# Increase timeout in playwright.config.ts
timeout: 120000 // 2 minutes
```

## Maintenance

### Weekly Tasks

- ✅ Review Dependabot PRs
- ✅ Check Lighthouse trends
- ✅ Review security alerts

### Monthly Tasks

- ✅ Update major dependencies
- ✅ Review bundle size trends
- ✅ Update CI/CD workflows

### Quarterly Tasks

- ✅ Audit all dependencies
- ✅ Review security policies
- ✅ Update Node.js version

## Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)
- [Dependabot Documentation](https://docs.github.com/en/code-security/dependabot)
- [Playwright Documentation](https://playwright.dev/)
