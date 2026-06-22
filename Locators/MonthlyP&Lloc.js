const monthlyPAndLFields = 

[
  "Gross Sales",
  "Billable Expense (Pass Thru)",
  "Volume Rebates",
  "Early Pay Discount",
  "Net Revenue",
  "Salaries & Wages",
  "Payroll Taxes",
  "Non-Billable Expense",
  "Billable Expense (Pass Thru)",
  "Workers Comp Insurance",
  "Clinical Insurance",
  "Medical benefits",
  "ACA cost",
  "COS",
  "Gross Margin",
  "%",
  "Headcount",
  "Avg. Bill Rat"
]




const monthlyPAndLLocators = (page) => ({
  monthlyPAndLButton: page.locator(
    "//*[normalize-space()='Monthly P&L'][1]/preceding-sibling::button"
  ),

    monthlyTableButton: page.locator("//button[text()='Monthly Table']"),

  fieldValue: (field) =>
    page.locator(`xpath=//*[normalize-space()="${field}"]/following-sibling::*[1]`),
});



module.exports = {
  monthlyPAndLLocators,
  Monthlytable
};

  







