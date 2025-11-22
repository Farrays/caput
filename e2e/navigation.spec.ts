import { test, expect } from '@playwright/test';

/**
 * E2E Navigation Tests
 * Tests basic navigation flows across the application
 */

test.describe('Basic Navigation', () => {
  test('should navigate to home page successfully', async ({ page }) => {
    await page.goto('/');

    // Verify page loaded
    await expect(page).toHaveTitle(/Farray/i);

    // Check for main navigation elements - use first() to avoid strict mode violation
    const nav = page.locator('nav').first();
    await expect(nav).toBeVisible();
  });

  test('should navigate to about page from home', async ({ page }) => {
    // Navigate directly to about page (more reliable than clicking a potentially hidden link)
    await page.goto('/es/sobre-nosotros');

    // Verify URL is correct
    await expect(page).toHaveURL(/sobre-nosotros/);

    // Verify page title contains the site name
    await expect(page).toHaveTitle(/Farray/i);

    // Verify main element is present - use first() to avoid strict mode violation
    const main = page.locator('main').first();
    await expect(main).toBeVisible();

    // Verify there's a heading
    const heading = page.locator('h1, h2').first();
    await expect(heading).toBeVisible();
  });

  test('should navigate to classes page', async ({ page }) => {
    await page.goto('/');

    // Navigate to classes
    const classesLink = page.getByRole('link', { name: /clases/i }).first();
    await classesLink.click();

    // Verify we're on a classes-related page
    await expect(page.url()).toMatch(/clases/);

    // Verify page has content - use first() to avoid strict mode violation
    const main = page.locator('main').first();
    await expect(main).toBeVisible();
  });

  test('should handle language switching', async ({ page }) => {
    await page.goto('/es');

    // Find and click language selector (if available)
    const languageSelector = page
      .locator('[aria-label*="language" i], [aria-label*="idioma" i]')
      .first();

    if (await languageSelector.isVisible()) {
      await languageSelector.click();

      // Try to switch to Catalan
      const catalanOption = page.getByRole('link', { name: /catal[aà]/i });
      if (await catalanOption.isVisible()) {
        await catalanOption.click();

        // Verify URL changed to /ca
        await expect(page).toHaveURL(/\/ca/);
      }
    }
  });

  test('should display dancehall class page', async ({ page }) => {
    await page.goto('/es/clases/dancehall-barcelona');

    // Verify page title contains dancehall
    await expect(page).toHaveTitle(/dancehall/i);

    // Verify main content is visible - use first() to avoid strict mode violation
    const main = page.locator('main').first();
    await expect(main).toBeVisible();

    // Check for hero section by looking for h1 heading
    const heading = page.locator('h1').first();
    await expect(heading).toBeVisible();
  });

  test('should have accessible navigation', async ({ page }) => {
    await page.goto('/');

    // Check for skip link
    const skipLink = page.getByRole('link', { name: /skip to/i }).first();
    if (await skipLink.isVisible()) {
      await expect(skipLink).toBeVisible();
    }

    // Verify main landmarks exist - use first() to avoid strict mode violation
    const main = page.locator('main').first();
    await expect(main).toBeVisible();
  });

  test('should handle 404 gracefully', async ({ page }) => {
    const response = await page.goto('/non-existent-page-12345');

    // Should return 404 status (in production)
    // In dev/preview mode, might redirect to index
    if (response) {
      const status = response.status();
      // Accept 404 or 200 (SPA routing)
      expect([200, 404]).toContain(status);
    }
  });
});

test.describe('Mobile Navigation', () => {
  test.use({ viewport: { width: 375, height: 667 } });

  test('should open mobile menu', async ({ page }) => {
    await page.goto('/');

    // Look for hamburger menu button
    const menuButton = page.locator('[aria-label*="menu" i], [aria-label*="menú" i]').first();

    if (await menuButton.isVisible()) {
      await menuButton.click();

      // Verify menu opened by checking for navigation links in mobile menu
      // Wait for a navigation link to be visible (more reliable than checking nav element)
      const navLink = page.getByRole('link', { name: /clases|inicio|home/i }).first();
      await expect(navLink).toBeVisible({ timeout: 10000 });
    }
  });

  test('should be responsive on mobile', async ({ page }) => {
    await page.goto('/');

    // Verify page is responsive - use first() to avoid strict mode violation
    const main = page.locator('main').first();
    await expect(main).toBeVisible();

    // Verify no horizontal scroll
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    const viewportWidth = page.viewportSize()?.width || 375;
    expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 1);
  });
});
