const { test } = require('@playwright/test');

test('login and save session', async ({ page }) => {

  await page.goto('https://pricing-tool-dev.test.insightglobal.com/dashboard');

  await page.getByRole('button', { name: 'Sign in with Microsoft' }).click();

  console.log(' Login manually now...');


  await page.waitForURL(/dashboard/, { timeout: 800000 });

  console.log(' Login saved');

  
  await page.context().storageState({ path: 'storageState.json' });

});