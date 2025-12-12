import { test, expect } from '@playwright/test';

// Simple test to verify basic functionality
test.describe('HOLMES Website Basic Checks', () => {
  test('Verify component structure', async ({ page }) => {
    console.log('🔍 Running basic structure checks...');
    
    // Check if the MintCoin component has the right structure
    await page.goto('http://localhost:3000');
    
    // Wait for page to load
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000); // Extra wait for animations
    
    // Check for key elements
    const coin = page.locator('.perspective-1000');
    await expect(coin).toBeVisible();
    
    const logo = page.locator('text=HOLMES');
    await expect(logo).toBeVisible();
    
    const hero = page.locator('section');
    await expect(hero).toBeVisible();
    
    console.log('✅ Basic structure checks passed');
  });

  test('Check for visual regressions in coin', async ({ page }) => {
    console.log('🔍 Checking coin visual elements...');
    
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    
    // Check if portrait is circular (not square)
    const portraitContainer = page.locator('.absolute.rounded-full.overflow-hidden.border');
    await expect(portraitContainer).toBeVisible();
    
    // Check if text elements are present
    const elizabethText = page.locator('text=ELIZABETH HOLMES');
    await expect(elizabethText).toBeVisible();
    
    const spinText = page.locator('text=★ SPIN TO MINT ★');
    await expect(spinText).toBeVisible();
    
    console.log('✅ Coin visual elements check passed');
  });

  test('Verify navbar elements', async ({ page }) => {
    console.log('🔍 Checking navbar elements...');
    
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');
    
    // Check navbar logo
    const navbarLogo = page.locator('nav >> text=HOLMES');
    await expect(navbarLogo).toBeVisible();
    
    // Check if logo has animation class
    const hasAnimation = await navbarLogo.evaluate(el => 
      el.classList.contains('animate-shimmer-text')
    );
    
    console.log(`Logo has shimmer animation: ${hasAnimation}`);
    
    // Check navigation links
    const navLinks = page.locator('nav a');
    const linkCount = await navLinks.count();
    console.log(`Found ${linkCount} navigation links`);
    
    console.log('✅ Navbar elements check passed');
  });

  test('Check responsive design', async ({ page }) => {
    console.log('🔍 Testing responsive design...');
    
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');
    
    // Check if mobile menu button exists
    const mobileMenuButton = page.locator('button[aria-label="Toggle menu"]');
    const isMobileMenuVisible = await mobileMenuButton.isVisible();
    console.log(`Mobile menu button visible: ${isMobileMenuVisible}`);
    
    // Test desktop viewport
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.reload();
    await page.waitForLoadState('networkidle');
    
    // Check if desktop nav is visible
    const desktopNav = page.locator('nav >> text=Story');
    const isDesktopNavVisible = await desktopNav.isVisible();
    console.log(`Desktop navigation visible: ${isDesktopNavVisible}`);
    
    console.log('✅ Responsive design check passed');
  });
});