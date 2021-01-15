import { MonthTypes } from '../redux/ApiInterfaces';
import API from './API';
import { dailyConsumptionURL } from './routes';
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
];

class ConsumptionDataAPI {
    fetchDailyConsumptionData = async (date: Date) => {
        const month = monthsArray[date.getMonth()];
        const day = date.getDate();
        const data = await API.get(dailyConsumptionURL(month, day));
        return data;
    };

    fetchMonthlyConsumptionData = async (monthName: MonthTypes) => {
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
}

export default new ConsumptionDataAPI();
