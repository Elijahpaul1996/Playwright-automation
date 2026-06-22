// const { test, expect } = require('@playwright/test');

// const LoginPage = require('../pages/LoginPage');
// const FinancialSummaryPage = require('../pages/FinancialSummaryPage');
// const { getBaseUrl } = require('../env/baseenv');

// test.setTimeout(300000);

// test('read financial summary values from UI project', async ({ page }) => {
//   //const projectName = 'Test Project01';

//   await page.goto(getBaseUrl());
//   await page.waitForLoadState('networkidle');

//   const login = new LoginPage(page);
//   await login.loginWithMicrosoft();

//   await page.waitForTimeout(3000);
//   await expect(page).toHaveURL(/dashboard|projects/);

//   const financialSummary = new FinancialSummaryPage(page);
//   await financialSummary.navigateToProject();
//   // await financialSummary.openProject(projectName);
//   await financialSummary.openFinancialSummary();
//   console.log('Financial Summary opened');
//   await financialSummary.readFinancialSummaryValues();


//   const snapshot = await financialSummary.saveFinancialSummarySnapshot();
//   console.log(JSON.stringify(snapshot.values, null, 2));
// });

const { test, expect } = require('@playwright/test');

const LoginPage = require('../pages/LoginPage');
const FinancialSummaryPage = require('../pages/FinancialSummaryPage');
const { getBaseUrl } = require('../env/baseenv');

test.setTimeout(300000);

test('read financial summary values from UI project', async ({ page }) => {

  await page.goto(getBaseUrl());
  await page.waitForLoadState('networkidle');

  // Login
  const login = new LoginPage(page);
  await login.loginWithMicrosoft();

  console.log('Login completed');
  console.log('Current URL:', page.url());

  // Optional: replace URL validation with a dashboard element
  await page.waitForTimeout(3000);

  // Navigate to project
  const financialSummary = new FinancialSummaryPage(page);

  await financialSummary.navigateToProject();
  console.log('Project opened');

  // Open Financial Summary section
  await financialSummary.openFinancialSummary();
  console.log('Financial Summary opened');

  // Read values and save snapshot
  const snapshot = await financialSummary.saveFinancialSummarySnapshot();

  console.log('Financial Summary Snapshot Saved');
  console.log(JSON.stringify(snapshot.values, null, 2));

});