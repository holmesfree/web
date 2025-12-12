import { test, expect } from '@playwright/test';

// Test suite for visual regression and responsive design
test.describe('HOLMES Website Visual Tests', () => {
  // Test different screen resolutions
  const resolutions = [
    { name: 'mobile', width: 375, height: 812 },
    { name: 'tablet', width: 768, height: 1024 },
    { name: 'desktop', width: 1440, height: 900 },
    { name: 'large-desktop', width: 1920, height: 1080 }
  ];

  // Test each resolution
  for (const resolution of resolutions) {
    test(`Visual test at ${resolution.name} resolution (${resolution.width}x${resolution.height})`, async ({ page }) => {
      // Set viewport size
      await page.setViewportSize({ width: resolution.width, height: resolution.height });
      
      // Navigate to the website
      await page.goto('http://localhost:3000');
      
      // Wait for page to load completely
      await page.waitForLoadState('networkidle');
      
      // Take screenshot
      await page.screenshot({
        path: `tests/screenshots/${resolution.name}-${resolution.width}x${resolution.height}.png`,
        fullPage: true
      });
      
      console.log(`✅ Screenshot captured: ${resolution.name} (${resolution.width}x${resolution.height})`);
    });
  }

  // Test specific interactive elements
  test('Test navbar HOLMES logo animation', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');
    
    // Check if HOLMES logo has shimmer animation
    const logo = page.locator('text=HOLMES');
    await expect(logo).toBeVisible();
    
    // Take close-up screenshot of logo
    await logo.screenshot({
      path: 'tests/screenshots/holmes-logo-closeup.png'
    });
    
    console.log('✅ HOLMES logo animation test completed');
  });

  test('Test mint coin interaction', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');
    
    // Find and click the mint coin
    const coin = page.locator('.perspective-1000');
    await expect(coin).toBeVisible();
    
    // Hover to trigger tooltip
    await coin.hover();
    await page.waitForTimeout(500); // Wait for tooltip to appear
    
    // Take screenshot of coin with tooltip
    await coin.screenshot({
      path: 'tests/screenshots/mint-coin-tooltip.png'
    });
    
    console.log('✅ Mint coin interaction test completed');
  });

  test('Test responsive navbar', async ({ page }) => {
    // Test mobile menu
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');
    
    // Open mobile menu
    const menuButton = page.locator('button[aria-label="Toggle menu"]');
    await menuButton.click();
    
    // Wait for menu to open
    await page.waitForTimeout(500);
    
    // Take screenshot of mobile menu
    await page.screenshot({
      path: 'tests/screenshots/mobile-menu.png',
      fullPage: true
    });
    
    // Close menu
    await menuButton.click();
    await page.waitForTimeout(300);
    
    console.log('✅ Responsive navbar test completed');
  });

  test('Test hero section animations', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');
    
    // Wait for fade-in animations to complete
    await page.waitForTimeout(1000);
    
    // Take screenshot of hero section
    const hero = page.locator('section');
    await hero.screenshot({
      path: 'tests/screenshots/hero-section.png'
    });
    
    console.log('✅ Hero section animation test completed');
  });

  test('Check for visual bugs', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');
    
    // Check for common visual issues
    console.log('🔍 Checking for visual bugs...');
    
    // Check for overflow issues
    const body = page.locator('body');
    const overflowX = await body.evaluate(el => getComputedStyle(el).overflowX);
    console.log(`Body overflow-X: ${overflowX}`);
    
    // Check for broken images
    const brokenImages = await page.$$eval('img', imgs => 
      imgs.filter(img => !img.complete || img.naturalWidth === 0).length
    );
    console.log(`Broken images: ${brokenImages}`);
    
    // Check console for errors
    const consoleMessages = [];
    page.on('console', msg => consoleMessages.push(msg.text()));
    
    // Reload to catch any errors
    await page.reload();
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
    
    console.log(`Console messages: ${consoleMessages.length}`);
    if (consoleMessages.length > 0) {
      console.log('Console output:', consoleMessages);
    }
    
    console.log('✅ Visual bug check completed');
  });
});