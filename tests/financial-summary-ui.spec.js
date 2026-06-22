const { test, expect } = require('@playwright/test');

const LoginPage = require('../pages/LoginPage');
const FinancialSummaryPage = require('../pages/FinancialSummaryPage');
const { getBaseUrl } = require('../env/baseenv');

test.setTimeout(300000);

test('read financial summary values from UI project', async ({ page }) => {
  const projectName = 'Enter Project Name Here';

  await page.goto(getBaseUrl());
  await page.waitForLoadState('networkidle');

  const login = new LoginPage(page);
  await login.loginWithMicrosoft();
  await expect(page).toHaveURL(/dashboard|projects/);

  const financialSummary = new FinancialSummaryPage(page);
  await financialSummary.navigateToProject(projectName);
  await financialSummary.openFinancialSummary();

  const snapshot = await financialSummary.saveFinancialSummarySnapshot();
  console.log(JSON.stringify(snapshot.values, null, 2));
});
