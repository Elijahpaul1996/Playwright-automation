

const projectCostsLocators = (page) => ({

  // Buttons
  addCostItemBtn:    page.getByRole('button', { name: '+ Add Cost Item', exact: true }),
  projectCostsBtn:   page.getByRole('button', { name: '$ Project Costs' }),
  saveBtn:           page.getByRole('button', { name: 'Save' }),

  // Dropdown
  dropdown:          (index) => page.locator('[role="combobox"]').nth(index),
  dropdownOption:    (valueText) => page.locator(
                       `//div[@role="listbox"]//div[@role="option" and normalize-space()="${valueText}"]`
                     ),

  // Input fields
  costDescription:   page.locator('//span[contains(text(),"Cost Description")]//following-sibling::div//input'),
  quantity:          page.locator('//span[text()="Quantity"]//following-sibling::div//input'),
  frequency:         page.locator('//span[text()="Frequency"]//following-sibling::div//input'),
  unitRate:          page.locator('//span[text()="Contract Currency Unit Rate"]//following-sibling::div//input'),
  markup:            page.locator('//span[text()="Markup (%)"]//following-sibling::div//input'),

});

module.exports = projectCostsLocators;