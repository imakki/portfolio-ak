// Synthetic mock data for Loan Portfolio Dashboard
// All figures are representative of a mid-size consumer lending book

export const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

// Monthly loan origination volume ($ millions), trailing 12 months
export const originationVolume = {
  labels: MONTHS,
  values: [142.3, 128.7, 155.1, 163.4, 171.8, 189.2, 201.5, 194.7, 218.3, 226.1, 241.8, 258.4],
};

// Delinquency rate (%) by loan category - 30+ days past due
export const delinquencyByCategory = {
  labels: ['Auto', 'Mortgage', 'Personal', 'HELOC', 'Student'],
  values: [3.2, 1.8, 6.7, 2.4, 4.1],
};

// Portfolio composition by risk tier (% of total outstanding balance)
export const riskTierComposition = {
  labels: ['Prime (720+)', 'Near-Prime (660-719)', 'Subprime (<660)'],
  values: [54, 31, 15],
};

// Summary KPIs
export const summaryStats = {
  totalPortfolioValue: '$4.82B',
  avgInterestRate: '11.4%',
  onTimePaymentRate: '94.7%',
  activeBorrowers: '187,430',
};

// Month-over-month data for sparkline context
export const yoyGrowth = '+18.3%';
export const delinquencyTrend = '-0.4pp'; // percentage points vs prior year
