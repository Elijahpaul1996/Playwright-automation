

const workitemLocators = (page) => ({

  // Buttons
  addWorkItemBtn: page.getByRole('button', { name: '+ Add Work Item', exact: true }),
  workItemsBtn:   page.getByRole('button', { name: 'Work Items', exact: true }),
  saveBtn:        page.locator('button[title="Save"]'),

  // Project button — dynamic by project name
  projectBtn: (projectName) => page.getByText(projectName, { exact: true }),

  // Form fields
  workItemNameInput: page.locator('[name="workItemName"]'),
  descriptionInput:  page.locator('textarea').first(),

  // Table row — dynamic by role name
  activeRow: (rowName) => page.locator('tr', { hasText: rowName }).last(),

  // Row checkbox — called on activeRow
  rowCheckbox: (rowName) => page.locator('tr', { hasText: rowName }).last().locator('input[type="checkbox"]'),

  // Row input by column index — called on activeRow
  rowInput: (rowName, colIndex) => page.locator('tr', { hasText: rowName }).last().locator('td').nth(colIndex).locator('input'),
});

module.exports = { workitemLocators };