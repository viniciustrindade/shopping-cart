import { test, expect } from '@playwright/test';

test.describe('README Screenshots', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the home page
    await page.goto('/');
    
    // Wait for products to load
    await page.waitForSelector('[data-testid="product-card"]', { timeout: 10000 });
  });

  test('Take hero banner screenshot', async ({ page }) => {
    // Wait for all content to load
    await page.waitForLoadState('networkidle');
    
    // Take full page screenshot
    await page.screenshot({
      path: 'docs/screenshots/hero-banner.png',
      fullPage: true
    });
  });

  test('Take home page screenshot', async ({ page }) => {
    // Wait for products to load
    await page.waitForSelector('[data-testid="product-card"]');
    
    // Take screenshot of the main content area
    await page.screenshot({
      path: 'docs/screenshots/home-page.png',
      clip: { x: 0, y: 0, width: 1200, height: 600 }
    });
  });

  test('Take step 1 - browse screenshot', async ({ page }) => {
    // Initial state with 3 products
    await page.waitForSelector('[data-testid="product-card"]');
    
    await page.screenshot({
      path: 'docs/screenshots/step-1-browse.png',
      clip: { x: 0, y: 0, width: 1200, height: 600 }
    });
  });

  test('Take step 2 - add items screenshot', async ({ page }) => {
    // Add an item to cart to show the purple button state
    const addButton = page.locator('[data-testid="product-card"]').first().locator('button');
    await addButton.click();
    
    // Wait for cart badge to update
    await page.waitForSelector('[data-testid="cart-badge"]');
    
    // Wait for toast to appear and disappear
    await page.waitForTimeout(4000);
    
    await page.screenshot({
      path: 'docs/screenshots/step-2-add-items.png',
      clip: { x: 0, y: 0, width: 1200, height: 600 }
    });
  });

  test('Take product details screenshot', async ({ page }) => {
    // Navigate to first product
    await page.locator('[data-testid="product-card"]').first().click();
    
    // Wait for product details to load
    await page.waitForSelector('[data-testid="product-title"]');
    
    await page.screenshot({
      path: 'docs/screenshots/product-details.png',
      clip: { x: 0, y: 0, width: 1200, height: 600 }
    });
  });

  test('Take step 3 - product details screenshot', async ({ page }) => {
    // Navigate to first product
    await page.locator('[data-testid="product-card"]').first().click();
    
    // Wait for product details to load
    await page.waitForSelector('[data-testid="product-title"]');
    
    // Change quantity to show the selector
    await page.locator('[data-testid="increase-quantity"]').click();
    await page.locator('[data-testid="increase-quantity"]').click();
    
    await page.screenshot({
      path: 'docs/screenshots/step-3-product-details.png',
      clip: { x: 0, y: 0, width: 1200, height: 600 }
    });
  });

  test('Take cart page screenshot', async ({ page }) => {
    // Add some items to cart first
    const productCards = page.locator('[data-testid="product-card"]');
    await productCards.nth(0).locator('button').click();
    await page.waitForTimeout(1000);
    await productCards.nth(1).locator('button').click();
    await page.waitForTimeout(1000);
    await productCards.nth(2).locator('button').click();
    await page.waitForTimeout(1000);
    
    // Navigate to cart
    await page.locator('[data-testid="cart-icon"]').click();
    
    // Wait for cart items to load
    await page.waitForSelector('[data-testid="cart-item"]');
    
    await page.screenshot({
      path: 'docs/screenshots/cart-page.png',
      clip: { x: 0, y: 0, width: 1200, height: 600 }
    });
  });

  test('Take step 4 - manage cart screenshot', async ({ page }) => {
    // Add multiple items with different quantities
    const productCards = page.locator('[data-testid="product-card"]');
    
    // Add first product twice
    await productCards.nth(0).locator('button').click();
    await page.waitForTimeout(500);
    await productCards.nth(0).locator('button').click();
    await page.waitForTimeout(500);
    
    // Add second product once
    await productCards.nth(1).locator('button').click();
    await page.waitForTimeout(500);
    
    // Navigate to cart
    await page.locator('[data-testid="cart-icon"]').click();
    
    // Wait for cart items to load
    await page.waitForSelector('[data-testid="cart-item"]');
    
    await page.screenshot({
      path: 'docs/screenshots/step-4-manage-cart.png',
      clip: { x: 0, y: 0, width: 1200, height: 600 }
    });
  });

  test('Take step 5 - global sync screenshot', async ({ page }) => {
    // Add items to cart
    const productCards = page.locator('[data-testid="product-card"]');
    await productCards.nth(0).locator('button').click();
    await page.waitForTimeout(500);
    await productCards.nth(0).locator('button').click();
    await page.waitForTimeout(500);
    await productCards.nth(1).locator('button').click();
    await page.waitForTimeout(500);
    
    // Go to cart and back to home to show global sync
    await page.locator('[data-testid="cart-icon"]').click();
    await page.waitForSelector('[data-testid="cart-item"]');
    await page.goBack();
    
    // Wait for products to load with updated quantities
    await page.waitForSelector('[data-testid="product-card"]');
    await page.waitForTimeout(1000);
    
    await page.screenshot({
      path: 'docs/screenshots/step-5-global-sync.png',
      clip: { x: 0, y: 0, width: 1200, height: 600 }
    });
  });

  test('Take toast notification screenshot', async ({ page }) => {
    // Add item to trigger toast
    const addButton = page.locator('[data-testid="product-card"]').first().locator('button');
    await addButton.click();
    
    // Wait a moment for toast to appear
    await page.waitForTimeout(500);
    
    // Take screenshot of top-right area where toast appears
    await page.screenshot({
      path: 'docs/screenshots/toast-notifications.png',
      clip: { x: 800, y: 0, width: 400, height: 200 }
    });
  });

  test('Take mobile view screenshot', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Navigate to home page
    await page.goto('/');
    await page.waitForSelector('[data-testid="product-card"]');
    
    // Take full mobile screenshot
    await page.screenshot({
      path: 'docs/screenshots/mobile-view.png',
      fullPage: true
    });
  });
});
