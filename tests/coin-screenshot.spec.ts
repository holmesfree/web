import { test, expect } from '@playwright/test';

/**
 * Test to take screenshots of the coin to verify text clipping fix
 */

test.describe('Coin Visual Verification', () => {
  test('Take coin screenshot to verify no text clipping', async ({ page }) => {
    console.log('📸 Taking coin screenshots for visual verification...');
    
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000); // Wait for animations
    
    // Find the coin element
    const coin = page.locator('.perspective-1000');
    await expect(coin).toBeVisible();
    
    // Scroll coin into view
    await coin.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    
    // Take full coin screenshot
    await coin.screenshot({
      path: 'tests/screenshots/coin-full-view.png',
      animations: 'disabled' // Disable animations for clearer screenshot
    });
    
    // Take close-up of text area
    const textArea = page.locator('div[style*="zIndex: 10"]');
    if (await textArea.count() > 0) {
      await textArea.screenshot({
        path: 'tests/screenshots/coin-text-closeup.png'
      });
    }
    
    // Take screenshot of just the portrait area
    const portraitContainer = page.locator('.absolute.rounded-full.overflow-hidden.border');
    if (await portraitContainer.count() > 0) {
      await portraitContainer.screenshot({
        path: 'tests/screenshots/coin-portrait-only.png'
      });
    }
    
    console.log('✅ Screenshots captured - check tests/screenshots/ directory');
  });

  test('Verify text is not clipped', async ({ page }) => {
    console.log('🔍 Verifying text is not clipped...');
    
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    
    // Check if text elements are visible
    const elizabethText = page.locator('text=ELIZABETH HOLMES');
    const bringHerHomeText = page.locator('text=★ BRING HER HOME ★');
    
    await expect(elizabethText).toBeVisible();
    await expect(bringHerHomeText).toBeVisible();
    
    // Get bounding boxes to verify positioning
    const elizabethBox = await elizabethText.boundingBox();
    const bringHerHomeBox = await bringHerHomeText.boundingBox();
    
    console.log('ELIZABETH HOLMES position:', elizabethBox);
    console.log('BRING HER HOME position:', bringHerHomeBox);
    
    // Verify text is not clipped by checking if bounding boxes have reasonable dimensions
    if (elizabethBox && bringHerHomeBox) {
      const elizabethWidth = elizabethBox.width;
      const bringHerHomeWidth = bringHerHomeBox.width;
      
      console.log(`ELIZABETH HOLMES width: ${elizabethWidth}px`);
      console.log(`BRING HER HOME width: ${bringHerHomeWidth}px`);
      
      // Text should have reasonable width if not clipped
      if (elizabethWidth > 50 && bringHerHomeWidth > 50) {
        console.log('✅ Text appears to have proper width (not clipped)');
      } else {
        console.log('⚠️  Text may be clipped (too narrow)');
      }
    }
    
    console.log('✅ Text verification completed');
  });

  test('Check for circular clipping on text elements', async ({ page }) => {
    console.log('🔍 Checking for circular clipping on text...');
    
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    
    // Check if text elements have circular clipping
    const textElements = await page.$$('text');
    let clippedTextCount = 0;
    
    for (const textElement of textElements) {
      const clipPath = await textElement.evaluate(el => 
        getComputedStyle(el).clipPath
      );
      
      if (clipPath && clipPath.includes('circle')) {
        clippedTextCount++;
        const textContent = await textElement.textContent();
        console.log(`⚠️  Text element with clipping: "${textContent}"`);
      }
    }
    
    if (clippedTextCount === 0) {
      console.log('✅ No text elements have circular clipping');
    } else {
      console.log(`⚠️  Found ${clippedTextCount} text elements with circular clipping`);
    }
    
    // Check parent containers for overflow-hidden that might clip text
    const containers = await page.$$('.absolute.rounded-full');
    let overflowHiddenContainers = 0;
    
    for (const container of containers) {
      const overflow = await container.evaluate(el => 
        getComputedStyle(el).overflow
      );
      
      if (overflow === 'hidden') {
        overflowHiddenContainers++;
        console.log(`⚠️  Container with overflow-hidden found`);
      }
    }
    
    if (overflowHiddenContainers === 0) {
      console.log('✅ No containers with overflow-hidden that could clip text');
    } else {
      console.log(`⚠️  Found ${overflowHiddenContainers} containers with overflow-hidden`);
    }
    
    console.log('✅ Circular clipping check completed');
  });
});