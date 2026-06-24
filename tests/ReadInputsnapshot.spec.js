const { test } = require('@playwright/test');
const path = require('path');
const ReadInputDataPage = require('../pages/ReadInputDataPage');

test('Read all input sheets from Excel and save snapshot', async () => {

  const inputData = new ReadInputDataPage();

  const snapshotPath = path.join(
    __dirname,
    '../testdata/inputDataSnapshot.json'
  );

  const snapshot = inputData.saveInputSnapshot(snapshotPath);

  console.log('\nSnapshot summary:');
  console.log(`  Work Items    : ${snapshot.workItems.length} records`);
  console.log(`  Roles         : ${snapshot.roles.length} records`);
  console.log(`  Project Costs : ${snapshot.projectCosts.length} records`);

});