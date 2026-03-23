

const costsData = [
  {
    costType:       'Morale',
    description:    'Morale Cost',
    billingType:    'Pass-Through',
    country:        'United States',
    cashflowImpact: 'Monthly',
    quantity:       2,
    frequency:      2,
    unitRate:       25,
    markup:         2,
  },
  {
    costType:       'Equipment Expense',
    description:    'Equipment Cost',
    billingType:    'Pass-Through',
    country:        'United States',
    cashflowImpact: 'Quarterly',
    quantity:       2,
    frequency:      2,
    unitRate:       25,
    markup:         2,
  },
  {
    costType:       'Travel',
    description:    'Travel Cost',
    billingType:    'Pass-Through',
    country:        'United States',
    cashflowImpact: 'Yearly',
    quantity:       2,
    frequency:      2,
    unitRate:       25,
    markup:         2,
  },
  {
    costType:       'Software Expense',
    description:    'Software Cost',
    billingType:    'Pass-Through',
    country:        'United States',
    cashflowImpact: 'End of Project',
    quantity:       2,
    frequency:      2,
    unitRate:       25,
    markup:         2,
  },
];

module.exports = { costsData };