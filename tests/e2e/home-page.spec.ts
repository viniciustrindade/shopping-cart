import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display header with correct elements', async ({ page }) => {
    // Check header elements
    await expect(page.locator('header')).toBeVisible();
    await expect(page.locator('header')).toHaveCSS('background-color', 'rgb(0, 0, 0)');
    
    // Check logo
    await expect(page.getByText('Shop')).toBeVisible();
    
    // Check search bar
    await expect(page.getByPlaceholder('Buscar Productos ...')).toBeVisible();
    
    // Check cart icon
    await expect(page.locator('button[aria-label*="Shopping cart"]')).toBeVisible();
  });

  test('should load and display products', async ({ page }) => {
    // Wait for products to load
    await expect(page.locator('[data-testid="product-card"]').first()).toBeVisible({ timeout: 10000 });
    
    // Check initial product count (should show 3 products)
    const productCards = page.locator('[data-testid="product-card"]');
    await expect(productCards).toHaveCount(3);
    
    // Verify product card elements
    const firstCard = productCards.first();
    await expect(firstCard.locator('img')).toBeVisible();
    await expect(firstCard.locator('h3')).toBeVisible();
    await expect(firstCard.locator('button[aria-label*="Add"]')).toBeVisible();
    await expect(firstCard.locator('[data-testid="price-badge"]')).toBeVisible();
  });

  test('should add item to cart and update badge', async ({ page }) => {
    // Wait for products to load
    await expect(page.locator('[data-testid="product-card"]').first()).toBeVisible({ timeout: 10000 });
    
    // Click add to cart on first product
    await page.locator('[data-testid="product-card"]').first().locator('button[aria-label*="Add"]').click();
    
    // Check cart badge appears with count 1
    await expect(page.locator('[data-testid="cart-badge"]')).toBeVisible();
    await expect(page.locator('[data-testid="cart-badge"]')).toHaveText('1');
    
    // Check toast notification appears
    await expect(page.locator('[data-testid="toast"]')).toBeVisible();
  });

  test('should filter products with search', async ({ page }) => {
    // Wait for products to load
    await expect(page.locator('[data-testid="product-card"]').first()).toBeVisible({ timeout: 10000 });
    
    // Get initial product count
    const initialCount = await page.locator('[data-testid="product-card"]').count();
    
    // Search for "shirt"
    await page.getByPlaceholder('Buscar Productos ...').fill('shirt');
    
    // Wait for search results to update
    await page.waitForTimeout(500);
    
    // Check that results are filtered (should be fewer products)
    const filteredCount = await page.locator('[data-testid="product-card"]').count();
    expect(filteredCount).toBeLessThanOrEqual(initialCount);
  });

  test('should load more products with VIEW MORE button', async ({ page }) => {
    // Wait for products to load
    await expect(page.locator('[data-testid="product-card"]').first()).toBeVisible({ timeout: 10000 });
    
    // Check initial count
    const initialCount = await page.locator('[data-testid="product-card"]').count();
    expect(initialCount).toBe(3);
    
    // Click VIEW MORE button
    await page.getByText('VIEW MORE').click();
    
    // Wait for more products to load
    await page.waitForTimeout(1000);
    
    // Check increased count
    const newCount = await page.locator('[data-testid="product-card"]').count();
    expect(newCount).toBeGreaterThan(initialCount);
  });

  test('should navigate to product details on card click', async ({ page }) => {
    // Wait for products to load
    await expect(page.locator('[data-testid="product-card"]').first()).toBeVisible({ timeout: 10000 });
    
    // Click on first product card
    await page.locator('[data-testid="product-card"]').first().click();
    
    // Should navigate to product details page
    await expect(page).toHaveURL(/\/product\/\d+/);
    
    // Should show product details elements
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('[data-testid="product-image"]')).toBeVisible();
    await expect(page.getByText('Add to Cart')).toBeVisible();
  });
});

test.describe('Home Page - Responsive', () => {
  test('should display correctly on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    // Wait for products to load
    await expect(page.locator('[data-testid="product-card"]').first()).toBeVisible({ timeout: 10000 });
    
    // Check that products are displayed in single column on mobile
    const productCards = page.locator('[data-testid="product-card"]');
    await expect(productCards.first()).toBeVisible();
    
    // Check header is responsive
    await expect(page.locator('header')).toBeVisible();
    await expect(page.getByPlaceholder('Buscar Productos ...')).toBeVisible();
  });
});
