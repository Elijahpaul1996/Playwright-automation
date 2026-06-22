const fs = require('fs');
const path = require('path');
const XLSX = require('xlsx');

const DEFAULT_WORKBOOK_PATH =
  'C:\\Users\\Elijah.Paul\\OneDrive - Insight Global, LLC\\Desktop\\Pricing Tool\\Pavan IG\\6.19\\6.19 3 r.xlsm';

// ─── Financial Summary field definitions ─────────────────────────────────────

const FINANCIAL_SUMMARY_FIELDS = [
  { key: 'topRevenue', fieldName: 'Revenue', occurrence: 1 },
  { key: 'topFullyLoadedGrossProfit', fieldName: 'Fully Loaded Gross Profit', occurrence: 1 },
  { key: 'topFullyLoadedGrossProfitPercent', fieldName: '%', occurrence: 1 },
  { key: 'topReportedDirectGrossProfit', fieldName: 'Reported (Direct) Gross Profit', occurrence: 1 },
  { key: 'topReportedDirectGrossProfitPercent', fieldName: '%', occurrence: 2 },
  { key: 'contractRevenue', fieldName: 'Contract Revenue (NTE + Pass-Through Revenue)', occurrence: 1 },

  { key: 'revenueTotal', fieldName: 'Revenue', occurrence: 2 },
  { key: 'laborRevenue', fieldName: 'Labor Revenue', occurrence: 1 },
  { key: 'billableExpensePassThrough', fieldName: 'Billable Expense Pass Through', occurrence: 1 },
  { key: 'fees', fieldName: 'Fees', occurrence: 1 },
  { key: 'feesAtRisk', fieldName: 'Fees at Risk', occurrence: 1 },
  { key: 'implementationFees', fieldName: 'Implementation Fees', occurrence: 1 },
  { key: 'managementFees', fieldName: 'Management Fees', occurrence: 1 },
  { key: 'volumeDiscount', fieldName: 'Volume Discount', occurrence: 1 },
  { key: 'earlyPayDiscount', fieldName: 'Early Pay Discount', occurrence: 1 },
  { key: 'innovationFunds', fieldName: 'Innovation Funds', occurrence: 1 },
  { key: 'laborStructureTotal', fieldName: 'Labor Structure', occurrence: 1 },
  { key: 'externalDirectLaborOnshore', fieldName: 'External Direct Labor - Onshore', occurrence: 1 },
  { key: 'externalProjectOhOnshore', fieldName: 'External Project OH - Onshore', occurrence: 1 },
  { key: 'externalDirectLaborOffshore', fieldName: 'External Direct Labor - Offshore', occurrence: 1 },
  { key: 'externalProjectOhOffshore', fieldName: 'External Project OH - Offshore', occurrence: 1 },
  { key: 'internalDirectLaborOnshore', fieldName: 'Internal Direct Labor - Onshore', occurrence: 1 },
  {
    key: 'internalProjectOhOnshore',
    fieldName: 'Internal Project OH - Onshore',
    searchNames: ['Internal Project OH - Onshore', 'Interal Project OH - Onshore'],
    occurrence: 1,
  },

  { key: 'laborCostsTotal', fieldName: 'Labor Costs', occurrence: 1 },
  { key: 'consultantSalariesAndWages', fieldName: 'Consultant Salaries and Wages', occurrence: 1 },
  { key: 'consultantPayrollTaxes', fieldName: 'Consultant Payroll Taxes', occurrence: 1 },
  { key: 'consultantBonuses', fieldName: 'Consultant Bonuses', occurrence: 1 },
  { key: 'workersCompInsurance', fieldName: 'Workers Comp Insurance', occurrence: 1 },
  { key: 'clinicalInsurance', fieldName: 'Clinical Insurance', occurrence: 1 },
  { key: 'medicalBenefits', fieldName: 'Medical Benefits', occurrence: 1 },
  { key: 'acaSubsidies', fieldName: 'ACA Subsidies', occurrence: 1 },
  { key: 'internalPmPcSalariesAndWages', fieldName: 'Internal PM/PC (project management) Salaries and Wages', occurrence: 1 },
  { key: 'internalPayrollTaxesOnPmPcSalariesAndWages', fieldName: 'Internal Payroll Taxes on PM/PC salaries and wages', occurrence: 1 },

  { key: 'projectCostsTotal', fieldName: 'Project Costs', occurrence: 1 },
  { key: 'facilityRentExpense', fieldName: 'Facility Rent Expense', occurrence: 1 },
  { key: 'capitalFacilityExpenses', fieldName: 'Capital Facility Expenses', occurrence: 1 },
  { key: 'equipmentExpense', fieldName: 'Equipment Expense', occurrence: 1 },
  { key: 'softwareExpense', fieldName: 'Software Expense', occurrence: 1 },
  { key: 'morale', fieldName: 'Morale', occurrence: 1 },
  { key: 'travel', fieldName: 'Travel', occurrence: 1 },
  { key: 'vendorExpenses', fieldName: 'Vendor Expenses', occurrence: 1 },
  { key: 'workingCapitalFinanceCost', fieldName: 'Working Capital (Finance Cost)', occurrence: 1 },
  { key: 'otherCosts', fieldName: 'Other Costs', occurrence: 1 },
  { key: 'fxCosts', fieldName: 'FX Costs', occurrence: 1 },
  { key: 'licensingAndCertification', fieldName: 'Licensing and Certification', occurrence: 1 },
  { key: 'bottomFullyLoadedGrossProfit', fieldName: 'Fully Loaded Gross Profit', occurrence: 2 },
  { key: 'bottomReportedDirectGrossProfit', fieldName: 'Reported (Direct) Gross Profit', occurrence: 2 },
  { key: 'compensationCostTotal', fieldName: 'Compensation Cost', occurrence: 1 },
  { key: 'estimatedCommissions', fieldName: 'Estimated Commissions', occurrence: 1 },
  { key: 'commissionPayrollTaxes', fieldName: 'Commission Payroll Taxes', occurrence: 1 },
  { key: 'eva', fieldName: 'EVA', occurrence: 1 },
  { key: 'evaPercent', fieldName: '%', occurrence: 3 },

  { key: 'averageDiscount', fieldName: 'Average Discount', occurrence: 1 },
  { key: 'maxHeadcount', fieldName: 'Max Headcount', occurrence: 1 },
  { key: 'headcountNoStandardListPrice', fieldName: 'Headcount No Standard List Price', occurrence: 1 },
  { key: 'averageBillRate', fieldName: 'Average Bill Rate', occurrence: 1 },

  { key: 'discountRate', fieldName: 'Discount Rate', occurrence: 1 },
  { key: 'projectValue', fieldName: 'Project Value', occurrence: 1 },
  { key: 'irr', fieldName: 'IRR', occurrence: 1 },
];

