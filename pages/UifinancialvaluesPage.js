



const UI_FINANCIAL_FIELDS = [

// Revenue / Financial
{ key: 'contractRevenue', fieldName: 'Contract Revenue', occurrence: 1 },
{ key: 'revenueTotal', fieldName: 'Total Revenue', occurrence: 1 },
{ key: 'laborRevenue', fieldName: 'Labor Revenue', occurrence: 1 },
{ key: 'billableExpensePassThrough', fieldName: 'Billable Expense Pass Through', occurrence: 1 },
{ key: 'fees', fieldName: 'Fee', occurrence: 1 },
{ key: 'feesAtRisk', fieldName: 'Fee at Risk', occurrence: 1 },
{ key: 'implementationFees', fieldName: 'Implementation Fee', occurrence: 1 },
{ key: 'managementFees', fieldName: 'Management Fee', occurrence: 1 },
{ key: 'volumeDiscount', fieldName: 'Volume Discount', occurrence: 1 },
{ key: 'earlyPayDiscount', fieldName: 'Early Pay Discount', occurrence: 1 },
{ key: 'innovationFunds', fieldName: 'Innovation Fund', occurrence: 1 },

// Labor Structure
{ key: 'externalDirectLaborOnshore', fieldName: 'External Direct Labor - Onshore', occurrence: 1 },
{ key: 'externalProjectOhOnshore', fieldName: 'External Project OH - Onshore', occurrence: 1 },
{ key: 'externalDirectLaborOffshore', fieldName: 'External Direct Labor - Offshore', occurrence: 1 },
{ key: 'externalProjectOhOffshore', fieldName: 'External Project OH - Offshore', occurrence: 1 },
{ key: 'internalDirectLaborOnshore', fieldName: 'Internal Direct Labor - Onshore', occurrence: 1 },
{ key: 'internalProjectOhOnshore', fieldName: 'Internal Project OH - Onshore', occurrence: 1 },
{ key: 'laborStructureTotal', fieldName: 'Total Labor Structure', occurrence: 1 },

// Labor Costs
{ key: 'consultantSalariesAndWages', fieldName: 'Consultant Salaries and Wages', occurrence: 1 },
{ key: 'consultantPayrollTaxes', fieldName: 'Consultant Payroll Taxes', occurrence: 1 },
{ key: 'consultantBonuses', fieldName: 'Consultant Bonuses', occurrence: 1 },
{ key: 'workersCompInsurance', fieldName: 'Workers Comp Insurance', occurrence: 1 },
{ key: 'clinicalInsurance', fieldName: 'Clinical Insurance', occurrence: 1 },
{ key: 'medicalBenefits', fieldName: 'Medical Benefits', occurrence: 1 },
{ key: 'acaSubsidies', fieldName: 'ACA Subsides', occurrence: 1 },
{ key: 'internalPmPcSalariesAndWages', fieldName: 'Internal PM/PC Salaries and Wages', occurrence: 1 },
{ key: 'internalPayrollTaxesOnPmPcSalariesAndWages', fieldName: 'Internal Payroll Taxes on PM/PC Salaries and Wages', occurrence: 1 },
{ key: 'laborCostsTotal', fieldName: 'Total Labor Costs', occurrence: 1 },

// Project Costs
{ key: 'facilityRentExpense', fieldName: 'Facility Rent Expense', occurrence: 1 },
{ key: 'capitalFacilityExpenses', fieldName: 'Capital Facility Expense', occurrence: 1 },
{ key: 'equipmentExpense', fieldName: 'Equipment Expense', occurrence: 1 },
{ key: 'softwareExpense', fieldName: 'Software Expense', occurrence: 1 },
{ key: 'morale', fieldName: 'Morale', occurrence: 1 },
{ key: 'travel', fieldName: 'Travel', occurrence: 1 },
{ key: 'vendorExpenses', fieldName: 'Vendor Expenses', occurrence: 1 },
{ key: 'workingCapitalFinanceCost', fieldName: 'Working Capital Finance Cost', occurrence: 1 },
{ key: 'otherCosts', fieldName: 'Other Costs', occurrence: 1 },
{ key: 'fxCosts', fieldName: 'FX Costs', occurrence: 1 },
{ key: 'licensingAndCertification', fieldName: 'Licensing/Certification', occurrence: 1 },
{ key: 'projectCostsTotal', fieldName: 'Total Project Costs', occurrence: 1 },

// Key Metrics
{ key: 'averageDiscount', fieldName: 'Average Discount', occurrence: 1 },
{ key: 'maxHeadcount', fieldName: 'Max Headcount', occurrence: 1 },
{ key: 'headcountNoStandardListPrice', fieldName: 'Headcount No Standard List Price', occurrence: 1 },
{ key: 'averageBillRate', fieldName: 'Average Bill Rate', occurrence: 1 },
{ key: 'discountRate', fieldName: 'Discount Rate', occurrence: 1 },
{ key: 'projectValue', fieldName: 'Project Value', occurrence: 1 },
{ key: 'irr', fieldName: 'IRR', occurrence: 1 },

// Profit & Performance
{ key: 'topFullyLoadedGrossProfit', fieldName: 'Fully Loaded Gross Profit', occurrence: 1 },
{ key: 'topReportedDirectGrossProfit', fieldName: 'Reported Gross Profit', occurrence: 1 },
{ key: 'topFullyLoadedGrossProfitPercent', fieldName: 'Gross Margin (%)', occurrence: 1 },

// Compensation
{ key: 'compensationCostTotal', fieldName: 'Compensation Cost', occurrence: 1 },
{ key: 'estimatedCommissions', fieldName: 'Estimated Commissions', occurrence: 1 },
{ key: 'commissionPayrollTaxes', fieldName: 'Commission Payroll Taxes', occurrence: 1 },

// Uncomment only if UI displays this separately
// { key: 'totalCompensationCost', fieldName: 'Total Compensation Cost', occurrence: 1 },

// EVA
{ key: 'eva', fieldName: 'EVA Value:', occurrence: 1 },
{ key: 'evaPercent', fieldName: 'EVA %:', occurrence: 1 }

];

module.exports = UI_FINANCIAL_FIELDS;
