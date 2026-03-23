const { expect } = require('@playwright/test');

class CreateRolePage {

  constructor(page) {
    this.page = page;
  }


  /*async navigateToProject() {
    const projectBtn = this.page.getByText('Test7 Auto', { exact: true });
    await projectBtn.waitFor({ timeout: 30000 });
    console.log('Project button visible');
    await projectBtn.click();
    console.log('Project button clicked');
    await this.page.waitForLoadState('networkidle');
  }*/
  
  async selectFromDropdownByIndex(index, valueText) {
    const dropdown = this.page.locator('[role="combobox"]').nth(index);
    await dropdown.waitFor();
    await dropdown.click();
    await this.page.getByRole('option', { name: valueText }).waitFor();
    await this.page.getByRole('option', { name: valueText, exact: true }).click();
  }

 
  async fillDecimalByLabel(labelText, value) {
    const input = this.page.locator(
      `//span[contains(normalize-space(),"${labelText}")]/parent::div//input[@inputmode="decimal"]`
    );
    await input.fill(String(value));
  }

  // ─────────────────────────────────────────────────────────────
  // Reusable numeric input helper
  // ─────────────────────────────────────────────────────────────
  async fillNumericByLabel(labelText, value) {
    const input = this.page.locator(
      `//span[contains(normalize-space(),"${labelText}")]/parent::div//input[@inputmode="numeric"]`
    );
    await input.fill(String(value));
  }

  // ─────────────────────────────────────────────────────────────
  // Reusable checkbox helper — safe across multiple roles
  // ─────────────────────────────────────────────────────────────
  async checkBoxByLabel(labelText) {
    const checkbox = this.page.locator(
      `//span[normalize-space()="${labelText}"]/parent::div//input[@type="checkbox" and not(@disabled)]`
    );
    await checkbox.waitFor({ state: 'visible', timeout: 3000 });
    await checkbox.check();
  }

  // ─────────────────────────────────────────────────────────────
  // Fill ONE role form — ALL data passed as roleData object
  // ─────────────────────────────────────────────────────────────
  async fillRoleForm(roleData) {

    await this.page.waitForLoadState('networkidle');
    await this.page.getByRole('button', { name: 'Roles', exact: true }).click();
    await this.page.getByRole('button', { name: '+ Add Role', exact: true }).click();
    await this.page.waitForLoadState('networkidle');

    // Dropdowns — all values from roleData
    await this.selectFromDropdownByIndex(0, roleData.roleType);
    console.log(`Role selected: ${roleData.roleType}`);

    await this.page.waitForTimeout(1000);
    await this.selectFromDropdownByIndex(1, roleData.tenure);
    console.log(`Tenure selected: ${roleData.tenure}`);

    await this.page.waitForTimeout(2000);
    await this.selectFromDropdownByIndex(2, roleData.country);
    await this.selectFromDropdownByIndex(3, roleData.employmentType);
    await this.selectFromDropdownByIndex(4, roleData.state);
    await this.selectFromDropdownByIndex(5, roleData.city);
    await this.selectFromDropdownByIndex(6, roleData.billRateType);
    console.log('All dropdowns selected');

    await this.page.getByLabel(roleData.billRateType).nth(1).check();

    // Headcount (optional)
    /*if (roleData.headcount) {
      await this.fillNumericByLabel('Headcount', roleData.headcount);
      console.log(`Headcount: ${roleData.headcount}`);
    }*/

    // Decimal fields
    await this.fillDecimalByLabel('Contract Currency Pay Rate/hr', roleData.payRate);
    await this.fillDecimalByLabel('Contract Currency Fringe Rate/hr', roleData.fringeRate);
    await this.fillDecimalByLabel('OT Pay Rate Factor', roleData.otPayFactor);
    await this.fillDecimalByLabel('OT Bill Rate Facto', roleData.otBillFactor);
    console.log('Decimal values entered');

    // Numeric fields
    await this.fillNumericByLabel('PTO Days/year(Default=10)', roleData.pto);
    await this.fillNumericByLabel('Sick Days/year(Default=0)', roleData.sickDays);
    await this.fillNumericByLabel('Holidays/year(Default=0)', roleData.holidays);
    console.log('Numeric values entered');

    // Cross Border checkbox — only check if true in data
    if (roleData.crossBorder) {
      await this.checkBoxByLabel('Cross Border');
      console.log('Cross Border checked');
    }

    await this.page.waitForTimeout(1000);

    // Discount
    const discount = this.page.locator(
      '//span[contains(normalize-space(),"Discount")]/parent::div//input[@type="number"]'
    );
    await discount.fill(String(roleData.discount));
    console.log(`Discount: ${roleData.discount}`);

    // Save
    await this.page.locator('button[title="Save"]').click();
    console.log(`Role "${roleData.roleType}" saved`);
    await this.page.waitForTimeout(2000);
  }

  
  async createMultipleRoles(rolesData) {
    console.log(`Creating ${rolesData.length} roles...`);
    //await this.navigateToProject();
    //console.log(' project selected');

    for (let i = 0; i < rolesData.length; i++) {
      console.log(`\nCreating role ${i + 1} of ${rolesData.length}: ${rolesData[i].roleType}`);
      await this.fillRoleForm(rolesData[i]);
      console.log(`Role ${i + 1} done`);
    }

    console.log(`\nAll ${rolesData.length} roles created!`);
  }
}

module.exports = CreateRolePage;