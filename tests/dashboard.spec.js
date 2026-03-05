/*const { test } = require('@playwright/test');
const CreateProjectPage = require('../pages/createprojectPage');

test('Create Project directly', async ({ page }) => {

  await page.goto('https://pricingtool-ui.azurewebsites.net/dashboard');

  // Click Microsoft login
  await page.getByRole('button', { name: 'Sign in with Microsoft' }).click();

  // ⭐ Wait for Microsoft login page in SAME TAB
  await page.waitForURL(/login\.microsoftonline\.com/);

  // Click account containing Elijah
  await page.getByRole('button', { name: /Elijah/i }).click();

  // Wait until dashboard loads again
  await page.waitForURL(/dashboard/);

  console.log('✅ Logged in successfully');

  await page.getByRole('button', { name: 'Create Project' }).click();

  const createProject = new CreateProjectPage(page);
  await createProject.createProject();

});*/

const { test } = require('@playwright/test');
const CreateProjectPage = require('../pages/createprojectPage');
const CreateRolePage = require('../pages/createrolePage');
const CreateWorkitemPage = require('../pages/createworkitemPage');
const CreateprojectCostsPage = require('../pages/createprojectcostsPage');

test('Create Project directly', async ({ page }) => {
    test.setTimeout(120000); // 2 minutes

  await page.goto('https://pricingtool-ui.azurewebsites.net/dashboard');
  await page.waitForLoadState('networkidle');
   
  await page.getByRole("button", {name: 'Sign in with Microsoft'}).click();
  //await page.waitForTimeout(2000);
   //await page.getByRole("button", {name: 'Elijah Paul'}).click();

  /*await page.getByRole('button', { name: 'Create Project' }).click();

  const createProject = new CreateProjectPage(page);
  await createProject.createProject();*/

  const createRole = new CreateRolePage(page);
  await createRole.createRole();
  await createRole.createRole2();

  
  const createWorkitem = new CreateWorkitemPage(page);
  await createWorkitem.createworkitem();

  const createProjectCosts = new CreateprojectCostsPage(page);
  await createProjectCosts.createprojectcosts();

});


