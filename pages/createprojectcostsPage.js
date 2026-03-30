const { expect } = require('@playwright/test');
//const { projectCostsLocators } = require('../Locators/projectcostloc');
const projectCostsLocators = require('../Locators/projectcostloc');


class CreateprojectCostsPage {

  constructor(page) {
    this.page = page;
    this.loc = projectCostsLocators(page); // all locators loaded here
  }

  // // async navigateToProject() {
  // //   const projectBtn = this.page.getByText('Test7 Auto', { exact: true });
  // //   await projectBtn.waitFor({ timeout: 30000 });
  // //   console.log('Project button visible');
  // //   await projectBtn.click();
  // //   console.log('Project button clicked');
  // //   await this.page.waitForLoadState('networkidle');
    
  // }
  async selectFromDropdownByIndex(index, valueText) {
    await this.loc.dropdown(index).waitFor();
    await this.loc.dropdown(index).click();
    await this.loc.dropdownOption(valueText).waitFor({ state: 'visible' });
    await this.loc.dropdownOption(valueText).click();
  }

  async fillProjectCostForm(costData) {

    await this.loc.addCostItemBtn.click();
    await this.page.waitForLoadState('networkidle');

    await this.loc.costDescription.fill(costData.description);
    console.log('Cost description filled:', costData.description);

    await this.selectFromDropdownByIndex(0, costData.costType);
    console.log('Cost type selected:', costData.costType);

    await this.page.waitForTimeout(2000);

    await this.selectFromDropdownByIndex(1, costData.billingType);
    await this.selectFromDropdownByIndex(2, costData.country);
    await this.selectFromDropdownByIndex(3, costData.cashflowImpact);
    console.log('All dropdowns selected');

    await this.loc.quantity.fill(String(costData.quantity));
    console.log('Quantity filled:', costData.quantity);

    await this.loc.frequency.fill(String(costData.frequency));
    console.log('Frequency filled:', costData.frequency);

    await this.loc.unitRate.waitFor({ state: 'visible', timeout: 5000 });
    await this.loc.unitRate.fill(String(costData.unitRate));
    console.log('Unit rate filled:', costData.unitRate);

    await this.loc.markup.fill(String(costData.markup));
    console.log('Markup filled:', costData.markup);

    await this.loc.saveBtn.click();
    console.log('Cost item saved:', costData.costType);
    await this.page.waitForTimeout(3000);
  }

  async multipleprojectcosts(costsData) {
    console.log('Creating', costsData.length, 'cost items...');
    // await this.navigateToProject();
    // console.log(' project selected');

    await this.page.waitForLoadState('networkidle');
    await this.loc.projectCostsBtn.click();

    for (let i = 0; i < costsData.length; i++) {
      console.log('Creating cost item', i + 1, 'of', costsData.length, ':', costsData[i].costType);
      await this.page.waitForLoadState('networkidle');
      await this.fillProjectCostForm(costsData[i]);
      console.log('Cost item', i + 1, 'done');
    }

    console.log('All', costsData.length, 'cost items created!');
  }
}

module.exports = CreateprojectCostsPage;