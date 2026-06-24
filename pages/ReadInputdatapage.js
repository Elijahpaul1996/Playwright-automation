const fs = require('fs');
const path = require('path');
const XLSX = require('xlsx');

const DEFAULT_WORKBOOK_PATH =
  'C:\\Users\\Elijah.Paul\\OneDrive - Insight Global, LLC\\Desktop\\Pricing Tool\\Pavan IG\\6.19\\6.19 6R inflation all.xlsm';

class ReadInputDataPage {
  constructor(workbookPath = DEFAULT_WORKBOOK_PATH) {
    this.workbookPath = workbookPath;
    this.workbook = XLSX.readFile(workbookPath, {
      cellDates: false,
      cellFormula: true,
      cellNF: true,
      cellStyles: true,
    });
  }

  // ── Helper ─────────────────────────────────────────────────────────────────

  getSheet(sheetName) {
    const sheet = this.workbook.Sheets[sheetName];

    if (!sheet) {
      const available = this.workbook.SheetNames.join(', ');
      throw new Error(`Sheet "${sheetName}" not found. Available: ${available}`);
    }

    return sheet;
  }

  // ── Work Items ─────────────────────────────────────────────────────────────

  getWorkItemsData() {
    const sheet = this.getSheet('Input | Work Items');

    const rows = XLSX.utils.sheet_to_json(sheet, {
      range: 10,    // headers on Excel row 11 (0-based index 10)
      defval: '',
    });

    return rows
      .filter(row => row['Work Item Description'] || row['Standard Role'])
      .map((row, index) => {
        const item = {
          name:        row['Work Item Description'],
          description: String(row['Standard Role'] ?? '').toUpperCase(),
          role:        String(row['Standard Role'] ?? '').toUpperCase(),
          col3Value:   Number(row['Headcount'])               || 0,
          col8Value:   Number(row['Overtime Hours per Week']) || 0,
          startDate:   row['Start Date'],
          endDate:     row['Completion Date'],
        };

        console.log(`✓ Work Item ${index + 1}: ${item.name} | role: ${item.role} | start: ${item.startDate}`);

        return item;
      });
  }

  // ── Roles ──────────────────────────────────────────────────────────────────

  getRolesData() {
    const sheet = this.getSheet('Input | Role Information');

    const rows = XLSX.utils.sheet_to_json(sheet, {
      range: 8,     // headers on Excel row 9 (0-based index 8)
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
        //   discount:        Number(row['Discount'])                      || 0,
          discount: Math.round((Number(row['Discount']) || 0) * 100),
        };

        console.log(`✓ Role ${index + 1}: ${role.roleType} | state: ${role.state} | payRate: ${role.payRate}`);

        return role;
      });
  }

  // ── Project Costs ──────────────────────────────────────────────────────────

  getProjectCostsData() {
    const sheet = this.getSheet('Input | Project Costs and Fees');

    const rows = XLSX.utils.sheet_to_json(sheet, {
      range: 8,     // headers on Excel row 9 (0-based index 8)
      defval: '',
    });

    return rows
      .filter(row => row['Cost Description'] || row['Revenue/Cost Account'])
      .map((row, index) => {
        const cost = {
          costAccount:    row['Revenue/Cost Account'],
          description:    row['Cost Description'],
          costType:       row['Cost Type'],
          country:        row['Country of Origin'],
          cashflowImpact: row['Cashflow Impact'],
          quantity:       Number(row['Quantity'])                       || 0,
          frequency:      Number(row['Frequency'])                      || 0,
          unitRate:       Number(row['Contract Currency Unit Rate'])    || 0,
        //   markup:         Number(row['Markup'])                         || 0,
          markup: Math.round((Number(row['Markup']) || 0) * 100),
        };

        console.log(`✓ Cost ${index + 1}: ${cost.costAccount} | type: ${cost.costType} | unitRate: ${cost.unitRate}`);

        return cost;
      });
  }

  // ── Save combined snapshot ─────────────────────────────────────────────────

  saveInputSnapshot(
    outputPath = path.join(__dirname, '../testdata/inputDataSnapshot.json')
  ) {
    const snapshot = {
      workbookPath: this.workbookPath,
      savedAt: new Date().toISOString(),
      workItems:    this.getWorkItemsData(),
      roles:        this.getRolesData(),
      projectCosts: this.getProjectCostsData(),
    };

    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, JSON.stringify(snapshot, null, 2));

    console.log(`\nSnapshot saved → ${outputPath}`);
    console.log(`  Work Items    : ${snapshot.workItems.length}`);
    console.log(`  Roles         : ${snapshot.roles.length}`);
    console.log(`  Project Costs : ${snapshot.projectCosts.length}`);

    return snapshot;
  }
}

module.exports = ReadInputDataPage;