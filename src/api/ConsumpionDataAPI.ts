import API from './API';
import { dailyConsumptionURL } from './routes';

export const weekArray = ['Sunday', 'Monday', 'Thursday', 'Wednesday', 'Tuesday', 'Friday', 'Saturday'] as const;
export type DayName = typeof weekArray[number];

export const dayArray: string[] = [];
for (let i = 0; i < 24; i++) {
    const prefix = i < 10 ? '0' : '';
    dayArray.push(prefix + i + ':00');
}

export type HourName = typeof dayArray[number];

export const monthsArray = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
] as const;

export type MonthName = typeof monthsArray[number];

class ConsumptionDataAPI {
    fetchDailyConsumptionData = async (date: Date) => {
        const month = monthsArray[date.getMonth()];
        const day = date.getDate();
        const data = await API.get(dailyConsumptionURL(month, day));
        return data;
    };

    fetchMonthlyConsumptionData = async (monthName: MonthName) => {
        const data = await API.get(`/month/${monthName}`);
        return data;
    };

    fetchWeeklyConsumptionData = async (date: Date) => {
        const data = await API.get(`/week/${monthsArray[date.getMonth()]}/${date.getDate()}`);
        return data;
    };

    fetchYearlyConsumptionData = async (date: Date) => {
        const data = await API.get('/');
        return data;
    };

    fetchOverviewConsumptionData = async () => {
        const weekData = API.get(`/overview/day`);
        const hourData = API.get(`/overview/hour`);
        const monthData = API.get(`/overview/month`);
        return {
            weekData: (await weekData).data,
            hourData: (await hourData).data,
            monthData: (await monthData).data,
        };
    };
}

export default new ConsumptionDataAPI();
