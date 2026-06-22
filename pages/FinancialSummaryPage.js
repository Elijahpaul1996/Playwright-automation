const fs = require('fs');
const path = require('path');
const { expect } = require('@playwright/test');
const ExcelDataPage = require('./ExceldataPage');
// const projectLocators = require('../Locators/FinancialSummaryloc');
const {
  FINANCIAL_FIELDS,
  financialSummaryLocators
} = require('../Locators/FinancialSummaryloc');

const monthlyPAndLLocators = require('../Locators/FinancialSummaryloc');

class FinancialSummaryPage {
  constructor(page) {
    this.page = page;
    this.projectLoc = financialSummaryLocators(page);
    //this.fields = ExcelDataPage.getFinancialSummaryFieldDefinitions();
    this.fields = FINANCIAL_FIELDS;
      console.log('FIELDS =');
  console.log(this.fields);

  }

  

  async navigateToProject() {
    const projectBtn = this.page.getByText('Test Project01');
    await projectBtn.waitFor({ timeout: 30000 });
    console.log('Project button visible');
    await projectBtn.click();
    console.log('Project button clicked');
    await this.page.waitForLoadState('networkidle');
  }



  async openFinancialSummary() {
    const financialSummaryButton = this.page.locator(
      "//*[normalize-space()='Financial Summary'][1]/preceding-sibling::button"
    );

    await expect(financialSummaryButton).toBeVisible({ timeout: 30000 });
    await financialSummaryButton.click();
    console.log('Financial Summary button clicked');
    await this.page.waitForTimeout(5000);
  }

  async readFinancialSummaryValues() {
    const values = [];

    for (const field of this.fields) {
      const value = await this.readFieldValue(field);
      console.log(`✓ Field: ${field} | Value: ${value}`);

      values.push({
        fieldName: field,
        value,
      });
    }

    
    return values;
  }

  async saveFinancialSummarySnapshot(outputPath = path.join(__dirname, '../testdata/uiFinancialSummarySnapshot.json')) {
    const snapshot = {
      source: 'UI',
      savedAt: new Date().toISOString(),
      values: await this.readFinancialSummaryValues(),
    };

    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    console.log(outputPath);
    fs.writeFileSync(outputPath, JSON.stringify(snapshot, null, 2));

    return snapshot;
  }

 
async readFieldValue(field) {

  const label = this.page.getByText(field, { exact: true }).first();

  await expect(label).toBeVisible({ timeout: 15000 });

  const value = await label.evaluate((labelElement) => {
    const clean = (text) => String(text || '').replace(/\s+/g, ' ').trim();
    const isValue = (text) =>
      /^(\(?-?\$?[\d,]+(\.\d+)?\)?|[-\d,.]+%|\(?\$?[\d,]+\)?|0|-\s*)$/.test(clean(text));

    const row =
      labelElement.closest('tr') ||
      labelElement.closest('[role="row"]') ||
      labelElement.closest('.row') ||
      labelElement.parentElement;

    if (!row) return '';

    const rowText = clean(row.innerText);
    const labelText = clean(labelElement.innerText);

    const afterLabel = rowText
      .slice(rowText.indexOf(labelText) + labelText.length)
      .trim();

    const match = afterLabel.match(/\(?\$?[\d,]+(?:\.\d+)?\)?|[-\d,.]+%/);

    return match ? match[0] : '';
  });

  return value.trim();
}

}


module.exports = FinancialSummaryPage;