// Fields whose label/value live in columns K/L instead of the default B/C.
const FINANCIAL_SUMMARY_SPECIAL_COLUMN_FIELDS = [
  'Average Discount',
  'Max Headcount',
  'Headcount No Standard List Price',
  'Average Bill Rate',
  'Discount Rate',
  'Project Value',
  'IRR',
];

// ─── Monthly P&L field definitions ───────────────────────────────────────────
//
// Layout:
//   Row 15 : "Project" label | "All" (C15) — the totals column
//   Row 16 : month headers starting at column E  (Jan 2026, Feb 2026 …)
//   Column B : field label
//   Column C : program-total value  ← what we snapshot as "value"
//   Columns E+ : per-month values   ← captured in monthlyValues

const MONTHLY_PNL_FIELDS = [
  // ── Revenue section ────────────────────────────────────────────────────────
  { key: 'grossSales',                     fieldName: 'Gross Sales',                  occurrence: 1 },
  { key: 'billableExpensePassThruRevenue', fieldName: 'Billable Expense (Pass Thru)', occurrence: 1 },
  { key: 'volumeRebates',                  fieldName: 'Volume Rebates',               occurrence: 1 },
  { key: 'earlyPayDiscount',               fieldName: 'Early Pay Discount',           occurrence: 1 },
  { key: 'netRevenue',                     fieldName: 'Net Revenue',                  occurrence: 1 },

  // ── Cost section ───────────────────────────────────────────────────────────
  { key: 'salariesAndWages',               fieldName: 'Salaries & Wages',             occurrence: 1 },
  { key: 'payrollTaxes',                   fieldName: 'Payroll Taxes',                occurrence: 1 },
  { key: 'nonBillableExpense',             fieldName: 'Non-Billable Expense',         occurrence: 1 },
  { key: 'billableExpensePassThruCOS',     fieldName: 'Billable Expense (Pass Thru)', occurrence: 2 },
  { key: 'workersCompInsurance',           fieldName: 'Workers Comp Insurance',       occurrence: 1 },
  { key: 'clinicalInsurance',              fieldName: 'Clinical Insurance',           occurrence: 1 },
  { key: 'medicalBenefits',               fieldName: 'Medical Benefits',             occurrence: 1 },
  { key: 'acaCost',                        fieldName: 'ACA Cost',                     occurrence: 1 },
  { key: 'cos',                            fieldName: 'COS',                          occurrence: 1 },

  // ── Margin / summary ──────────────────────────────────────────────────────
  { key: 'grossMargin',                    fieldName: 'Gross Margin',                 occurrence: 1 },
  { key: 'grossMarginPercent',             fieldName: '%',                            occurrence: 1 },

  // ── Headcount / rates ─────────────────────────────────────────────────────
  { key: 'headcount',                      fieldName: 'Headcount',                    occurrence: 1 },
  { key: 'avgBillRate',                    fieldName: 'Avg. Bill Rate',               occurrence: 1 },
];

