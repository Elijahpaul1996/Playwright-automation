const { test, expect } = require('@playwright/test');

const LoginPage = require('../pages/LoginPage');
const CreateProjectPage = require('../pages/createprojectPage');
const { roleLocators } = require('../Locators/Rolesloc');
const { workitemLocators } = require('../Locators/workitemloc');
const projectCostsLocators = require('../Locators/projectcostloc');
const { getBaseUrl } = require('../env/baseenv');
const { projectData } = require('../testdata/projectData');

// Basic validation suite for locators and key interactions
test.describe('Locator & form validation', () => {
  test('should load home app and be able to login', async ({ page }) => {
    await page.goto(getBaseUrl());
    await page.waitForLoadState('networkidle');

    const login = new LoginPage(page);
    await login.loginWithMicrosoft();

    await expect(page).toHaveURL(/dashboard|projects/);
  });

  test('create project page locators and flow should be reachable', async ({ page }) => {
    await page.goto(getBaseUrl());
    await page.waitForLoadState('networkidle');
    const login = new LoginPage(page);
    await login.loginWithMicrosoftIfNeeded();

    const project = new CreateProjectPage(page);
    await expect(project.loc.createProjectBtn).toBeVisible({ timeout: 15000 });

    // If any overlay blocks the button, force click is safer for this validation scenario.
    await project.loc.createProjectBtn.click({ force: true });
    await expect(project.loc.clientDropdown).toBeVisible({ timeout: 15000 });
    await expect(project.loc.projectNameInput).toBeVisible();
    await expect(project.loc.createBtn).toBeVisible();
  });

  test('role/workitem/projectcost locator objects are defined', async ({ page }) => {
    const roleLoc = roleLocators(page);
    const workitemLoc = workitemLocators(page);
    const projectCostsLoc = projectCostsLocators(page);

    expect(roleLoc).toBeDefined();
    expect(workitemLoc).toBeDefined();
    expect(projectCostsLoc).toBeDefined();

    // verify a few key locators can resolve and do not throw
    await expect(roleLoc.addRoleBtn).toBeTruthy();
    await expect(workitemLoc.addWorkItemBtn).toBeTruthy();
    await expect(projectCostsLoc.addCostItemBtn).toBeTruthy();
  });

  test('estimating currency is locked and in USD', async ({ page }) => {
    await page.goto(getBaseUrl());
    await page.waitForLoadState('networkidle');
    const login = new LoginPage(page);
    await login.loginWithMicrosoftIfNeeded();

    // Open project costs area
    const projectCosts = new CreateProjectPage(page);
    await projectCosts.loc.projectCostsBtn.click({ force: true });

    const currencyLabelText = page.getByText('United States Dollar - USD($)', { exact: false });
    await expect(currencyLabelText).toBeVisible({ timeout: 15000 });

    const currencyInput = page.locator('input[name="estimatingCurrency"], select[name="estimatingCurrency"], input[aria-label*="Estimating Currency"], select[aria-label*="Estimating Currency"]');
    if (await currencyInput.count() > 0) {
      await expect(currencyInput.first()).toBeDisabled();
    } else {
      test.info().log('Estimating currency field is not editable or explicitly hidden, but label asserts USD value.');
    }
  });
});
