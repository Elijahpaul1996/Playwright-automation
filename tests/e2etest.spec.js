const { test, expect } = require('@playwright/test');

// -- Page imports ----------------------------------------------
const LoginPage              = require('../pages/LoginPage');
const CreateProjectPage      = require('../pages/createprojectPage');
const CreateRolePage         = require('../pages/createrolePage');
const CreateWorkitemPage     = require('../pages/createworkitemPage');
const CreateprojectCostsPage = require('../pages/createprojectcostsPage');

// -- Data imports from testdata/ folder
const { projectData } = require('../testdata/projectData');
const { rolesData } = require('../testdata/roleData');
const { workItems } = require('../testdata/workitemData');
const { costsData } = require('../testdata/projectcostData');
const { getBaseUrl } = require('../env/baseenv');

// 5 minute timeout for long end-to-end flow.
test.setTimeout(300000);

test.describe('Pricing tool E2E', () => {
  test.beforeEach(async ({ page }) => {
    const baseUrl = getBaseUrl();
    await page.goto(baseUrl);
    await page.waitForLoadState('networkidle');

    const login = new LoginPage(page);
    await login.loginWithMicrosoft();

    await page.waitForTimeout(3000); // Wait for 3 seconds to ensure the page has fully loaded

    await expect(page).toHaveURL(/dashboard|projects/);
    console.log('Login successful, navigated to dashboard/projects');
  });

  test('create project, roles, work items and costs', async ({ page }) => {

    const createProject = new CreateProjectPage(page);
    await createProject.createProject(projectData);
    await expect(page).toHaveURL(/\/projects\//);


      //  await expect(page).toHaveURL(/\/dashboard\//);

    
    const createRole = new CreateRolePage(page);
    await createRole.createMultipleRoles(rolesData);

    const createWorkitem = new CreateWorkitemPage(page);
    await createWorkitem.createMultipleWorkItems(workItems);

    const createProjectCosts = new CreateprojectCostsPage(page);
    await createProjectCosts.multipleprojectcosts(costsData);

    // await expect(page.getByText(' Summary', { exact: false })).toBeVisible({ timeout: 15000 });
  });
});
