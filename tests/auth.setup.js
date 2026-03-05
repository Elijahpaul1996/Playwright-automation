const { test } = require('@playwright/test');

test('login and save session', async ({ page }) => {

  await page.goto('https://pricingtool-ui.azurewebsites.net/dashboard');

  await page.getByRole('button', { name: 'Sign in with Microsoft' }).click();

  console.log('👉 Login manually now...');

  // give time to login manually
  await page.waitForURL(/dashboard/, { timeout: 300000 });

  console.log('✅ Login saved');

  // ⭐ Save login session
  await page.context().storageState({ path: 'storageState.json' });

});