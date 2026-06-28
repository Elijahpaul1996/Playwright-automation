const { test } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
const FinancialSummaryPage = require('../pages/readFinancialSummaryPage');
const { getBaseUrl } = require('../env/baseenv');

test.setTimeout(300000);

test('read financial summary values from UI project', async ({ page }) => {

  await page.goto(getBaseUrl());
  await page.waitForLoadState('networkidle');

  const login = new LoginPage(page);
  await login.loginWithMicrosoft();
  console.log('Login completed');

  await page.waitForTimeout(3000);

  const financialSummary = new FinancialSummaryPage(page);
  await financialSummary.navigateToProject();
  console.log('Project opened');

  const snapshot = await financialSummary.saveAllSnapshots();
  console.log('Snapshot saved successfully');
  console.log(`Financial Summary : ${snapshot.financialSummary.length} fields`);
  console.log(`Monthly P&L       : ${snapshot.monthlyPAndL.length} fields`);

});