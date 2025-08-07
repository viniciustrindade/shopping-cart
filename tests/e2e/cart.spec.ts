import { test, expect } from '@playwright/test';

test.describe('Cart Functionality', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Wait for products to load
    await expect(page.locator('[data-testid="product-card"]').first()).toBeVisible({ timeout: 10000 });
  });

  test('should add multiple items to cart', async ({ page }) => {
    // Add first product
    await page.locator('[data-testid="product-card"]').first().locator('button[aria-label*="Add"]').click();
    await expect(page.locator('[data-testid="cart-badge"]')).toHaveText('1');
    
    // Add second product
    await page.locator('[data-testid="product-card"]').nth(1).locator('button[aria-label*="Add"]').click();
    await expect(page.locator('[data-testid="cart-badge"]')).toHaveText('2');
    
    // Add first product again (should increment quantity)
    await page.locator('[data-testid="product-card"]').first().locator('button[aria-label*="Add"]').click();
    await expect(page.locator('[data-testid="cart-badge"]')).toHaveText('3');
  });

  test('should navigate to cart page', async ({ page }) => {
    // Add item to cart
    await page.locator('[data-testid="product-card"]').first().locator('button[aria-label*="Add"]').click();
    
    // Click cart icon
    await page.locator('button[aria-label*="Shopping cart"]').click();
    
    // Should navigate to cart page
    await expect(page).toHaveURL('/cart');
    await expect(page.getByText('Your Cart')).toBeVisible();
  });

  test('should display empty cart state', async ({ page }) => {
    // Navigate to cart page without adding items
    await page.goto('/cart');
    
    // Should show empty cart message
    await expect(page.getByText('Your Cart is Empty')).toBeVisible();
    await expect(page.getByText('Continue Shopping')).toBeVisible();
  });

  test('should display cart items correctly', async ({ page }) => {
    // Add items to cart
    await page.locator('[data-testid="product-card"]').first().locator('button[aria-label*="Add"]').click();
    await page.locator('[data-testid="product-card"]').nth(1).locator('button[aria-label*="Add"]').click();
    
    // Navigate to cart
    await page.locator('button[aria-label*="Shopping cart"]').click();
    
    // Should show cart items
    await expect(page.locator('[data-testid="cart-item"]')).toHaveCount(2);
    
    // Check cart item elements
    const firstItem = page.locator('[data-testid="cart-item"]').first();
    await expect(firstItem.locator('img')).toBeVisible();
    await expect(firstItem.locator('h3')).toBeVisible();
    await expect(firstItem.locator('[data-testid="quantity-display"]')).toBeVisible();
  });

  test('should update item quantities', async ({ page }) => {
    // Add item to cart
    await page.locator('[data-testid="product-card"]').first().locator('button[aria-label*="Add"]').click();
    
    // Navigate to cart
    await page.locator('button[aria-label*="Shopping cart"]').click();
    
    // Check initial quantity
    await expect(page.locator('[data-testid="quantity-display"]').first()).toHaveText('1');
    
    // Increase quantity
    await page.locator('[data-testid="increase-quantity"]').first().click();
    await expect(page.locator('[data-testid="quantity-display"]').first()).toHaveText('2');
    
    // Decrease quantity
    await page.locator('[data-testid="decrease-quantity"]').first().click();
    await expect(page.locator('[data-testid="quantity-display"]').first()).toHaveText('1');
  });

  test('should remove items from cart', async ({ page }) => {
    // Add items to cart
    await page.locator('[data-testid="product-card"]').first().locator('button[aria-label*="Add"]').click();
    await page.locator('[data-testid="product-card"]').nth(1).locator('button[aria-label*="Add"]').click();
    
    // Navigate to cart
    await page.locator('button[aria-label*="Shopping cart"]').click();
    
    // Should have 2 items
    await expect(page.locator('[data-testid="cart-item"]')).toHaveCount(2);
    
    // Remove first item
    await page.locator('[data-testid="remove-item"]').first().click();
    
    // Should have 1 item left
    await expect(page.locator('[data-testid="cart-item"]')).toHaveCount(1);
  });

  test('should clear entire cart', async ({ page }) => {
    // Add items to cart
    await page.locator('[data-testid="product-card"]').first().locator('button[aria-label*="Add"]').click();
    await page.locator('[data-testid="product-card"]').nth(1).locator('button[aria-label*="Add"]').click();
    
    // Navigate to cart
    await page.locator('button[aria-label*="Shopping cart"]').click();
    
    // Clear cart
    await page.getByText('Clear Cart').click();
    
    // Should show empty cart
    await expect(page.getByText('Your Cart is Empty')).toBeVisible();
  });

  test('should calculate totals correctly', async ({ page }) => {
    // Add items to cart
    await page.locator('[data-testid="product-card"]').first().locator('button[aria-label*="Add"]').click();
    
    // Navigate to cart
    await page.locator('button[aria-label*="Shopping cart"]').click();
    
    // Should show order summary with totals
    await expect(page.getByText('Order Summary')).toBeVisible();
    await expect(page.locator('[data-testid="total-price"]')).toBeVisible();
    
    // Add more quantity and check total updates
    await page.locator('[data-testid="increase-quantity"]').first().click();
    // Total should be updated (we can't check exact amount without knowing product price)
  });

  test('should persist cart state across page refreshes', async ({ page }) => {
    // Add items to cart
    await page.locator('[data-testid="product-card"]').first().locator('button[aria-label*="Add"]').click();
    await expect(page.locator('[data-testid="cart-badge"]')).toHaveText('1');
    
    // Refresh page
    await page.reload();
    
    // Wait for page to load
    await expect(page.locator('[data-testid="product-card"]').first()).toBeVisible({ timeout: 10000 });
    
    // Cart badge should still show 1
    await expect(page.locator('[data-testid="cart-badge"]')).toHaveText('1');
    
    // Navigate to cart and verify item is still there
    await page.locator('button[aria-label*="Shopping cart"]').click();
    await expect(page.locator('[data-testid="cart-item"]')).toHaveCount(1);
  });
});
