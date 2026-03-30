const { expect } = require('@playwright/test');
const projectLocators  = require('../Locators/Createprojectloc');

class CreateProjectPage {

  constructor(page) {
    this.page = page;
    this.loc = projectLocators(page); // all locators loaded here
  }

  async createProject(projectData) {

    console.log('Create project page');

    await this.loc.createProjectBtn.waitFor();
    await this.loc.createProjectBtn.click();

    // Client
    await this.loc.clientDropdown.click();
    await this.loc.dropdownOption(projectData.client, true).click();

    // Opportunity
    await this.loc.opportunityDropdown.click();
    await this.loc.dropdownOption(projectData.opportunity).click();

    // Text fields
    await this.loc.projectNameInput.fill(projectData.projectName);
    await this.loc.projectDescriptionInput.fill(projectData.projectDescription);

    await this.page.waitForTimeout(3000);

    // Start Date
    await this.loc.datePicker(0).click();
    await this.page.keyboard.press('Control+A');
    await this.page.keyboard.type(projectData.startDate);
    await this.page.keyboard.press('Tab');

    // End Date
    await this.loc.datePicker(1).dblclick();
    await this.page.keyboard.press('Control+A');
    await this.page.keyboard.type(projectData.endDate);
    await this.page.waitForTimeout(3000);

    // Practice
    await this.loc.practiceDropdown.click();
    await this.loc.dropdownOption(projectData.practice).click();

    // Service
    await this.loc.serviceDropdown.click();
    await this.loc.dropdownOption(projectData.service).click();

    // Billing Type
    await this.loc.billingTypeDropdown.click();
    await this.loc.reactSelectMenu.waitFor();
    await this.loc.dropdownOption(projectData.billingType, true).click();

    // Billing Cycle
    await this.loc.billingCycleDropdown.click();
    await this.loc.dropdownOption(projectData.billingCycle).click();

    // Payment Terms
    await this.loc.paymentTermsDropdown.click();
    await this.loc.reactSelectMenu.waitFor();
    await this.loc.dropdownOption(projectData.paymentTerms, true).click();

    // Numeric fields
    await this.loc.volumeRebateInput.fill(String(projectData.volumeRebate));
    await this.loc.vmsFeeInput.fill(String(projectData.vmsFee));

    // Submit
    await this.loc.createBtn.click();
    console.log('Project created:', projectData.projectName);

    await this.page.waitForURL(/\/projects\//);
    await this.page.waitForTimeout(3000);
  }
}

module.exports = CreateProjectPage;