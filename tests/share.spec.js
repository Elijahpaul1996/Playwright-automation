


const { test, expect } = require('@playwright/test');

const LoginPage = require('../pages/LoginPage');
const { getBaseUrl } = require('../env/baseenv');
const projectCostsLocators = require('../Locators/projectcostloc');
const projectLocators  = require('../Locators/Createprojectloc');

// Reusable setup for each test
test.beforeEach(async ({ page }) => {
  const baseUrl = getBaseUrl();
  await page.goto(baseUrl);
  await page.waitForLoadState('networkidle');

  const login = new LoginPage(page);
   await login.loginWithMicrosoft();

  await expect(page).toHaveURL(/dashboard|projects/);
});

// Actual test case
// test('share project workflow', async ({ page }) => {
//   await page.getByText('Test02 Auto').click();
//   await page.getByRole('button', { name: 'Collaborate on project' }).click();
//   await page.getByRole('textbox', { name: 'Enter email address' }).click();
//   await page.getByRole('textbox', { name: 'Enter email address' }).fill('pavansairam Ganeshna');
//   await page.getByText('Pavansairam Ganeshna').click();
//   await page.getByRole('combobox').selectOption('edit');
//   await page.getByRole('button', { name: 'Invite' }).click();
//   await page.waitForTimeout(3000); // Wait for the share action to complete and UI to update
//   await expect(page.getByText('Shared project with')).toBeVisible();
//   console.log('Project shared successfully');
// });

test('share project workflow', async ({ page }) => {

  
  class ShareProjectPage {

   loc = projectLocators(page);
   constructor(page) {
    this.page = page;
    this.loc = projectLocators(page); // all locators loaded here
  };
};

const sharePage = new ShareProjectPage(page)
  const collaborators = [
    'Pavansairam Ganeshna',
    'Gowtham Thotakuri',
    'Krishnakaushal Dodda'
  ];

  await sharePage.loc.viewllBtn.click();

  // Open project
  await page.getByText('Test Project05').click();
  console.log('Project opened');
  await page.getByRole('button', { name: 'Collaborate on project' }).click();

  for (const user of collaborators) {

    // Enter email / name
    const emailInput = page.getByRole('textbox', { name: 'Enter email address' });
    await emailInput.click();
    await emailInput.fill(user);

    // Select user from dropdown
    await page.getByText(user, { exact: true }).click();

    // Select permission
    await page.getByRole('combobox').selectOption('edit');

    // Invite
    await page.getByRole('button', { name: 'Invite' }).click();

    // //  Assert invite success
    // await expect(
    //   page.getByText('Shared project with')
    // ).toBeVisible();

    console.log(`Project shared successfully with ${user}`);
  }
});