// ─── ExcelDataPage class ──────────────────────────────────────────────────────

class ExcelDataPage {
  static getFinancialSummaryFieldDefinitions() {
    return FINANCIAL_SUMMARY_FIELDS;
  }

  static getMonthlyPAndLFieldDefinitions() {
    return MONTHLY_PNL_FIELDS;
  }

  constructor(workbookPath = DEFAULT_WORKBOOK_PATH) {
    this.workbookPath = workbookPath;
    this.workbook = XLSX.readFile(workbookPath, {
      cellDates: false,
      cellFormula: true,
      cellNF: true,
      cellStyles: true,
    });
  }

  // ── Generic helpers ────────────────────────────────────────────────────────

  getSheet(sheetName) {
    const sheet = this.workbook.Sheets[sheetName];
    console.log(`Loaded sheet: ${sheetName} from workbook: ${this.workbookPath}`);

    if (!sheet) {
      const availableSheets = this.workbook.SheetNames.join(', ');
      throw new Error(`Sheet not found: ${sheetName}. Available sheets: ${availableSheets}`);
    }

    return sheet;
  }

  getSheetRows(sheetName, options = {}) {
    const sheet = this.getSheet(sheetName);

    return XLSX.utils.sheet_to_json(sheet, {
      header: 1,
      defval: '',
      blankrows: false,
      raw: options.raw ?? false,
    });
  }

  normalizeText(value) {
    return String(value ?? '').replace(/\s+/g, ' ').trim().toLowerCase();
  }

  getCellDisplayValue(sheet, cellAddress) {
    const cell = sheet[cellAddress];

    if (!cell) {
      return '';
    }

    return String(cell.w ?? cell.v ?? '').trim();
  }

  // ── Financial Summary ──────────────────────────────────────────────────────

  getFinancialSummaryRows() {
    return this.getSheetRows('Financial Summary');
  }

  getFinancialSummaryValues() {
    const sheet = this.getSheet('Financial Summary');

    return FINANCIAL_SUMMARY_FIELDS.map((field) => {
      const rowNumber = this.findFinancialSummaryRow(sheet, field);

      const isSpecial = FINANCIAL_SUMMARY_SPECIAL_COLUMN_FIELDS.includes(field.fieldName);
      const labelColumn = isSpecial ? 'K' : 'B';
      const valueColumn = isSpecial ? 'L' : 'C';

      const labelCell = `${labelColumn}${rowNumber}`;
      const valueCell = `${valueColumn}${rowNumber}`;

      console.log(`${field.fieldName} -> ${labelCell} -> ${valueCell}`);

      return {
        key: field.key,
        fieldName: field.fieldName,
        rowNumber,
        labelColumn,
        valueColumn,
        labelCell,
        valueCell,
        value: this.getCellDisplayValue(sheet, valueCell),
      };
    });
  }

  findFinancialSummaryRow(sheet, field) {
    const range = XLSX.utils.decode_range(sheet['!ref']);
    const searchNames = field.searchNames || [field.fieldName];
    const normalizedSearchNames = searchNames.map((name) => this.normalizeText(name));
    let matchCount = 0;

    // Special fields have their labels in column K (index 10) instead of column B (index 1).
    const searchColumn = FINANCIAL_SUMMARY_SPECIAL_COLUMN_FIELDS.includes(field.fieldName)
      ? 10 // K
      : 1; // B

    for (let rowIndex = range.s.r; rowIndex <= range.e.r; rowIndex++) {
      const cellAddr = XLSX.utils.encode_cell({ r: rowIndex, c: searchColumn });
      const label = this.normalizeText(this.getCellDisplayValue(sheet, cellAddr));

      if (normalizedSearchNames.includes(label)) {
        matchCount += 1;

        if (matchCount === (field.occurrence || 1)) {
          return rowIndex + 1; // 1-based row number
        }
      }
    }

    throw new Error(`Field not found in Financial Summary: ${field.fieldName}`);
  }

