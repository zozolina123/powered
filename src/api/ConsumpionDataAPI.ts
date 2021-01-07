import API from './API';
import { dailyConsumptionURL } from './routes';
const monthsArray = [
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

    fetchMonthlyConsumptionData = async (date: Date) => {
        const data = await API.get('/');
        return data;
    };

    fetchYearlyConsumptionData = async (date: Date) => {
        const data = await API.get('/');
        return data;
    };
}

export default new ConsumptionDataAPI();
