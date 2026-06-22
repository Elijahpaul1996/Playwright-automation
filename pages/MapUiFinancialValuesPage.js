

const fs = require('fs');
const path = require('path');

const UI_FINANCIAL_FIELDS = require('./UifinancialvaluesPage');

function mapUiFinancialValues() {

  const uiSnapshotPath = path.join(
    __dirname,
    '../testdata/uiFinancialSummarySnapshot.json'
  );

  const uiSnapshot = JSON.parse(
    fs.readFileSync(uiSnapshotPath, 'utf8')
  );

  const mappedValues = uiSnapshot.values.map(uiItem => {

    const mapping = UI_FINANCIAL_FIELDS.find(
      field =>
        field.fieldName.trim().toLowerCase() ===
        uiItem.fieldName.trim().toLowerCase()
    );

    return {
      key: mapping?.key || 'NOT_MAPPED',
      fieldName: uiItem.fieldName,
      value: uiItem.value
    };
  });

  const output = {
    source: 'UI_MAPPED',
    mappedAt: new Date().toISOString(),
    values: mappedValues
  };

  const outputPath = path.join(
    __dirname,
    '../testdata/mappedUiFinancialSummarySnapshot.json'
  );

  fs.writeFileSync(
    outputPath,
    JSON.stringify(output, null, 2)
  );

  console.log(
    `Mapped UI Snapshot Saved: ${outputPath}`
  );

  return output;
}

module.exports = {
  mapUiFinancialValues
};