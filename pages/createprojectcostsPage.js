const { expect } = require('@playwright/test');

class CreateprojectCostsPage {

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
    //  Scoped inside listbox — avoids strict mode violation
    const option = this.page.locator(
      `//div[@role="listbox"]//div[@role="option" and normalize-space()="${valueText}"]`
    );
    await option.waitFor({ state: 'visible' });
    await option.click();
  }

 
  async fillProjectCostForm(costData, index = 1) {

   
    await this.page.getByRole('button', { name: '+ Add Cost Item', exact: true }).click();
    await this.page.waitForLoadState('networkidle');

    
    await this.page.locator(
      '//span[contains(text(),"Cost Description")]//following-sibling::div//input'
    ).fill(costData.description);
    console.log(`Cost description filled: ${costData.description}`);

    // Dropdown 0 — Cost Type
    await this.selectFromDropdownByIndex(0, costData.costType);
    console.log(`Cost type selected: ${costData.costType}`);

    await this.page.waitForTimeout(2000);

    // Dropdown 1 — Billing Type
    await this.selectFromDropdownByIndex(1, costData.billingType);

    // Dropdown 2 — Country
    await this.selectFromDropdownByIndex(2, costData.country);

    // Dropdown 3 — Cashflow Impact / Frequency
    await this.selectFromDropdownByIndex(3, costData.cashflowImpact);
    console.log(`All dropdowns selected`);

    // Quantity
    await this.page.locator(
      '//span[text()="Quantity"]//following-sibling::div//input'
    ).fill(String(costData.quantity));
    console.log(`Quantity filled: ${costData.quantity}`);

    // Frequency
    await this.page.locator(
      '//span[text()="Frequency"]//following-sibling::div//input'
    ).fill(String(costData.frequency));
    console.log(`Frequency filled: ${costData.frequency}`);

    // Unit Rate
    const unitRateInput = this.page.locator(
      '//span[text()="Contract Currency Unit Rate"]//following-sibling::div//input'
    );
    await unitRateInput.waitFor({ state: 'visible', timeout: 5000 });
    await unitRateInput.fill(String(costData.unitRate));
    console.log(`Unit rate filled: ${costData.unitRate}`);

    // Markup
    await this.page.locator(
      '//span[text()="Markup (%)"]//following-sibling::div//input'
    ).fill(String(costData.markup));
    console.log(`Markup filled: ${costData.markup}`);

    // Save
    await this.page.getByRole('button', { name: 'Save' }).click();
    console.log(`Cost item ${index} saved`);
    await this.page.waitForTimeout(3000);
  }

  
  async multipleprojectcosts(costsData) {
    console.log(`Creating ${costsData.length} cost items...`);

   // await this.navigateToProject();
    console.log(' project selected');

     await this.page.waitForLoadState('networkidle');
    await this.page.getByRole('button', { name: ' Project Costs' }).click();

    for (let i = 0; i < costsData.length; i++) {
      console.log(`\nCreating cost item ${i + 1} of ${costsData.length}: ${costsData[i].costType}`);
      await this.page.waitForLoadState('networkidle');
      await this.fillProjectCostForm(costsData[i], i + 1);
      console.log(`Cost item ${i + 1} done`);
    }

    console.log(`\nAll ${costsData.length} cost items created!`);
  }
}

module.exports = CreateprojectCostsPage;