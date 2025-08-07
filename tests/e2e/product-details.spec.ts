import { test, expect } from '@playwright/test';

test.describe('Product Details Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Wait for products to load
    await expect(page.locator('[data-testid="product-card"]').first()).toBeVisible({ timeout: 10000 });
    
    // Navigate to first product details
    await page.locator('[data-testid="product-card"]').first().click();
    await expect(page).toHaveURL(/\/product\/\d+/);
  });

  test('should display product details correctly', async ({ page }) => {
    // Check main elements are visible
    await expect(page.locator('[data-testid="product-image"]')).toBeVisible();
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('[data-testid="product-description"]')).toBeVisible();
    await expect(page.locator('[data-testid="product-price"]')).toBeVisible();
    await expect(page.locator('[data-testid="product-rating"]')).toBeVisible();
  });

  test('should display breadcrumb navigation', async ({ page }) => {
    // Check breadcrumb elements
    await expect(page.getByText('Home')).toBeVisible();
    await expect(page.locator('nav').getByText('/')).toBeVisible();
    
    // Breadcrumb Home link should work
    await page.getByText('Home').click();
    await expect(page).toHaveURL('/');
  });

  test('should have quantity selector', async ({ page }) => {
    // Check quantity controls
    await expect(page.locator('[data-testid="quantity-selector"]')).toBeVisible();
    await expect(page.locator('[data-testid="decrease-quantity"]')).toBeVisible();
    await expect(page.locator('[data-testid="increase-quantity"]')).toBeVisible();
    
    // Test quantity controls
    await page.locator('[data-testid="increase-quantity"]').click();
    await expect(page.locator('[data-testid="quantity-display"]')).toHaveText('2');
    
    await page.locator('[data-testid="decrease-quantity"]').click();
    await expect(page.locator('[data-testid="quantity-display"]')).toHaveText('1');
  });

  test('should add product to cart with selected quantity', async ({ page }) => {
    // Set quantity to 3
    await page.locator('[data-testid="increase-quantity"]').click();
    await page.locator('[data-testid="increase-quantity"]').click();
    await expect(page.locator('[data-testid="quantity-display"]')).toHaveText('3');
    
    // Add to cart
    await page.getByText('Add to Cart').click();
    
    // Check toast notification
    await expect(page.locator('[data-testid="toast"]')).toBeVisible();
    
    // Navigate to cart and verify quantity
    await page.getByText('View Cart').click();
    await expect(page).toHaveURL('/cart');
    await expect(page.locator('[data-testid="quantity-display"]').first()).toHaveText('3');
  });

  test('should display category badge', async ({ page }) => {
    // Check category badge is visible
    await expect(page.locator('[data-testid="category-badge"]')).toBeVisible();
  });

  test('should show current cart quantity for product', async ({ page }) => {
    // Add item to cart first
    await page.getByText('Add to Cart').click();
    
    // Should show current quantity in cart
    await expect(page.getByText(/in cart/)).toBeVisible();
  });

  test('should handle invalid product ID', async ({ page }) => {
    // Navigate to non-existent product
    await page.goto('/product/999999');
    
    // Should show error message
    await expect(page.getByText('Product not found')).toBeVisible();
    await expect(page.getByText('Go Back')).toBeVisible();
    await expect(page.getByText('Browse Products')).toBeVisible();
  });

  test('should be responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    
    // All elements should still be visible on mobile
    await expect(page.locator('[data-testid="product-image"]')).toBeVisible();
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.getByText('Add to Cart')).toBeVisible();
    await expect(page.locator('[data-testid="quantity-selector"]')).toBeVisible();
  });

  test('should display product rating with stars', async ({ page }) => {
    // Check rating display
    await expect(page.locator('[data-testid="product-rating"]')).toBeVisible();
    
    // Should have star icons
    await expect(page.locator('[data-testid="rating-stars"]')).toBeVisible();
    
    // Should show rating number and review count
    await expect(page.locator('[data-testid="rating-number"]')).toBeVisible();
    await expect(page.locator('[data-testid="review-count"]')).toBeVisible();
  });
});
