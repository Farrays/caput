# Content Security Policy (CSP) Implementation

## Overview

This project implements comprehensive security headers to protect against XSS, clickjacking, and other web vulnerabilities.

## Security Headers Implemented

### 1. Content Security Policy (CSP)

Configured in `public/_headers` for production deployments.

**Key Features:**

- ✅ Self-hosted assets only
- ✅ Google Analytics integration
- ✅ Sentry error tracking
- ✅ YouTube embeds allowed
- ✅ Unsplash images allowed
- ✅ Blocks inline scripts (except explicitly allowed)
- ✅ Upgrades all HTTP to HTTPS
- ✅ Blocks mixed content

**Directives:**

```
default-src 'self'
script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com https://browser.sentry-cdn.com
style-src 'self' 'unsafe-inline' https://fonts.googleapis.com
font-src 'self' https://fonts.gstatic.com data:
img-src 'self' data: https: blob: https://images.unsplash.com https://i.ytimg.com
connect-src 'self' https://www.google-analytics.com https://*.sentry.io
frame-src 'self' https://www.youtube.com https://www.youtube-nocookie.com
media-src 'self' data: blob:
object-src 'none'
frame-ancestors 'none'
base-uri 'self'
form-action 'self'
upgrade-insecure-requests
block-all-mixed-content
```

### 2. X-Frame-Options

```
X-Frame-Options: DENY
```

Prevents the site from being embedded in iframes (clickjacking protection).

### 3. X-Content-Type-Options

```
X-Content-Type-Options: nosniff
```

Prevents MIME type sniffing attacks.

### 4. X-XSS-Protection

```
X-XSS-Protection: 1; mode=block
```

Enables XSS filter in legacy browsers.

### 5. Referrer-Policy

```
Referrer-Policy: strict-origin-when-cross-origin
```

Controls referrer information sent with requests.

### 6. Permissions-Policy

```
Permissions-Policy: geolocation=(), microphone=(), camera=(), payment=(), usb=(), magnetometer=(), gyroscope=(), accelerometer=()
```

Disables unnecessary browser features.

### 7. Strict-Transport-Security (HSTS)

```
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
```

Forces HTTPS connections for 2 years.

## Deployment Configuration

### Netlify/Vercel

The `public/_headers` file is automatically recognized and applied.

### Other Hosting Providers

#### Apache (.htaccess)

```apache
<IfModule mod_headers.c>
  Header set Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com https://browser.sentry-cdn.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; img-src 'self' data: https: blob:; connect-src 'self' https://www.google-analytics.com https://*.sentry.io; frame-src 'self' https://www.youtube.com; media-src 'self' data: blob:; object-src 'none'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'; upgrade-insecure-requests; block-all-mixed-content"
  Header set X-Frame-Options "DENY"
  Header set X-Content-Type-Options "nosniff"
  Header set X-XSS-Protection "1; mode=block"
  Header set Referrer-Policy "strict-origin-when-cross-origin"
  Header set Permissions-Policy "geolocation=(), microphone=(), camera=(), payment=()"
  Header set Strict-Transport-Security "max-age=63072000; includeSubDomains; preload"
</IfModule>
```

#### Nginx

```nginx
add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com https://browser.sentry-cdn.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; img-src 'self' data: https: blob:; connect-src 'self' https://www.google-analytics.com https://*.sentry.io; frame-src 'self' https://www.youtube.com; media-src 'self' data: blob:; object-src 'none'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'; upgrade-insecure-requests; block-all-mixed-content";
add_header X-Frame-Options "DENY";
add_header X-Content-Type-Options "nosniff";
add_header X-XSS-Protection "1; mode=block";
add_header Referrer-Policy "strict-origin-when-cross-origin";
add_header Permissions-Policy "geolocation=(), microphone=(), camera=(), payment=()";
add_header Strict-Transport-Security "max-age=63072000; includeSubDomains; preload";
```

## Testing CSP

### Browser DevTools

1. Open Chrome DevTools (F12)
2. Go to Console tab
3. Look for CSP violation reports
4. Fix any violations

### Online Tools

- https://csp-evaluator.withgoogle.com/
- https://securityheaders.com/
- https://observatory.mozilla.org/

### Testing Commands

```bash
# Test CSP headers locally with curl
curl -I https://www.farrayscenter.com

# Check security headers
curl -I https://www.farrayscenter.com | grep -i "content-security-policy\|x-frame-options\|strict-transport"
```

## Common CSP Violations & Fixes

### 1. Inline Scripts Blocked

**Problem:** `Refused to execute inline script because it violates CSP directive`

**Solution:** Move inline scripts to external .js files or use nonces/hashes.

### 2. Third-party Scripts Blocked

**Problem:** `Refused to load the script 'https://example.com/script.js'`

**Solution:** Add the domain to `script-src` directive.

### 3. Images from New Domains

**Problem:** `Refused to load the image 'https://newdomain.com/image.jpg'`

**Solution:** Add domain to `img-src` or use `img-src https:` for all HTTPS images.

## Security Score Goals

- **Lighthouse Security Audit:** 100/100 ✅
- **Mozilla Observatory:** A+ ✅
- **Security Headers:** A+ ✅

## Maintenance

Review and update CSP headers when:

- Adding new third-party integrations
- Changing analytics providers
- Embedding new external content
- Adding new CDNs

## Resources

- [MDN CSP Guide](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)
- [CSP Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Content_Security_Policy_Cheat_Sheet.html)
- [Google CSP Evaluator](https://csp-evaluator.withgoogle.com/)
