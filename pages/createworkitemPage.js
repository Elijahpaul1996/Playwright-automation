
const { expect } = require('@playwright/test');

class createWorkitemPage {
  
constructor(page) {
  this.page = page;
}



async fillWorkItemForm(name, description, rowName, col3Value, col8Value) {

  await this.page.getByRole('button', { name: '+ Add Work Item', exact: true }).click();
  console.log('Add Work Item clicked');

  // Wait for form
  //await expect(this.page.locator('[name="WorkItemName"]')).toBeVisible();
      await expect(this.page.locator('[name="workItemName"]')).toBeVisible();

  // Fill name and description
  await this.page.locator('[name="workItemName"]').fill(name);
  console.log(`Work item name filled: ${name}`);

  const desc = this.page.locator('textarea').first();
  await desc.waitFor({ state: 'visible' });
  await desc.fill(description);
  console.log('Description filled');

  await this.page.waitForLoadState('networkidle');

 const activeRow = this.page.locator('tr', { hasText: rowName }).last();

  await activeRow.locator('input[type="checkbox"]').check();
  console.log(`Checkbox checked for: ${rowName}`);
  await this.page.waitForTimeout(1000);

  await activeRow.locator('td').nth(2).locator('input').fill(String(col3Value));
  await activeRow.locator('td').nth(7).locator('input').fill(String(col8Value));
  console.log('All fields filled');

  console.log('All fields filled');

  await this.page.waitForTimeout(2000);
  await this.page.locator('button[title="Save"]').click();
  console.log(` Work item "${name}" saved`);
  await this.page.waitForTimeout(3000);
}

async createMultipleWorkItems(workItems) {    //Main method
  console.log('Entered Work Items Page');

  // Navigate once - if we are calling or executing directly from wk page 
  /*const projectBtn = this.page.getByText('Test7 Auto', { exact: true });
  await projectBtn.waitFor({ timeout: 30000 });
  await projectBtn.click();
  await this.page.waitForLoadState('networkidle');*/

  await this.page.getByRole('button', { name: 'Work Items', exact: true }).click();
  console.log('Work Items section opened');

  // Loop — create work items
for (let i = 0; i < workItems.length; i++) {
    const item = workItems[i];                    // get each object
    console.log(`Creating work item ${i + 1} of ${workItems.length}`);

    await this.fillWorkItemForm(
      item.name,                                  
      `This is description ${i + 1}`,          
      item.role,                                  
      item.col3Value,                              
      item.col8Value                                 
    );
    console.log(` Work item ${i + 1} done`);

  console.log(` All ${workItems.length} work items created!`);
}
}

}

module.exports = createWorkitemPage;