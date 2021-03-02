import { weekArray } from '../../api/ConsumpionDataAPI';
import {
    DATA_LOADED,
    DATA_MONTH_LOADED,
    DATA_OVERVIEW_LOADED,
    DATA_WEEK_LOADED,
    FETCH_DATA,
    FETCH_MONTH_DATA,
    FETCH_OVERVIEW_DATA,
    FETCH_WEEK_DATA,
} from '../actions/consumptionDataActions';
import { APIStatusEnum, IConsumptionDataAction, IConsumptionDataState } from '../ApiInterfaces';

const initialState: IConsumptionDataState = {
    status: APIStatusEnum.IDLE,
    dailyData: {} as number[],
    monthlyData: {} as number[],
    weeklyData: {} as number[],
    overviewData: {} as number[],
};

const consumptionData = (state = initialState, action: IConsumptionDataAction): IConsumptionDataState => {
    switch (action.type) {
        case FETCH_DATA:
            return {
                ...state,
                status: APIStatusEnum.LOADING,
            };
        case FETCH_MONTH_DATA:
            return {
                ...state,
                status: APIStatusEnum.LOADING,
            };
        case FETCH_WEEK_DATA:
            return {
                ...state,
                status: APIStatusEnum.LOADING,
            };
        case FETCH_OVERVIEW_DATA:
            return {
                ...state,
                status: APIStatusEnum.LOADING,
            };
        case DATA_LOADED:
            return {
                ...state,
                dailyData: action.data,
                status: APIStatusEnum.SUCCESS,
            };
        case DATA_OVERVIEW_LOADED:
            const overviewArray = mapOverviewObjectToArray(action.data);
            return {
                ...state,
                overviewData: overviewArray,
                status: APIStatusEnum.SUCCESS,
            };
        case DATA_MONTH_LOADED:
            const formattedMonthData = Object.keys(action.data).map((key) => {
                const dayData: number[] = action.data[key];
                return dayData.reduce((sum, curVal) => sum + curVal);
            });
            return {
                ...state,
                monthlyData: formattedMonthData,
                status: APIStatusEnum.SUCCESS,
            };
        case DATA_WEEK_LOADED:
            const formattedWeekData = Object.keys(action.data).map((key) => {
                const dayData: number[] = action.data[key];
                return dayData.reduce((sum, curVal) => sum + curVal);
            });
            return {
                ...state,
                weeklyData: formattedWeekData,
                status: APIStatusEnum.SUCCESS,
            };
        default:
            return state;
    }
};

function mapOverviewObjectToArray(obj: any) {
    const hourArray: number[] = [];
    const monthArray: number[] = [];
    const dayArray: number[] = [];
    Object.keys(obj.hourData).forEach((key) => {
        hourArray.push(obj.hourData[key]);
    });
    Object.keys(obj.monthData).forEach((key) => {
        monthArray.push(obj.monthData[key]);
    });
    weekArray.forEach((key) => {
        console.log(key);
        dayArray.push(obj.weekData[key]);
    });
    return { hourArray, monthArray, dayArray };
}

export default consumptionData;
