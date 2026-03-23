const { expect } = require('@playwright/test');

class CreateProjectPage {

  constructor(page) {
    this.page = page;
  }

  async createProject(projectData) {

    console.log('Create project page');

    await this.page.getByRole('button', { name: 'Create Project' }).waitFor();
    await this.page.getByRole('button', { name: 'Create Project' }).click();

    // Client
    await this.page.getByLabel('Client').click();
    await this.page.getByRole('option', { name: projectData.client, exact: true }).click();

    // Opportunity
    await this.page.getByLabel('Dynamics Opportunity').click();
    await this.page.getByRole('option', { name: projectData.opportunity }).click();

    // Text fields
    await this.page.getByLabel('Project Name').fill(projectData.projectName);
    await this.page.getByLabel('Project Description').fill(projectData.projectDescription);

    await this.page.waitForTimeout(3000);

    // Start Date
    const datePickers = this.page.locator('[role="group"]');
    await datePickers.nth(0).click();
    await this.page.keyboard.press('Control+A');
    await this.page.keyboard.type(projectData.startDate);
    await this.page.keyboard.press('Tab');

    // End Date
    await datePickers.nth(1).dblclick();
    await this.page.keyboard.press('Control+A');
    await this.page.keyboard.type(projectData.endDate);
    await this.page.waitForTimeout(3000);

    // Practice
    await this.page.getByLabel('Practice').click();
    await this.page.getByRole('option', { name: projectData.practice }).click();

    // Service
    await this.page.getByLabel('Service').click();
    await this.page.getByRole('option', { name: projectData.service }).click();

    // Billing Type
    await this.page.getByLabel('Billing Type').click();
    await this.page.locator('.react-select__menu').waitFor();
    await this.page.getByRole('option', { name: projectData.billingType, exact: true }).click();

    // Billing Cycle
    await this.page.getByLabel('Billing Cycle').click();
    await this.page.getByRole('option', { name: projectData.billingCycle }).click();

    // Payment Terms
    await this.page.getByLabel('Payment Terms').click();
    await this.page.locator('.react-select__menu').waitFor();
    await this.page.getByRole('option', { name: projectData.paymentTerms, exact: true }).click();

    // Numeric fields
    await this.page.getByLabel('Volume Rebate %').fill(String(projectData.volumeRebate));
    await this.page.getByLabel('VMS Fee %').fill(String(projectData.vmsFee));

    // Submit
    await this.page.getByRole('button', { name: 'Create', exact: true }).click();
    console.log('Project created:', projectData.projectName);

    await this.page.waitForURL(/\/projects\//);
    await this.page.waitForTimeout(3000);
  }
}

module.exports = CreateProjectPage;