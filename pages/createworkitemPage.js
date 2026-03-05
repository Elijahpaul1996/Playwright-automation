const { expect } = require('@playwright/test');
const { title } = require('node:process');

 class CreateWorkitemPage {

constructor(page){
this.page=page
}

async createworkitem() {

console.log('Workitem Page');
/*console.log('Entered Dashboard');

    const projectBtn = this.page.getByText('Test3 Auto', { exact: true });

    await projectBtn.waitFor({ timeout: 30000 });
    console.log('Project button visible');

    await projectBtn.click();
    console.log('Project button clicked');*/
    await this.page.waitForLoadState('networkidle');

    await this.page.getByRole('button', {name: 'Work Items' , exact: true}).click();
    await this.page.getByRole('button', { name: '+ Add Work Item', exact: true }).click();
    console.log('add Workitem page');


    await this.page.waitForTimeout(3000);
    await expect(this.page.locator('[name="workItemName"]')).toBeVisible();

// Fill fields
await this.page.locator('[name="workItemName"]').fill('Workitem 1');
console.log('name filled');
const description = this.page.locator('textarea').first();
await description.waitFor({ state: 'visible' });
await description.fill('This is description');
console.log('description filled');
    //await this.page.locator('[name="workItemName"]').fill('Workitem 1');
    //await this.page.getByText('Description', { exact: true }).waitFor();
    //await this.page.locator('textarea').fill('This is description');
    //await this.page.locator(
 // '//label[normalize-space()="Description"]/following-sibling::textarea').fill('This is description');
    //await this.page.locator('[name="Description"]').fill('workitem 1 description');
    //await this.page.locator('textarea').fill('This is description');
    //const workitemname= await this.page.getByLabel('Work Item Name', { exact: true}).fill('Workitem 1');
    //const workitemname= await this.page.locator('//span[normalize-space()="Work Item Name]/ancestor::div[contains(@class,"flex-col")]//input');
    
    await this.page.waitForLoadState('networkidle');

await this.page.locator('tr', {hasText: 'Agile Coach'}).locator('input[type="checkbox"]').check(); 
console.log('checked'); // if there are multiple checkbox then we can mention the number
//await this.page.locator('input[type="number"]').nth(0).fill('3');
await this.page
  .locator('tr', { hasText: 'Agile Coach' })
  .locator('td')
  .nth(3)
  .locator('input').fill('3');
  await this.page
  .locator('tr', { hasText: 'Agile Coach' })
  .locator('td')
  .nth(8)
  .locator('input').fill('2');
  console.log("all options selected");
   await this.page.waitForTimeout(2000);
  await this.page.locator('button[title="Save"]').click();
  
    await this.page.waitForTimeout(3000);






}
}
module.exports = CreateWorkitemPage;