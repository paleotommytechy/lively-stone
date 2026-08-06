import { test, expect } from '@playwright/test';

test.describe('Public Navigation E2E', () => {
  test.beforeEach(async ({ page }) => {
    // Go to home page
    await page.goto('/');
  });

  test('should load the home page correctly', async ({ page }) => {
    // Check page title or prominent headers
    await expect(page).toHaveTitle(/Lively Stones/i);
    await expect(page.locator('text=LIVELY STONES')).toBeVisible();
    await expect(page.locator('text=School of Tyrannus')).toBeVisible();
  });

  test('should navigate to the About page via header link', async ({ page }) => {
    // Click the About link
    await page.click('header >> text=About');
    
    // Verify the URL path matches /about
    await expect(page).toHaveURL(/\/about$/);
    
    // Verify About view specific elements
    await expect(page.locator('text=APOSTOLIC DOCTRINE')).toBeVisible();
  });

  test('should navigate to teachings page and query teachings', async ({ page }) => {
    // Click the Media link
    await page.click('header >> text=Media');
    
    // Verify the URL matches /teachings
    await expect(page).toHaveURL(/\/teachings$/);
    
    // Query teachings input should exist
    const searchInput = page.locator('input[placeholder*="Search teachings"]');
    await expect(searchInput).toBeVisible();
    
    // Type in search input
    await searchInput.fill('Apostolic');
  });

  test('should open global search modal when clicking search icon', async ({ page }) => {
    // Click search trigger in header
    await page.click('header button[title="Global Search"]');
    
    // Verify search modal is visible
    await expect(page.locator('placeholder*="Search teachings, scriptures"')).toBeVisible();
    
    // Close modal
    await page.click('button:has(svg:has-text("X"))');
  });
});
