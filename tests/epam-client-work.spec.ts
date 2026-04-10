import { test, expect } from '@playwright/test';

test('EPAM: Services -> Explore Our Client Work -> Client Work visible', async ({ page }) => {
  await page.goto('/');

  // EPAM header uses a hamburger menu in some layouts; open it if needed.
  const servicesLink = page.getByRole('link', { name: 'Services', exact: true });
  if (!(await servicesLink.isVisible().catch(() => false))) {
    // First button in header is the menu toggle in the current EPAM layout.
    await page.locator('header').getByRole('button').first().click();
  }

  await servicesLink.click();
  await page.getByRole('link', { name: 'Explore Our Client Work' }).click();

  await expect(page.getByRole('heading', { name: 'Client Work' })).toBeVisible();
});
