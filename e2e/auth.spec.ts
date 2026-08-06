import { test, expect } from '@playwright/test';

test.describe('Student Portal Authentication Guard E2E', () => {
  test('should display credentials card when accessing student portal unauthenticated', async ({ page }) => {
    // Navigate to student dashboard
    await page.goto('/student/dashboard');

    // Should prompt portal login
    await expect(page.locator('text=Student Login')).toBeVisible();
    await expect(page.locator('text=Enter your credentials to access your portal.')).toBeVisible();
  });

  test('should trigger zod schema validators and show inline errors', async ({ page }) => {
    await page.goto('/student/dashboard');

    // Click login button with empty fields
    await page.click('button[type="submit"]');

    // Should trigger validation error messages
    await expect(page.locator('text=Email address is required')).toBeVisible();
    await expect(page.locator('text=Password must be at least 6 characters long')).toBeVisible();
  });

  test('should log in successfully with valid credentials and allow logout', async ({ page }) => {
    await page.goto('/student/dashboard');

    // Fill in credentials
    const testEmail = `disciple_${Date.now()}@livelystone.org`;
    await page.fill('input[type="email"]', testEmail);
    await page.fill('input[type="password"]', 'LivelyStone2026!');

    // Submit form
    await page.click('button[type="submit"]');

    // Wait for redirect to student dashboard home
    await expect(page.locator('text=STUDENT PORTAL')).toBeVisible();
    
    // Check that we see the logout button
    const logoutBtn = page.locator('button[title="Log Out"]');
    await expect(logoutBtn).toBeVisible();

    // Click logout
    await logoutBtn.click();

    // Should redirect back to public home
    await expect(page).toHaveURL(/\/$/);
  });
});
