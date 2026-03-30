

const roleLocators = (page) => ({

  // Buttons
  rolesBtn:   page.getByRole('button', { name: 'Roles', exact: true }),
  addRoleBtn: page.getByRole('button', { name: '+ Add Role', exact: true }),
  saveBtn:    page.locator('button[title="Save"]'),

  // Dropdown — combobox by index
  dropdown: (index) => page.locator('[role="combobox"]').nth(index),

  // Dropdown option — dynamic by value
  dropdownOption: (valueText) => page.getByRole('option', { name: valueText }),
  dropdownOptionExact: (valueText) => page.getByRole('option', { name: valueText, exact: true }),

  // Bill Rate Type radio/label — dynamic by label text
  billRateLabel: (billRateType) => page.getByLabel(billRateType).nth(1),

  // Decimal input — dynamic by label text
  decimalInput: (labelText) => page.locator(
    `//span[contains(normalize-space(),"${labelText}")]/parent::div//input[@inputmode="decimal"]`
  ),

  // Numeric input — dynamic by label text
  numericInput: (labelText) => page.locator(
    `//span[contains(normalize-space(),"${labelText}")]/parent::div//input[@inputmode="numeric"]`
  ),

  // Checkbox — dynamic by label text, excludes disabled
  checkbox: (labelText) => page.locator(
    `//span[normalize-space()="${labelText}"]/parent::div//input[@type="checkbox" and not(@disabled)]`
  ),

  // Discount input
  discountInput: page.locator(
    '//span[contains(normalize-space(),"Discount")]/parent::div//input[@type="number"]'
  ),

});

module.exports = { roleLocators };