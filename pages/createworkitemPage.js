const { expect } = require('@playwright/test');
const { workitemLocators } = require('../Locators/workitemloc');

class CreateWorkitemPage {

  constructor(page) {
    this.page = page;
    this.loc = workitemLocators(page); // all locators loaded here
  }

  async fillWorkItemForm(name, description, rowName, col3Value, col8Value) {

    await this.loc.addWorkItemBtn.click();
    console.log('Add Work Item clicked');

    // Wait for form
    await expect(this.loc.workItemNameInput).toBeVisible();

    // Fill name
    await this.loc.workItemNameInput.fill(name);
    console.log('Work item name filled:', name);

    // Fill description
    await this.loc.descriptionInput.waitFor({ state: 'visible' });
    await this.loc.descriptionInput.fill(description);
    console.log('Description filled');

    await this.page.waitForLoadState('networkidle');

    // Checkbox in role row
    await this.loc.rowCheckbox(rowName).check();
    console.log('Checkbox checked for:', rowName);

    await this.page.waitForTimeout(1000);

    // Fill col inputs
    await this.loc.rowInput(rowName, 2).fill(String(col3Value));
    await this.loc.rowInput(rowName, 7).fill(String(col8Value));
    console.log('All fields filled');

    await this.page.waitForTimeout(2000);
    await this.loc.saveBtn.click();
    console.log('Work item saved:', name);
    await this.page.waitForTimeout(3000);
  }

  async createMultipleWorkItems(workItems) {
    console.log('Entered Work Items Page');

    // Navigate once
   

    await this.loc.workItemsBtn.click();
    console.log('Work Items section opened');

    // Loop through work items
    for (let i = 0; i < workItems.length; i++) {
      const item = workItems[i];
      console.log('Creating work item', i + 1, 'of', workItems.length);

      await this.fillWorkItemForm(
        item.name,
        item.description || `This is description ${i + 1}`,
        item.role,
        item.col3Value,
        item.col8Value
      );

      console.log('Work item', i + 1, 'done');
    }

    console.log('All', workItems.length, 'work items created!');
  }
}

module.exports = CreateWorkitemPage;