class CreateProjectPage {

  constructor(page) {
    this.page = page;
  }

  async createProject() {

    // Wait for modal
    await this.page.getByRole('button', { name: 'Create Project' }).waitFor();

    // Client
    await this.page.getByLabel('Client').click();
    await this.page.getByRole('option', { name: 'Insight Global', exact: true }).click();

    // Opportunity
    await this.page.getByLabel('Dynamics Opportunity').click();
    await this.page.getByRole('option', { name: 'IG consultant Support Solution' }).click();

    // Text fields
    await this.page.getByLabel('Project Name').fill('Test5 Auto');
    await this.page.getByLabel('Project Description').fill('Created for test');

         await this.page.waitForTimeout(3000);
         
const datePickers = this.page.locator('[role="group"]');

// Start Date
await datePickers.nth(0).click();
await this.page.keyboard.press('Control+A');
await this.page.keyboard.type('06012026');
await this.page.keyboard.press('Tab');

// End Date
await datePickers.nth(1).dblclick();   // ← key change
await this.page.keyboard.press('Control+A');
await this.page.keyboard.type('06012027');
await this.page.waitForTimeout(3000);


    // Practice
    await this.page.getByLabel('Practice').click();
    await this.page.getByRole('option', { name: 'Data and Apps' }).click();

    // Service
    await this.page.getByLabel('Service').click();
    await this.page.getByRole('option', { name: 'Data transformation' }).click();

    // Billing Type
    await this.page.getByLabel('Billing Type').click();
    await this.page.locator('.react-select__menu').waitFor();
    await this.page.getByRole('option', { name: 'T&M', exact: true }).click();

    // Billing Cycle
    await this.page.getByLabel('Billing Cycle').click();
    await this.page.getByRole('option', { name: 'Monthly' }).click();

    // Currency
    await this.page.getByLabel('Contract Currency').click();
    await this.page.getByRole('option', { name: 'United States Dollar - USD ($)' }).click();

    // Payment Terms
    await this.page.getByLabel('Payment Terms').click();
    await this.page.locator('.react-select__menu').waitFor();
    await this.page.getByRole('option', { name: 'Net 60', exact: true }).click();

    // Numeric fields
    await this.page.getByLabel('Volume Rebate %').fill('5');
    await this.page.getByLabel('VMS Fee %').fill('5');

    // Submit
    await this.page.getByRole('button', { name: 'Create', exact: true }).click();
    // Click Create

await this.page.waitForURL(/\/projects\//);

// ✅ Optional small wait after page appears
await this.page.waitForTimeout(3000);

  }
}

module.exports = CreateProjectPage;