const { test } = require('@playwright/test');
const { step, attachment, label, epic, feature, story, Status } = require('allure-js-commons');
const path = require('path');
const CompareFinancialSummaryPage = require('../pages/CompareFinancialSummaryPage');

test('Compare Financial Summary — Excel vs UI', async () => {

  await label('suite', 'Financial Summary');
  await epic('Financial Validation');
  await feature('Excel vs UI Comparison');
  await story('Financial Summary Fields');

  const comparator = new CompareFinancialSummaryPage(
    path.join(__dirname, '../testdata/financialSummarySnapshot.json'),
    path.join(__dirname, '../testdata/uiFinancialSummarySnapshot.json')
  );

  const report = comparator.saveComparisonReport(
    path.join(__dirname, '../testdata/financialSummaryComparisonReport.json')
  );

  // attach full report as JSON to Allure
  await attachment(
    'Full Comparison Report',
    JSON.stringify(report, null, 2),
    'application/json'
  );

  // attach summary as text
  await attachment(
    'Summary',
    [
      `Total          : ${report.summary.total}`,
      `✅ Matched      : ${report.summary.matched}`,
      `❌ Mismatched   : ${report.summary.mismatched}`,
      `🔄 Roundoff     : ${report.summary.roundoff}`,
      `⚠️  Missing UI   : ${report.summary.missingInUi}`,
      `⚠️  Missing Excel: ${report.summary.missingInExcel}`,
    ].join('\n'),
    'text/plain'
  );

  // individual step per field
  for (const result of report.results) {
    await step(`${result.fieldName} — ${result.status}`, async (s) => {

      await attachment(
        `${result.fieldName}`,
        [
          `Key            : ${result.key}`,
          `Excel Value    : ${result.excelValue}`,
          `UI Value       : ${result.uiValue}`,
          `Normalized Excel: ${result.normalizedExcel}`,
          `Normalized UI  : ${result.normalizedUi}`,
          `Status         : ${result.status}`,
          result.note ? `Note           : ${result.note}` : '',
        ].filter(Boolean).join('\n'),
        'text/plain'
      );

     if (result.status === 'MISMATCHED') {
  s.status = Status.FAILED;
  s.statusDetails = { message: `Excel: "${result.excelValue}" | UI: "${result.uiValue}"` };
} else if (result.status === 'MISSING_IN_UI' || result.status === 'MISSING_IN_EXCEL') {
  s.status = Status.BROKEN;
  s.statusDetails = { message: `${result.status} — Excel: "${result.excelValue}" | UI: "${result.uiValue}"` };
}
 
    });
  }


    

  

  console.log(`\n✅ Comparison complete — ${report.summary.matched} matched, ${report.summary.roundoff} roundoff, ${report.summary.mismatched} mismatched`);

});