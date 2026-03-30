const { expect } = require('@playwright/test');
const { roleLocators } = require('../Locators/Rolesloc');

class CreateRolePage {

  constructor(page) {
    this.page = page;
    this.loc = roleLocators(page); // all locators loaded here
  }

  async navigateToProject() {
    const projectBtn = this.page.getByText('Test13 Auto', { exact: true });
    await projectBtn.waitFor({ timeout: 30000 });
    console.log('Project button visible');
    await projectBtn.click();
    console.log('Project button clicked');
    await this.page.waitForLoadState('networkidle');
  }
  

  async selectFromDropdownByIndex(index, valueText) {
    await this.loc.dropdown(index).waitFor();
    await this.loc.dropdown(index).click();
    await this.loc.dropdownOption(valueText).waitFor();
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

  async fillRoleForm(roleData) {

    await this.page.waitForLoadState('networkidle');
    await this.loc.rolesBtn.click();
    await this.loc.addRoleBtn.click();
    await this.page.waitForLoadState('networkidle');

    // Dropdowns
    await this.selectFromDropdownByIndex(0, roleData.roleType);
    console.log('Role selected:', roleData.roleType);

    await this.page.waitForTimeout(1000);
    await this.selectFromDropdownByIndex(1, roleData.tenure);
    console.log('Tenure selected:', roleData.tenure);

    await this.page.waitForTimeout(2000);
    await this.selectFromDropdownByIndex(2, roleData.country);
    await this.selectFromDropdownByIndex(3, roleData.employmentType);
    await this.selectFromDropdownByIndex(4, roleData.state);
    await this.selectFromDropdownByIndex(5, roleData.city);
    await this.selectFromDropdownByIndex(6, roleData.billRateType);
    console.log('All dropdowns selected');

    // Bill Rate Type radio
    await this.loc.billRateLabel(roleData.billRateType).check();

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

    // Cross Border checkbox — only if true
    if (roleData.crossBorder) {
      await this.checkBoxByLabel('Cross Border');
      console.log('Cross Border checked');
    }

    await this.page.waitForTimeout(1000);

    // Discount
    await this.loc.discountInput.fill(String(roleData.discount));
    console.log('Discount:', roleData.discount);

    // Save
    await this.loc.saveBtn.click();
    console.log('Role saved:', roleData.roleType);
    await this.page.waitForTimeout(2000);
  }

  async createMultipleRoles(rolesData) {
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