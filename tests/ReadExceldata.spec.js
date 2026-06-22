const { test } = require('@playwright/test');
const path = require('path');
const ExcelDataPage = require('../pages/ExcelDataPage');

test('Read Excel and overwrite snapshot', async () => {

  const excelData = new ExcelDataPage();

  // ── Financial Summary snapshot ──────────────────────────────────────────
  const financialSnapshotPath = path.join(
    __dirname,
    '../testdata/financialSummarySnapshot.json'
  );

  const financialSnapshot = excelData.saveFinancialSummarySnapshot(financialSnapshotPath);

  console.log('Financial Summary snapshot updated successfully');
  console.log(`Snapshot Path: ${financialSnapshotPath}`);
  console.log(`Records: ${financialSnapshot.values.length}`);

  // ── Monthly P&L snapshot ────────────────────────────────────────────────
  const monthlySnapshotPath = path.join(
    __dirname,
    '../testdata/monthlyPAndLSnapshot.json'
  );

  const monthlySnapshot = excelData.saveMonthlyPAndLSnapshot(monthlySnapshotPath);

  console.log('Monthly P&L snapshot updated successfully');
  console.log(`Snapshot Path: ${monthlySnapshotPath}`);
  console.log(`Records: ${monthlySnapshot.values.length}`);

});