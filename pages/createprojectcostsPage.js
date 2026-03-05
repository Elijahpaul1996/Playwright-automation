const { expect } = require('@playwright/test');
const { title } = require('node:process');

class CreateprojectCostsPage {

constructor(page) {
    this.page = page;
  }

  async selectFromDropdownByIndex(index, valueText) {

  const dropdown = this.page.locator('[role="combobox"]').nth(index);

  await dropdown.waitFor();
  await dropdown.click();

  await this.page.getByRole('option', { name: valueText }).waitFor();

  await this.page.getByRole('option', {
    name: valueText,
    exact: true
  }).click();
  }
async createprojectcosts(){

console.log(' CreateRolePage');

    /*console.log('Entered CreateRolePage');

    const projectBtn = this.page.getByText('Test3 Auto', { exact: true });

    await projectBtn.waitFor({ timeout: 30000 });
    console.log('Project button visible');

    await projectBtn.click();
    console.log('Project button clicked');

    await this.page.waitForLoadState('networkidle');

    await this.page.getByRole('button', { name: 'Project Costs', exact: true }).click();
    await this.page.getByRole('button', { name: '+ Add Role', exact: true }).click();

    await this.page.waitForLoadState('networkidle');
    

    //await this.page.waitForURL('https://pricingtool-ui.azurewebsites.net/projects/484');
    //await this.page.waitForLoadState('networkidle');

    console.log('Entered Dashboard');

    const projectBtn = this.page.getByText('Test3 Auto', { exact: true });

    await projectBtn.waitFor({ timeout: 30000 });
    console.log('Project button visible');

    await projectBtn.click();
    console.log('Project button clicked');*/
    await this.page.waitForLoadState('networkidle');

    
    await this.page.getByRole('button', { name: '$ Project Costs', exact: true }).click();
    await this.page.getByRole('button', {name:'+ Add Cost Item', exact: true}).click();
    await this.page.waitForLoadState('networkidle');

    
   
    //await this.page.waitForTimeout(3000);

    //await this.page.locator('//span[normalize-space()="Cost Description"]/parent::div/following-sibling::div//input').fill('Morale');
    //await this.page.getByText('Cost Description', exact:true).

    //await this.page.getByLable('Cost Description', {exact: true}).fill('Morale');
    //const costInput = this.page.locator(
  //'//span[normalize-space()="Cost Description"]/following::input[1]');
 // await costInput.fill('Morale');

    //await this.page.locator('[name="CostDescription"]').fill('Morale');
    //await this.fillInputBySpanLabel('Cost Description', 'morale');
    /*const costInput = this.page.locator(
  '//span[normalize-space()="CostDescription"]/parent::div/following-sibling::div//input'
);

await costInput.waitFor({ state: 'visible' });
await costInput.fill('Morale');
    
await this.page.pause();
await this.page
  .locator('div.flex-col', { hasText: 'Cost Description' })
  .locator('input')
  .fill('Morale');
    console.log('Morale entered');*/
   
//const costInput = this.page.locator(
  //'//span[contains(text(),"Description")]/ancestor::div//input[@type="text" and not(@role="combobox")]'
//);
//await costInput.fill('Morale');

await this.page.locator('//span[contains(text(),"Cost Description")]//following-sibling::div//input').fill('facility cost');


   
  console.log('des');
  await this.page.waitForTimeout(2000);
  await this.selectFromDropdownByIndex(0, 'FX Costs');
    await this.selectFromDropdownByIndex(1, 'Pass-Through');
      await this.selectFromDropdownByIndex(2, 'United States');


       await this.selectFromDropdownByIndex(3, 'Monthly');

  console.log('all dropdowns selected');


await this.page.locator('//span[text()="Quantity"]//following-sibling::div//input').fill('2');



 

await this.page.waitForTimeout(3000);

await this.page.locator(
  '//span[text()="Frequency"]//following-sibling::div//input').fill('2');

  await this.page.waitForTimeout(3000);

await this.page.locator('//span[text()="Contract Currency Unit Rate"]//following-sibling::div//input').fill('25');
await this.page.locator('//span[text()="Markup (%)"]//following-sibling::div//input').fill('2');
console.log('input selected');

await this.page.getByRole('button', {name:'Save'}).click();
console.log('save clicked');
//await this.page.locator('button[title="Save"]').click();
await this.page.waitForTimeout(3000);

}



}
module.exports = CreateprojectCostsPage;

