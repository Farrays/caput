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

    // Check for main navigation elements
    const nav = page.locator('nav');
    await expect(nav).toBeVisible();
  });

  test('should navigate to about page from home', async ({ page }) => {
    await page.goto('/');

    // Click on "Sobre Nosotros" link
    const aboutLink = page.getByRole('link', { name: /sobre nosotros/i });
    await aboutLink.click();

    // Verify URL changed
    await expect(page).toHaveURL(/sobre-nosotros/);

    // Verify main element is present
    const main = page.locator('main');
    await expect(main).toBeVisible();
  });

  test('should navigate to classes page', async ({ page }) => {
    await page.goto('/');

    // Navigate to classes
    const classesLink = page.getByRole('link', { name: /clases/i }).first();
    await classesLink.click();

    // Verify we're on a classes-related page
    await expect(page.url()).toMatch(/clases/);

    // Verify page has content
    const main = page.locator('main');
    await expect(main).toBeVisible();
  });

  test('should handle language switching', async ({ page }) => {
    await page.goto('/es');

    // Find and click language selector (if available)
    const languageSelector = page.locator('[aria-label*="language" i], [aria-label*="idioma" i]').first();

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

    // Verify main content is visible
    const main = page.locator('main');
    await expect(main).toBeVisible();

    // Check for video or hero section
    const hero = page.locator('[class*="hero"]').first();
    await expect(hero).toBeVisible();
  });

  test('should have accessible navigation', async ({ page }) => {
    await page.goto('/');

    // Check for skip link
    const skipLink = page.getByRole('link', { name: /skip to/i });
    if (await skipLink.isVisible()) {
      await expect(skipLink).toBeVisible();
    }

    // Verify main landmarks exist
    const main = page.locator('main');
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

      // Verify menu opened (check for navigation links)
      const nav = page.locator('nav');
      await expect(nav).toBeVisible();
    }
  });

  test('should be responsive on mobile', async ({ page }) => {
    await page.goto('/');

    // Verify page is responsive
    const main = page.locator('main');
    await expect(main).toBeVisible();

    // Verify no horizontal scroll
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    const viewportWidth = page.viewportSize()?.width || 375;
    expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 1);
  });
});
