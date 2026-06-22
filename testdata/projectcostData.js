

const costsData = [
  {
    costAccount:       'Morale',
    description:    'Morale Cost',
    costType:    'Pass-Through',
    country:        'United States',
    cashflowImpact: 'Hourly',
    quantity:       2,
    frequency:      2,
    unitRate:       25,
    markup:         2,
  },
  {
    costAccount:       'Equipment Expense',
    description:    'Equipment Cost',
    costType:    'Pass-Through',
    country:        'United States',
    cashflowImpact: 'Quarterly',
    quantity:       2,
    frequency:      2,
    unitRate:       25,
    markup:         2,
  },
  // {
  //   costAccount:       'Travel',
  //   description:    'Travel Cost',
  //   costType:    'Pass-Through',
  //   country:        'United States',
  //   cashflowImpact: 'Yearly',
  //   quantity:       2,
  //   frequency:      2,
  //   unitRate:       25,
  //   markup:         2,
  // },
  // {
  //   costAccount:       'Software Expense',
  //   description:    'Software Cost',
  //   costType:    'Pass-Through',
  //   country:        'United States',
  //   cashflowImpact: 'End of Project',
  //   quantity:       2,
  //   frequency:      2,
  //   unitRate:       25,
  //   markup:         2,
  // },
];

module.exports = { costsData };