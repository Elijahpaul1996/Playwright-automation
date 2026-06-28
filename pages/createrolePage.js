const { expect } = require('@playwright/test');
const { roleLocators } = require('../Locators/Rolesloc');
const inputData = require('../testdata/inputDataSnapshot.json');

class CreateRolePage {

  constructor(page) {
    this.page = page;
    this.loc = roleLocators(page); // all locators loaded here
  }

  async navigateToProject() {
    const projectBtn = this.page.getByText('test 5');
    await projectBtn.waitFor({ timeout: 30000 });
    console.log('Project button visible');
    await projectBtn.click();
    console.log('Project button clicked');
    await this.page.waitForLoadState('networkidle');
  }
  

  async selectFromDropdownByIndex(index, valueText) {
    valueText = String(valueText).trim();
    await this.loc.dropdown(index).waitFor();
    await this.loc.dropdown(index).click();
    await this.loc.dropdownOptionExact(valueText,{exact: true}).waitFor();
    await this.loc.dropdownOptionExact(valueText).click();
  }

  async fillDecimalByLabel(labelText, value) {
    await this.loc.decimalInput(labelText).fill(String(value));
  }

  async fillNumericByLabel(labelText, value) {
    await this.loc.numericInput(labelText).fill(String(value));
  }

  async checkBoxByLabel(labelText) {
    await this.loc.checkbox(labelText).waitFor({ state: 'visible', timeout: 3000 });
    await this.loc.checkbox(labelText).check();
  }
async safeAction(stepName, action) {   // to identify the step and take screenshot on failure
  try {
    await action();
    console.log(`✅ ${stepName}`);
  } catch (error) {
    console.warn(`⚠️ FAILED: ${stepName} | ${error.message}`);
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    await this.page.screenshot({
      path: `test-results/failed-${stepName.replace(/\s+/g, '-')}-${timestamp}.png`,
      fullPage: false,
    });
  }
}


  async fillRoleForm(roleData) {
await this.page.waitForLoadState('networkidle');
    await this.loc.rolesBtn.click();

await this.safeAction('click add role button', async () => {
  await this.loc.addRoleBtn.click();
      await this.page.waitForLoadState('networkidle');
});


   

// await this.page.getByLabel('Custom').check();
// await this.page.getByLabel
``

    //select Custom raido button as custom role ( standard role will have default values and custom role will allow to enter values)
    // if (roleData.customradio) {
    //   await this.loc.Customcheckbox.click();
    //   console.log('Custom radio checked');
    //   await this.page.waitForTimeout(1000);
    // }
    // Dropdowns
    await this.safeAction(`select role type ${roleData.roleType}`, async () => {
  await this.selectFromDropdownByIndex(0, roleData.roleType);
});

    await this.page.waitForTimeout(1000);


      await this.safeAction(`select tenure: ${roleData.tenure}`, async () => {
    await this.selectFromDropdownByIndex(1, roleData.tenure);
  });

     await this.page
  .locator("//span[contains(.,'Standard')]/preceding-sibling::input[@type='radio' and not(@disabled)]")
  .check(); 
  console.log('Standard radio button checked');




    await this.page.waitForTimeout(2000);
      await this.safeAction(`select country: ${roleData.country}`, async () => {
    await this.selectFromDropdownByIndex(2, roleData.country);
  });
    await this.selectFromDropdownByIndex(3, roleData.employmentType);
    console.log('Country and Employment Type selected:', roleData.country, roleData.employmentType);  

    await this.selectFromDropdownByIndex(4, roleData.state);
    console.log('State selected:', roleData.state);
    await this.page.waitForTimeout(2000);
    await this.selectFromDropdownByIndex(5, roleData.metro);
    await this.selectFromDropdownByIndex(6, roleData.workersCompRisk);
    console.log('All dropdowns selected');
    

    // Bill Rate Type radio
    //  await this.loc.billRateLabel(roleData.workerscomprisk).check();
    //  console.log('skillset selected:', roleData.workerscomprisk);
    // try {
    // await this.loc.billRateLabel(roleData.workerscomprisk).check({
    //     timeout: 2000
    // });
    // console.log('Checked successfully');
// } catch {
//     console.log('Field not found, moving to next step');


// }
    // Decimal fields
    await this.fillDecimalByLabel('Contract Currency Pay Rate/hr', roleData.payRate);
    await this.fillDecimalByLabel('Contract Currency Fringe Rate/hr', roleData.fringeRate);
    await this.fillDecimalByLabel('OT Pay Rate Factor', roleData.otPayFactor);
    await this.fillDecimalByLabel('OT Bill Rate Facto', roleData.otBillFactor);
    console.log('Decimal values entered');

    // Numeric fields
    //await this.fillNumericByLabel('Benchmark Rate', roleData.BenchmarkRate);
    await this.fillNumericByLabel('PTO Days/year', roleData.pto);
    await this.fillNumericByLabel('Sick Days/year', roleData.sickDays);
    await this.fillNumericByLabel('Holidays/year', roleData.holidays);
    console.log('Numeric values entered');




    // Cross Border checkbox — only if true
    if (roleData.crossBorder) {
      await this.checkBoxByLabel('Cross Border');
      console.log('Cross Border checked');
    }
       // 
    await this.page.waitForTimeout(1000);

    // Discount
    await this.loc.discountInput.fill(String(roleData.discount));
    console.log('Discount:', roleData.discount);

// standard radio button for skillset
    // await this.page.locator("//span[contains(.,'Standard')]/preceding-sibling::input[@type='radio']").check();
    // console.log('skillset selected');
   

    // Save
    await this.loc.saveBtn.click();
    console.log('Role saved:', roleData.roleType);
    await this.page.waitForTimeout(2000);
  }

  // async createMultipleRoles(rolesData) {
  //   console.log('Creating', rolesData.length, 'roles...');
  //     // await this.navigateToProject();

  //   for (let i = 0; i < rolesData.length; i++) {
  //     console.log('Creating role', i + 1, 'of', rolesData.length, ':', rolesData[i].roleType);
  //     await this.fillRoleForm(rolesData[i]);
  //     console.log('Role', i + 1, 'done');
  //   }

  //   console.log('All', rolesData.length, 'roles created!');
  // }
  async createMultipleRoles() {
  const rolesData = inputData.roles;
  console.log('Creating', rolesData.length, 'roles...');
  await this.navigateToProject();

  for (let i = 0; i < rolesData.length; i++) {
    console.log('Creating role', i + 1, 'of', rolesData.length, ':', rolesData[i].roleType);
    await this.fillRoleForm(rolesData[i]);
    console.log('Role', i + 1, 'done');
  }

  console.log('All', rolesData.length, 'roles created!');
}
}

module.exports = CreateRolePage;