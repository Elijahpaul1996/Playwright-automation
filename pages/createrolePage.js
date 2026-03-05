const { expect } = require('@playwright/test');

class CreateRolePage {

  constructor(page) {
    this.page = page;
  }

  //  Reusable dropdown helper
  async selectFromDropdownByIndex(index, valueText) {
    const dropdown = this.page.locator('[role="combobox"]').nth(index);
    await dropdown.waitFor();
    await dropdown.click();
    await this.page.getByRole('option', { name: valueText }).waitFor();
    await this.page.getByRole('option', { name: valueText, exact: true }).click();
  }

  // Reusable decimal input helper
  async fillDecimalByLabel(labelText, value) {
    const input = this.page.locator(
      `//span[contains(normalize-space(),"${labelText}")]/parent::div//input[@inputmode="decimal"]`
    );
    await input.fill(String(value));
  }

  //  Reusable numeric input helper
  async fillNumericByLabel(labelText, value) {
    const input = this.page.locator(
      `//span[contains(normalize-space(),"${labelText}")]/parent::div//input[@inputmode="numeric"]`
    );
    await input.fill(String(value));
  }

  // Reusable role form filler (shared logic between createRole & createRole2)
  async fillRoleForm(roleType) {
    await this.page.waitForLoadState('networkidle');
    await this.page.getByRole('button', { name: 'Roles', exact: true }).click();
    await this.page.getByRole('button', { name: '+ Add Role', exact: true }).click();
    await this.page.waitForLoadState('networkidle');

    // Dropdowns
    await this.selectFromDropdownByIndex(0, roleType);
    console.log('Role selected:', roleType);

    await this.page.waitForTimeout(1000);
    await this.selectFromDropdownByIndex(1, 'Over 5 years - up to 7 years');
    console.log('Tenure selected');

    await this.page.waitForTimeout(2000);
    await this.selectFromDropdownByIndex(2, 'United States');
    await this.selectFromDropdownByIndex(3, 'W2');
    await this.selectFromDropdownByIndex(4, 'Alabama');
    await this.selectFromDropdownByIndex(5, 'Columbus');
    await this.selectFromDropdownByIndex(6, 'Standard');
    console.log('All dropdowns selected');

    await this.page.getByLabel('Standard').nth(1).check();

    // Headcount
    /*const headcount = this.page.locator(
      '//span[contains(normalize-space(), "Headcount")]/following::input[@inputmode="numeric"][1]'
    );
    await headcount.fill('5');*/

    await this.fillNumericByLabel('Headcount', 5);
    console.log('Headcount entered');
    

    // Contract Currency Pay Rate
    /*const contractCurrencyPay = this.page.locator(
      '//span[contains(normalize-space(), "Contract Currency Pay Rate/hr")]/following::input[@inputmode="decimal"][1]'
    );
    await contractCurrencyPay.fill('80');*/
    await this.fillDecimalByLabel('Contract Currency Pay Rate/hr', 80);
    console.log('Contract Currency Pay Rate entered');

    // Decimal fields
    await this.fillDecimalByLabel('Contract Currency Fringe Rate/hr', 80);
    console.log('Fringe rate entered');
    await this.fillDecimalByLabel('OT Pay Rate Factor', 1.5);
    await this.fillDecimalByLabel('OT Bill Rate Facto', 1.5);
    console.log('Decimal values entered');

    // Numeric fields
    await this.fillNumericByLabel('PTO Days/year(Default=10)', 12);
    await this.fillNumericByLabel('Sick Days/year(Default=0)', 12);
    await this.fillNumericByLabel('Holidays/year(Default=0)', 15);
    console.log('Numeric values entered');

    // Cross Border checkbox (XPath — no accessible label on span)
    const crossBorder = this.page.locator(
      '//span[normalize-space()="Cross Border"]/parent::div//input[@type="checkbox"]'
    );
    await crossBorder.waitFor({ state: 'visible' });
    await crossBorder.check();
    console.log('Cross Border checkbox checked');

    await this.page.waitForTimeout(1000);

    // Discount
    const discount = this.page.locator(
      '//span[contains(normalize-space(),"Discount")]/parent::div//input[@type="number"]'
    );
    await discount.fill('10');
    console.log('Discount entered');

    // Save
    await this.page.locator('button[title="Save"]').click();
    console.log('Role saved');
    await this.page.waitForTimeout(2000);
  }

  // Create Role 1 — Agile Coach
  async createRole() {
    console.log('Entered createRole — Agile Coach');

    const projectBtn = this.page.getByText('Test5 Auto', { exact: true });
    await projectBtn.waitFor({ timeout: 30000 });
    console.log('Project button visible');
    await projectBtn.click();
    console.log('Project button clicked');

    await this.fillRoleForm('Agile Coach');
  }

  // Create Role 2 — App Support
  async createRole2() {
    console.log('Entered createRole2 — App Support');
    await this.fillRoleForm('App Support');
  }
}

module.exports = CreateRolePage;