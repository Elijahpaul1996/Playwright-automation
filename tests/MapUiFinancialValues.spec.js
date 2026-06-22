const { test } = require('@playwright/test');

// const mapUiFinancialValues= require('../pages/MapUiFinancialValuesPage');
const {
  mapUiFinancialValues
} = require('../pages/MapUiFinancialValuesPage');



test('Map UI values to keys', async () => {

  const result = mapUiFinancialValues();

  console.log(
    JSON.stringify(result.values, null, 2)
  );

});