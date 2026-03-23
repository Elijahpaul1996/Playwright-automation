

const { test } = require('@playwright/test');
const LoginPage         = require('../pages/LoginPage');
const CreateProjectPage = require('../pages/createprojectPage');
const CreateRolePage = require('../pages/createrolePage');
const CreateWorkitemPage = require('../pages/createworkitemPage');
const CreateprojectCostsPage = require('../pages/createprojectcostsPage');


test('Create Project directly', async ({ page }) => {
  test.setTimeout(120000); // 2 minutes

  await page.goto('https://pricingtool-ui.azurewebsites.net/dashboard');
  await page.waitForLoadState('networkidle');


   const login = new LoginPage(page);
  await login.loginWithMicrosoft(); 
   
  //await page.getByRole("button", {name: 'Sign in with Microsoft'}).click();
  //await page.waitForTimeout(2000);
  //await page.getByRole("button", {name: 'Elijah Paul'}).click();

  //await page.getByRole('button', { name: 'Create Project' }).click();

  /*const createProject = new CreateProjectPage(page);
  await createProject.createProject();

  const createRole = new CreateRolePage(page); // Roles page object

  const roleTypes = [
    'Agile Coach',
    'App Support',
    'AI/ML specialist',
    'API Engineer/Designer',
    'App Maintenance Manager',
    'Application release manager',
    
  ];
  await createRole.createMultipleRoles(6, roleTypes); 






const createWorkitem = new CreateWorkitemPage(page);  // workitem page object

const workItems = [
  { name: 'Workitem 1', role: 'App Support',                    Headcount: 3, OT hrs/week: 2 },
  { name: 'Workitem 2', role: 'Application release manager',    Headcount: 5, OT hrs/week: 4 },
];
  
 

await createWorkitem.createMultipleWorkItems(workItems);

const createProjectCosts= new CreateprojectCostsPage(page); // create project costs page object

const costs= [ 'Morale', 'Equipment Expense','Travel','Software Expense'];
const CashflowImpact= [ 'Monthly', 'Quarterly','Yearly','End of Project'];

await createProjectCosts.multipleprojectcosts(4, costs, CashflowImpact);

*/

});