  saveFinancialSummarySnapshot(
    outputPath = path.join(__dirname, '../testdata/financialSummarySnapshot.json')
  ) {
    const snapshot = {
      workbookPath: this.workbookPath,
      sheetName: 'Financial Summary',
      savedAt: new Date().toISOString(),
      values: this.getFinancialSummaryValues(),
    };

    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, JSON.stringify(snapshot, null, 2));

    return snapshot;
  }

  // ── Monthly P&L ────────────────────────────────────────────────────────────

  /**
   * Reads the month-header row (row 16, index 15) and returns a map of
   * { columnIndex (0-based) -> "Jan 2026" } for every non-empty header
   * found at or after column E (index 4).
   */
  _getMonthlyPAndLHeaderMap(sheet) {
    const HEADER_ROW_INDEX = 15; // row 16 in Excel (0-based)
    const FIRST_MONTH_COL = 4;   // column E (0-based)

    const range = XLSX.utils.decode_range(sheet['!ref']); // search all the columns
    const headerMap = {};

    for (let colIndex = FIRST_MONTH_COL; colIndex <= range.e.c; colIndex++) {
      const cellAddr = XLSX.utils.encode_cell({ r: HEADER_ROW_INDEX, c: colIndex });
      const header = String(this.getCellDisplayValue(sheet, cellAddr)).trim();

      if (header) {
        headerMap[colIndex] = header;
      }
    }

    return headerMap;
  }

  /**
   * Finds the 1-based row number for a Monthly P&L field.
   * All labels live in column B (index 1). occurrence handles duplicates
   * e.g. "Billable Expense (Pass Thru)" appears on both revenue and COS sides.
   */
  findMonthlyPAndLRow(sheet, field) {
    const range = XLSX.utils.decode_range(sheet['!ref']);
    const searchNames = field.searchNames || [field.fieldName];
    const normalizedSearchNames = searchNames.map((name) => this.normalizeText(name));
    let matchCount = 0;

    for (let rowIndex = range.s.r; rowIndex <= range.e.r; rowIndex++) {
      const cellAddr = XLSX.utils.encode_cell({ r: rowIndex, c: 1 }); // column B
      const label = this.normalizeText(this.getCellDisplayValue(sheet, cellAddr));

      if (normalizedSearchNames.includes(label)) {
        matchCount += 1;

        if (matchCount === (field.occurrence || 1)) {
          return rowIndex + 1; // 1-based row number
        }
      }
    }

    throw new Error(`Field not found in Monthly P&L: ${field.fieldName}`);
  }

  /**
   * Returns an array of field snapshots from the Monthly P&L sheet.
   * Each entry includes:
   *   key, fieldName, rowNumber, labelCell, valueCell
   *   value         -> program total (column C, the "All" column)
   *   monthlyValues -> { "Jan 2026": "137673.73", "Feb 2026": "125157.93", ... }
   */
  getMonthlyPAndLValues() {
    const sheet = this.getSheet('Monthly P&L');
    const headerMap = this._getMonthlyPAndLHeaderMap(sheet);

    return MONTHLY_PNL_FIELDS.map((field) => {
      const rowNumber = this.findMonthlyPAndLRow(sheet, field);

      const labelCell = `B${rowNumber}`;
      const valueCell = `C${rowNumber}`; // program total ("All" column)

      const totalValue = this.getCellDisplayValue(sheet, valueCell);

      // Collect per-month values keyed by month name e.g. "Jan 2026"
      const monthlyValues = {};

      for (const [colIndex, monthName] of Object.entries(headerMap)) {
        const monthCellAddr = XLSX.utils.encode_cell({
          r: rowNumber - 1, // back to 0-based
          c: Number(colIndex),
        });
        monthlyValues[monthName] = this.getCellDisplayValue(sheet, monthCellAddr);
      }

      console.log(
        `Monthly P&L | ${field.fieldName} -> ${labelCell} -> ${valueCell} | total: ${totalValue}`
      );

      return {
        key: field.key,
        fieldName: field.fieldName,
        rowNumber,
        labelCell,
        valueCell,
        value: totalValue,   // program total — use this for UI comparisons
        monthlyValues,       // full per-month breakdown
      };
    });
  }

  saveMonthlyPAndLSnapshot(
    outputPath = path.join(__dirname, '../testdata/monthlyPAndLSnapshot.json')
  ) {
    const snapshot = {
      workbookPath: this.workbookPath,
      sheetName: 'Monthly P&L',
      savedAt: new Date().toISOString(),
      values: this.getMonthlyPAndLValues(),
    };

    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, JSON.stringify(snapshot, null, 2));

    return snapshot;
  }
}

module.exports = ExcelDataPage;