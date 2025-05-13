export const priceFilter = [
  { min: 0, max: 25000, label: '0~25,000원' },
  { min: 25000, max: 50000, label: '25,000~50,000원' },
  { min: 50000, max: 100000, label: '50,000~100,000원' },
  { min: 100000, max: Infinity, label: '100,000원 이상' },
] as const
