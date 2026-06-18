const { test, expect } = require('@playwright/test');

// ── Page imports ──────────────────────────────────────────────
const LoginPage  = require('../pages/LoginPage');

test('Validation of Create Project', async ({ page }) => {

  await page.goto('https://qa-ui-pricing-tool.azurewebsites.net/'); // QA URL
  await page.waitForLoadState('networkidle');
  
const login = new LoginPage(page);
await login.loginWithMicrosoft();










});