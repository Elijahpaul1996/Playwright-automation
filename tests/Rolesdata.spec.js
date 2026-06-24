const { test } = require('@playwright/test');
const path = require('path');
const RolesDataPage = require('../pages/ReadRoleDataPage');

test('Read roles from Excel and save snapshot', async () => {

  const rolesData = new RolesDataPage();

  const snapshotPath = path.join(
    __dirname,
    '../testdata/rolesSnapshot.json'
  );

  const snapshot = rolesData.saveRolesSnapshot(snapshotPath);

  console.log('Roles snapshot saved successfully');
  console.log(`Path    : ${snapshotPath}`);
  console.log(`Records : ${snapshot.values.length}`);

});