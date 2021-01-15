import {
    DATA_LOADED,
    DATA_MONTH_LOADED,
    DATA_WEEK_LOADED,
    FETCH_DATA,
    FETCH_MONTH_DATA,
    FETCH_WEEK_DATA,
} from '../actions/consumptionDataActions';
import { APIStatusEnum, IConsumptionDataAction, IConsumptionDataState } from '../ApiInterfaces';

const initialState: IConsumptionDataState = {
    status: APIStatusEnum.IDLE,
    dailyData: {} as number[],
    monthlyData: {} as number[],
    weeklyData: {} as number[],
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
        case DATA_LOADED:
            return {
                ...state,
                dailyData: action.data,
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

export default consumptionData;
