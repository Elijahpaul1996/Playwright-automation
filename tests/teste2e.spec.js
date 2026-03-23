const { test } = require('@playwright/test');
const LoginPage              = require('../pages/LoginPage');
const CreateProjectPage      = require('../pages/createprojectPage');
const CreateRolePage         = require('../pages/createrolePage');
const CreateWorkitemPage     = require('../pages/createworkitemPage');
const CreateprojectCostsPage = require('../pages/createprojectcostsPage');

test('Create Project E2E', async ({ page }) => {
  test.setTimeout(300000); // 5 minutes

 
  
  await page.goto('https://pricingtool-ui.azurewebsites.net/dashboard');
  await page.waitForLoadState('networkidle');

  const login = new LoginPage(page);
  await login.loginWithMicrosoft();
   // Create Project
  /*const createProject = new CreateProjectPage(page);
  await createProject.createProject();


  //Roles
  const createRole = new CreateRolePage(page);

  const rolesData = [
    {
      roleType:       'Agile Coach',
      tenure:         'Over 5 years - up to 7 years',
      country:        'United States',
      employmentType: 'W2',
      state:          'Alabama',
      city:           'Columbus',
      billRateType:   'Standard',
      payRate:        80,
      fringeRate:     80,
      otPayFactor:    1.5,
      otBillFactor:   1.5,
      pto:            12,
      sickDays:       12,
      holidays:       15,
      crossBorder:    true,
      discount:       10,
    },
    {
      roleType:       'Cloud Engineer',
      tenure:         'Over 5 years - up to 7 years',
      country:        'United States',
      employmentType: 'W2',
      state:          'Alabama',
      city:           'Columbus',
      billRateType:   'Standard',
      payRate:        75,
      fringeRate:     75,
      otPayFactor:    1.5,
      otBillFactor:   1.5,
      pto:            10,
      sickDays:       10,
      holidays:       12,
      crossBorder:    false,  // ← won't check Cross Border
      discount:       5,
    },
    {
      roleType:       'AI/ML specialist',
      tenure:         'Over 5 years - up to 7 years',
      country:        'United States',
      employmentType: 'W2',
      state:          'Alabama',
      city:           'Columbus',
      billRateType:   'Standard',
      payRate:        100,
      fringeRate:     100,
      otPayFactor:    1.5,
      otBillFactor:   1.5,
      pto:            12,
      sickDays:       12,
      holidays:       15,
      crossBorder:    true,
      discount:       8,
    },
    {
      roleType:       'API Engineer/Designer',
      tenure:         'Over 5 years - up to 7 years',
      country:        'United States',
      employmentType: 'W2',
      state:          'Alabama',
      city:           'Columbus',
      billRateType:   'Standard',
      payRate:        90,
      fringeRate:     90,
      otPayFactor:    1.5,
      otBillFactor:   1.5,
      pto:            12,
      sickDays:       12,
      holidays:       15,
      crossBorder:    false,
      discount:       10,
    },
    {
      roleType:       'App Maintenance Manager',
      tenure:         'Over 5 years - up to 7 years',
      country:        'United States',
      employmentType: 'W2',
      state:          'Alabama',
      city:           'Columbus',
      billRateType:   'Standard',
      payRate:        85,
      fringeRate:     85,
      otPayFactor:    1.5,
      otBillFactor:   1.5,
      pto:            10,
      sickDays:       10,
      holidays:       12,
      crossBorder:    true,
      discount:       7,
    },
    {
      roleType:       'Application release manager',
      tenure:         'Over 5 years - up to 7 years',
      country:        'United States',
      employmentType: 'W2',
      state:          'Alabama',
      city:           'Columbus',
      billRateType:   'Standard',
      payRate:        95,
      fringeRate:     95,
      otPayFactor:    1.5,
      otBillFactor:   1.5,
      pto:            12,
      sickDays:       12,
      holidays:       15,
      crossBorder:    false,
      discount:       10,
    },
  ];

  
  await createRole.createMultipleRoles(rolesData);   

  
  const createWorkitem = new CreateWorkitemPage(page);

  const workItems = [
    {
      name:        'Workitem 1',
      description: 'This is description for workitem 1',
      role:        'App Support',
      col3Value:        3,
     col8Value:        2,
    },
    {
      name:        'Workitem 2',
      description: 'This is description for workitem 2',
      role:        'Cloud Engineer',
      col3Value:        5,
      col8Value:        4,
    },
  ];   

  
  await createWorkitem.createMultipleWorkItems(workItems); */


  

  //Create project costs
 const createProjectCosts = new CreateprojectCostsPage(page);


const costsData = [
  {
    costType:      'Morale',
    description:   'Morale Cost',
    billingType:   'Pass-Through',
    country:       'United States',
    cashflowImpact:'Monthly',
    quantity:      2,
    frequency:     2,
    unitRate:      25,
    markup:        2,
  },
  {
    costType:      'Equipment Expense',
    description:   'Equipment Cost',
    billingType:   'Pass-Through',
    country:       'United States',
    cashflowImpact:'Quarterly',
    quantity:      2,
    frequency:     2,
    unitRate:      25,
    markup:        2,
  }, 
  /*
  {
    costType:      'Travel',
    description:   'Travel Cost',
    billingType:   'Pass-Through',
    country:       'United States',
    cashflowImpact:'Yearly',
    quantity:      2,
    frequency:     2,
    unitRate:      25,
    markup:        2,
  },
  {
    costType:      'Software Expense',
    description:   'Software Cost',
    billingType:   'Pass-Through',
    country:       'United States',
    cashflowImpact:'End of Project',
    quantity:      2,
    frequency:     2,
    unitRate:      25,
    markup:        2,
  },*/
];


await createProjectCosts.multipleprojectcosts(costsData);

});