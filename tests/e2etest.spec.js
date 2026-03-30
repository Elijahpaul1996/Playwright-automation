

const { test } = require('@playwright/test');

// ── Page imports ──────────────────────────────────────────────
const LoginPage              = require('../pages/LoginPage');
const CreateProjectPage      = require('../pages/createprojectPage');
const CreateRolePage         = require('../pages/createrolePage');
const CreateWorkitemPage     = require('../pages/createworkitemPage');
const CreateprojectCostsPage = require('../pages/createprojectcostsPage');

// ── Data imports from testdata/ folder
const { projectData } = require('../testdata/projectData');
const { rolesData } = require('../testdata/roleData');
const { workItems } = require('../testdata/workitemData');
const { costsData } = require('../testdata/projectcostData');

test('Create Project E2E', async ({ page }) => {
  test.setTimeout(300000); // 5 minutes

  //1. Login
  //await page.goto('https://pricingtool-ui.azurewebsites.net/dashboard');  // dev URL
  await page.goto('https://qa-ui-pricing-tool.azurewebsites.net/'); // QA URL
  await page.waitForLoadState('networkidle');

  const login = new LoginPage(page);
  await login.loginWithMicrosoft();

  // //2. Create Project
  // const createProject = new CreateProjectPage(page);
  // await createProject.createProject(projectData);

  

  //3. Create Roles 
  const createRole = new CreateRolePage(page);
  await createRole.createMultipleRoles(rolesData);



  //4. Create Work Items 
  const createWorkitem = new CreateWorkitemPage(page);
  await createWorkitem.createMultipleWorkItems(workItems);
 
  //5. Create Project Costs 
  const createProjectCosts = new CreateprojectCostsPage(page);
  await createProjectCosts.multipleprojectcosts(costsData); 
  

});