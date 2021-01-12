import { DATA_LOADED, DATA_MONTH_LOADED, FETCH_DATA, FETCH_MONTH_DATA } from '../actions/consumptionDataActions';
import { APIStatusEnum, IConsumptionDataAction, IConsumptionDataState } from '../ApiInterfaces';

const initialState: IConsumptionDataState = {
    status: APIStatusEnum.IDLE,
    dailyData: {} as number[],
    monthlyData: {} as number[],
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
        default:
            return state;
    }
};

export default consumptionData;
