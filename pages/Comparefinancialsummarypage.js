const fs = require('fs');
const path = require('path');

class CompareFinancialSummaryPage {
  constructor(
    excelSnapshotPath = path.join(__dirname, '../testdata/financialSummarySnapshot.json'),
    uiSnapshotPath = path.join(__dirname, '../testdata/testdata/uiFinancialSummarySnapshot.json')
  ) {
    this.excelSnapshot = JSON.parse(fs.readFileSync(excelSnapshotPath, 'utf8'));
    this.uiSnapshot    = JSON.parse(fs.readFileSync(uiSnapshotPath, 'utf8'));
  }

  // ── Normalize value for comparison ────────────────────────────────────────
  normalizeValue(raw) {
    if (raw === null || raw === undefined) return null;

    let value = String(raw).trim();

    if (value === '' || value === '-') return 0;

    // Case 1: Excel negative — ($905,946) or (863,607.92)
    const isParenNegative = value.startsWith('(') && value.endsWith(')');

    // Case 2: UI negative — -$905,946 or -905,946
    const isDashNegative = value.startsWith('-');

    // strip $, commas, parentheses, %, spaces, leading minus
    value = value
      .replace(/\$/g, '')
      .replace(/,/g, '')
      .replace(/\(/g, '')
      .replace(/\)/g, '')
      .replace(/%/g, '')
      .replace(/^-/, '')   // remove leading minus (we track it separately)
      .trim();

    const num = parseFloat(value);

    if (isNaN(num)) return value.toLowerCase();

    // apply negative if either format detected
    const signed = (isParenNegative || isDashNegative) ? -Math.abs(num) : num;

    // round to whole number — ignores decimal differences
    return Math.round(signed);
  }

  // ── Determine status ───────────────────────────────────────────────────────
  getStatus(normalizedExcel, normalizedUi) {
    if (typeof normalizedExcel === 'string' && typeof normalizedUi === 'string') {
      return normalizedExcel === normalizedUi ? 'MATCHED' : 'MISMATCHED';
    }

    const diff = Math.abs(Number(normalizedExcel) - Number(normalizedUi));

    if (diff === 0)  return 'MATCHED';
    if (diff <= 0.9) return 'ROUNDOFF';
    return 'MISMATCHED';
  }

  // ── Compare both snapshots ─────────────────────────────────────────────────
  compare() {
    const excelMap = {};
    for (const item of this.excelSnapshot.values) {
      excelMap[item.key] = item;
    }

    const uiMap = {};
    for (const item of this.uiSnapshot.values) {
      uiMap[item.key] = item;
    }

    const results = [];
    const allKeys = new Set([
      ...Object.keys(excelMap),
      ...Object.keys(uiMap),
    ]);

    for (const key of allKeys) {
      const excelItem = excelMap[key];
      const uiItem    = uiMap[key];

      const excelValue = excelItem?.value ?? '';
      const uiValue    = uiItem?.value    ?? '';

      const normalizedExcel = this.normalizeValue(excelValue);
      const normalizedUi    = this.normalizeValue(uiValue);

      let status;
      let note = '';

      if (!excelItem) {
        status = 'MISSING_IN_EXCEL';
      } else if (!uiItem) {
        status = 'MISSING_IN_UI';
      } else {
        status = this.getStatus(normalizedExcel, normalizedUi);

        if (status === 'ROUNDOFF') {
          const diff = Math.abs(Number(normalizedExcel) - Number(normalizedUi));
          note = `Roundoff difference: ${diff.toFixed(2)}`;
        }
      }

      results.push({
        key,
        fieldName:      excelItem?.fieldName ?? uiItem?.fieldName ?? key,
        excelValue,
        uiValue,
        normalizedExcel,
        normalizedUi,
        status,
        note,
      });
    }

    // sort — MISMATCHED first, then MISSING, then ROUNDOFF, then MATCHED
    results.sort((a, b) => {
      const order = {
        MISMATCHED:       0,
        MISSING_IN_EXCEL: 1,
        MISSING_IN_UI:    2,
        ROUNDOFF:         3,
        MATCHED:          4,
      };
      return order[a.status] - order[b.status];
    });

    return results;
  }

  // ── Save comparison report ─────────────────────────────────────────────────
  saveComparisonReport(
    outputPath = path.join(__dirname, '../testdata/financialSummaryComparisonReport.json')
  ) {
    const results = this.compare();

    const matched        = results.filter(r => r.status === 'MATCHED').length;
    const mismatched     = results.filter(r => r.status === 'MISMATCHED').length;
    const roundoff       = results.filter(r => r.status === 'ROUNDOFF').length;
    const missingInExcel = results.filter(r => r.status === 'MISSING_IN_EXCEL').length;
    const missingInUi    = results.filter(r => r.status === 'MISSING_IN_UI').length;

    const report = {
      comparedAt:  new Date().toISOString(),
      excelSource: this.excelSnapshot.workbookPath,
      uiSource:    this.uiSnapshot.mappedAt,
      summary: {
        total: results.length,
        matched,
        mismatched,
        roundoff,
        missingInExcel,
        missingInUi,
      },
      results,
    };

    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, JSON.stringify(report, null, 2));

    // console summary
    console.log('\n── Financial Summary Comparison ────────────────────');
    console.log(`  Total            : ${results.length}`);
    console.log(`  ✅ Matched        : ${matched}`);
    console.log(`  ❌ Mismatched     : ${mismatched}`);
    console.log(`  🔄 Roundoff       : ${roundoff}`);
    console.log(`  ⚠️  Missing Excel  : ${missingInExcel}`);
    console.log(`  ⚠️  Missing UI     : ${missingInUi}`);
    console.log('────────────────────────────────────────────────────');

    if (mismatched > 0) {
      console.log('\nMismatched fields:');
      results
        .filter(r => r.status === 'MISMATCHED')
        .forEach(r => {
          console.log(`  ❌ ${r.fieldName}`);
          console.log(`     Excel : ${r.excelValue} (normalized: ${r.normalizedExcel})`);
          console.log(`     UI    : ${r.uiValue} (normalized: ${r.normalizedUi})`);
        });
    }

    if (roundoff > 0) {
      console.log('\nRoundoff fields (treated as matched):');
      results
        .filter(r => r.status === 'ROUNDOFF')
        .forEach(r => {
          console.log(`  🔄 ${r.fieldName} | Excel: ${r.excelValue} | UI: ${r.uiValue} | ${r.note}`);
        });
    }

    console.log(`\nReport saved → ${outputPath}`);

    return report;
  }
}

module.exports = CompareFinancialSummaryPage;