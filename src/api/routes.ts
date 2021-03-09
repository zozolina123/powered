export const baseURL = 'https://serban-licenta-data.herokuapp.com/';
export const priceDataURL = 'https://serban-anre-scrapper.herokuapp.com/';
export const dailyConsumptionURL = (monthName: string, dayNumber: number): string => `/${monthName}/${dayNumber}`;
