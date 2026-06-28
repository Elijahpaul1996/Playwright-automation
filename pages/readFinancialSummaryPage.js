const fs = require('fs');
const path = require('path');
const { expect } = require('@playwright/test');
const {
  FINANCIAL_FIELDS,
  MONTHLY_PNL_FIELDS,
  financialSummaryLocators,
} = require('../Locators/FinancialSummaryloc');

class FinancialSummaryPage {
  constructor(page) {
    this.page = page;
    this.projectLoc = financialSummaryLocators(page);
    this.fields = FINANCIAL_FIELDS;
    this.monthlyFields = MONTHLY_PNL_FIELDS;
  }

  // ── Navigate ───────────────────────────────────────────────────────────────

  async navigateToProject() {
    const projectBtn = this.page.getByText('Test inflation02');
    await projectBtn.waitFor({ timeout: 30000 });
    console.log('Project button visible');
    await projectBtn.click();
    console.log('Project button clicked');
    await this.page.waitForLoadState('networkidle');
  }

  // ── Open sections ──────────────────────────────────────────────────────────

  async openFinancialSummary() {
    const btn = this.page.locator(
      "//*[normalize-space()='Financial Summary'][1]/preceding-sibling::button"
    );
    await expect(btn).toBeVisible({ timeout: 30000 });
    await btn.click();
    console.log('Financial Summary opened');
    await this.page.waitForTimeout(5000);
  }

  async openMonthlyPAndL() {
    const btn = this.page.locator(
      "//span[normalize-space()='Monthly P&L']/preceding-sibling::button"
    );
    await expect(btn).toBeVisible({ timeout: 30000 });
    await btn.click();
    console.log('Monthly P&L opened');
    await this.page.waitForTimeout(3000);
  }

  // ── Read helpers ───────────────────────────────────────────────────────────

  async readFieldValue(field) {
    const label = this.page.getByText(field.fieldName, { exact: true }).first();
    await expect(label).toBeVisible({ timeout: 15000 });

    const value = await label.evaluate((labelElement) => {
      const clean = (text) => String(text || '').replace(/\s+/g, ' ').trim();

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

      const match = afterLabel.match(/-?\(?\$?[\d,]+(?:\.\d+)?\)?|[-\d,.]+%/);
      return match ? match[0] : '';
    });

    return value.trim();
  }

  async readInputFieldValue(labelText) {
    const input = this.page.locator(
      `//*[normalize-space()='${labelText}']/following-sibling::*//input`
    );
    await expect(input).toBeVisible({ timeout: 10000 });
    return await input.inputValue();
  }

  // async readMonthlyFieldValue(field) {
  //   const locator = this.page.locator(
  //   `//span[normalize-space()='${field.fieldName}']/following-sibling::*`
  // ).filter({ visible: true }).nth(field.occurrence - 1);

  //   await expect(locator).toBeVisible({ timeout: 15000 });

  //   const value = await locator.evaluate((el) => {
  //     return String(el.innerText || el.textContent || '').replace(/\s+/g, ' ').trim();
  //   });

  //   return value.trim();
  // }
async readMonthlyFieldValue(field) {
  const locator = this.page.locator(
    `//span[normalize-space()='${field.fieldName}']/following-sibling::*`
  ).filter({ visible: true }).nth(field.occurrence - 1);

  try {
    await expect(locator).toBeVisible({ timeout: 15000 });

    const value = await locator.evaluate((el) => {
      return String(el.innerText || el.textContent || '').replace(/\s+/g, ' ').trim();
    });

    const trimmed = value.trim();

    // if empty — capture screenshot and log warning
    if (!trimmed) {
      console.warn(`⚠️  No value found for: ${field.fieldName}`);
      await this.page.screenshot({
        path: `test-results/missing-value-${field.key}.png`,
        fullPage: false,
      });
      return 'NO VALUE';
    }

    return trimmed;

  } catch (error) {
    // element not found or hidden — capture screenshot and log
    console.warn(`⚠️  Field not found: ${field.fieldName} | Error: ${error.message}`);
    await this.page.screenshot({
      path: `test-results/missing-field-${field.key}.png`,
      fullPage: false,
    });
    return 'NO VALUE';
  }
}


  // ── Read all values ────────────────────────────────────────────────────────

  async readFinancialSummaryValues() {
    const values = [];

    for (const field of this.fields) {
      let value;

      if (field.key === 'discountRate') {
        value = await this.readInputFieldValue('Discount Rate');
      } else {
        value = await this.readFieldValue(field);
      }

      console.log(`✓ Financial | ${field.fieldName}: ${value}`);
      values.push({ key: field.key, fieldName: field.fieldName, value });
    }

    return values;
  }

  async readMonthlyPAndLValues() {
    const values = [];

    for (const field of this.monthlyFields) {
      const value = await this.readMonthlyFieldValue(field);
      console.log(`✓ Monthly P&L | ${field.fieldName}: ${value}`);
      values.push({ key: field.key, fieldName: field.fieldName, value });
    }

    return values;
  }

  // ── Save combined snapshot ─────────────────────────────────────────────────

  async saveAllSnapshots(
    outputPath = path.join(__dirname, '../testdata/uiFinancialSnapshot.json')
  ) {
    await this.openFinancialSummary();
    const financialSummary = await this.readFinancialSummaryValues();

    await this.openMonthlyPAndL();
    const monthlyPAndL = await this.readMonthlyPAndLValues();

    const snapshot = {
      source:  'UI',
      savedAt: new Date().toISOString(),
      financialSummary,
      monthlyPAndL,
    };

    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, JSON.stringify(snapshot, null, 2));

    console.log(`\n✓ Snapshot saved → ${outputPath}`);
    console.log(`  Financial Summary : ${financialSummary.length} fields`);
    console.log(`  Monthly P&L       : ${monthlyPAndL.length} fields`);

    return snapshot;
  }
}

module.exports = FinancialSummaryPage;