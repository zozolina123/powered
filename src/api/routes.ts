export const baseURL = 'http://localhost:3001';
export const priceDataURL = 'http://localhost:3002';
export const dailyConsumptionURL = (monthName: string, dayNumber: number): string => `/${monthName}/${dayNumber}`;
