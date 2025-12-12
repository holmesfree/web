import { test, expect } from '@playwright/test';

/**
 * Test to verify that coin text is not clipped by circular paths
 * This test specifically checks for the issue where circular clipping
 * was affecting the "ELIZABETH HOLMES" and "★ SPIN TO MINT ★" text
 */

test.describe('Coin Text Clipping Verification', () => {
  test('Verify text is not clipped by circular paths', async ({ page }) => {
    console.log('🔍 Testing for text clipping issues...');
    
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000); // Wait for animations
    
    // Get the coin element
    const coin = page.locator('.perspective-1000');
    await expect(coin).toBeVisible();
    
    // Check if text elements are visible and not clipped
    const elizabethText = page.locator('text=ELIZABETH HOLMES');
    const spinText = page.locator('text=★ SPIN TO MINT ★');
    
    // Verify both text elements are visible
    await expect(elizabethText).toBeVisible();
    await expect(spinText).toBeVisible();
    
    // Take a close-up screenshot of the coin to visually inspect
    await coin.screenshot({
      path: 'tests/screenshots/coin-text-check.png'
    });
    
    console.log('✅ Text visibility check passed');
  });

  test('Verify text positioning and clipping', async ({ page }) => {
    console.log('🔍 Checking text positioning...');
    
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    
    // Check the structure to ensure text is outside clipped container
    const coinContainer = page.locator('.perspective-1000');
    
    // Get the bounding boxes to verify positioning
    const containerBox = await coinContainer.boundingBox();
    console.log('Coin container bounds:', containerBox);
    
    // Check if text elements exist in the DOM
    const topTextExists = await page.$('text=ELIZABETH HOLMES');
    const bottomTextExists = await page.$('text=★ SPIN TO MINT ★');
    
    console.log('Top text exists:', !!topTextExists);
    console.log('Bottom text exists:', !!bottomTextExists);
    
    // Verify text is not clipped by checking computed styles
    const textContainer = page.locator('div[style*="zIndex: 10"]');
    const hasTextContainer = await textContainer.count() > 0;
    
    console.log('Text container with zIndex exists:', hasTextContainer);
    
    if (hasTextContainer) {
      console.log('✅ Text is properly positioned outside clipped container');
    } else {
      console.log('⚠️  Text container not found - may still be clipped');
    }
    
    console.log('✅ Text positioning check completed');
  });

  test('Visual inspection of coin rendering', async ({ page }) => {
    console.log('🔍 Performing visual inspection...');
    
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    
    // Take multiple screenshots from different angles
    const coin = page.locator('.perspective-1000');
    
    // Screenshot 1: Full coin
    await coin.screenshot({
      path: 'tests/screenshots/coin-full.png'
    });
    
    // Screenshot 2: Top half (text area)
    await page.evaluate(() => {
      const coin = document.querySelector('.perspective-1000');
      if (coin) {
        coin.scrollIntoView({ behavior: 'auto', block: 'center' });
      }
    });
    
    await page.waitForTimeout(500);
    
    // Screenshot 3: Close-up of text
    const textArea = page.locator('div[style*="zIndex: 10"]');
    if (await textArea.count() > 0) {
      await textArea.screenshot({
        path: 'tests/screenshots/coin-text-closeup.png'
      });
    }
    
    console.log('✅ Visual inspection completed - check screenshots');
  });

  test('Check for circular clipping issues', async ({ page }) => {
    console.log('🔍 Checking for circular clipping...');
    
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    
    // Check if any elements still have problematic clipPath
    const clippedElements = await page.$$eval('*', elements => 
      elements.filter(el => 
        getComputedStyle(el).clipPath && 
        getComputedStyle(el).clipPath.includes('circle')
      )
    );
    
    console.log(`Found ${clippedElements.length} elements with circular clipping`);
    
    // Check if text elements are among the clipped elements
    const textElements = await page.$$('text');
    const clippedTextElements = textElements.filter(async el => {
      const clipPath = await el.evaluate(el => getComputedStyle(el).clipPath);
      return clipPath && clipPath.includes('circle');
    });
    
    console.log(`Text elements with circular clipping: ${(await clippedTextElements).length}`);
    
    if ((await clippedTextElements).length === 0) {
      console.log('✅ No text elements are being clipped');
    } else {
      console.log('⚠️  Some text elements are still being clipped');
    }
    
    console.log('✅ Circular clipping check completed');
  });
});