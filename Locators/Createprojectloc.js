
const projectLocators = (page) => ({

  // Buttons
  createProjectBtn:    page.getByRole('button', { name: 'Create Project' }),
  createBtn:           page.getByRole('button', { name: 'Create', exact: true }),

  // Dropdown triggers
  clientDropdown:       page.getByLabel('Client'),
  opportunityDropdown:  page.getByLabel('Dynamics Opportunity'),
  practiceDropdown:     page.getByLabel('Practice'),
  serviceDropdown:      page.getByLabel('Service'),
  billingTypeDropdown:  page.getByLabel('Billing Type'),
  billingCycleDropdown: page.getByLabel('Billing Cycle'),
  paymentTermsDropdown: page.getByLabel('Payment Terms'),

  // Dropdown option — dynamic, called with value
  dropdownOption: (name, exact = false) => page.getByRole('option', { name, exact }),

  // Text inputs
  projectNameInput:        page.getByLabel('Project Name'),
  projectDescriptionInput: page.getByLabel('Project Description'),
  volumeRebateInput:       page.getByLabel('Volume Rebate %'),
  vmsFeeInput:             page.getByLabel('VMS Fee %'),

  // Date pickers — nth(0) = start, nth(1) = end
  datePicker: (index) => page.locator('[role="group"]').nth(index),

  // React select menu — wait before clicking option
  reactSelectMenu: page.locator('.react-select__menu'),

});

module.exports = projectLocators;