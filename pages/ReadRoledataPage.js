const fs = require('fs');
const path = require('path');
const XLSX = require('xlsx');

const DEFAULT_WORKBOOK_PATH =
  'C:\\Users\\Elijah.Paul\\OneDrive - Insight Global, LLC\\Desktop\\Pricing Tool\\Pavan IG\\6.19\\6.19 3 r.xlsm';

class RolesDataPage {
  constructor(workbookPath = DEFAULT_WORKBOOK_PATH) {
    this.workbookPath = workbookPath;
    this.workbook = XLSX.readFile(workbookPath, {
      cellDates: false,
      cellFormula: true,
      cellNF: true,
      cellStyles: true,
    });
  }

  getRolesData() {
    const sheet = this.workbook.Sheets['Input | Role Information'];

    if (!sheet) {
      throw new Error('Sheet "Input | Role Information" not found in workbook');
    }

    const rows = XLSX.utils.sheet_to_json(sheet, {
      range: 8,   // headers on Excel row 9 (0-based index 8)
      defval: '',
    });

    return rows
      .filter(row => row['Standard Role'] || row['Work Item Description'])
      .map((row, index) => {
        const role = {
          roleType:        String(row['Standard Role'] ?? '').toUpperCase(),
          tenure:          row['Tenure'],
          country:         row['Country of Resource Origin'],
          employmentType:  row['Employment Type'],
          state:           row['Work State'],
          metro:           row['Metropolitan Area'],
          workersCompRisk: row['Workers Comp Risk'],
          payRate:         Number(row['Contract Currency Pay Rate'])    || 0,
          fringeRate:      Number(row['Contract Currency Fringe Rate']) || 0,
          otPayFactor:     Number(row['OT Pay Rate Factor'])            || 0,
          otBillFactor:    Number(row['OT Bill Rate Factor'])           || 0,
          pto:             Number(row['PTO Days/year'])                 || 0,
          sickDays:        Number(row['Sick Days/year'])                || 0,
          holidays:        Number(row['Holiday/year'])                  || 0,
          crossBorder:     String(row['Cross Border?']).toLowerCase() === 'yes',
          discount:        Number(row['Discount'])                      || 0,
        };

        console.log(`✓ Role ${index + 1}: ${role.roleType} | state: ${role.state} | payRate: ${role.payRate}`);

        return role;
      });
  }

  saveRolesSnapshot(
    outputPath = path.join(__dirname, '../testdata/rolesSnapshot.json')
  ) {
    const snapshot = {
      workbookPath: this.workbookPath,
      sheetName: 'Input | Role Information',
      savedAt: new Date().toISOString(),
      values: this.getRolesData(),
    };

    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, JSON.stringify(snapshot, null, 2));

    return snapshot;
  }
}

module.exports = RolesDataPage;