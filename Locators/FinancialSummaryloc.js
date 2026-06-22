const FINANCIAL_FIELDS = [
  'Fully Loaded Gross Profit',
  'Reported Gross Profit',
  'Contract Revenue',
  'Labor Revenue',
  'Billable Expense Pass Through',
  'Fee',
  'Fee at Risk',
  'Implementation Fee',
  'Management Fee',
  'Volume Discount',
  'Early Pay Discount',
  'Innovation Fund',
  'Total Revenue',
  'External Direct Labor - Onshore',
  'External Project OH - Onshore',
  'External Direct Labor - Offshore',
  'External Project OH - Offshore',
  'Internal Direct Labor - Onshore',
  'Internal Project OH - Onshore',
  'Total Labor Structure',
  'Consultant Salaries and Wages',
  'Consultant Payroll Taxes',
  'Consultant Bonuses',
  'Workers Comp Insurance',
  'Clinical Insurance',
  'Medical Benefits',
  'ACA Subsides',
  'Internal PM/PC salaries and wages',
  'Internal payroll taxes on PM/PC salaries and wages',
  'Total Labor Costs',
  'Facility Rent Expense',
  'Capital Facility Expense',
  'Equipment Expense',
  'Software Expense',
  'Morale',
  'Travel',
  'vendor Expenses',
  'Working Capital Finance Cost',
  'Other costs',
  'FX Costs',
  'Licensing/Certification',
  'Total Project Costs',
  'Average Discount',
  'Max Headcount', 'Headcount No Standard List Price' , 'Average Bill Rate',
  'Discount Rate', 'Project Value', 'IRR',
  'Estimated Commissions', 'Commission Payroll Taxes', 'EVA Value:', 'EVA %:',

];

const financialSummaryLocators = (page) => ({
  financialSummaryButton: page.locator(
    "//*[normalize-space()='Financial Summary'][1]/preceding-sibling::button"
  ),

  fieldValue: (field) =>
    page.locator(`xpath=//*[normalize-space()="${field}"]/following-sibling::*[1]`),
});

module.exports = {
  FINANCIAL_FIELDS,
  financialSummaryLocators,
};

