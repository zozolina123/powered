import { DATA_LOADED, FETCH_DATA } from '../actions/consumptionDataActions';
import { APIStatusEnum, IConsumptionDataAction, IConsumptionDataState } from '../ApiInterfaces';

const initialState: IConsumptionDataState = {
    status: APIStatusEnum.IDLE,
    data: {} as number[],
};

const consumptionData = (state = initialState, action: IConsumptionDataAction): IConsumptionDataState => {
    switch (action.type) {
        case FETCH_DATA:
            return {
                ...state,
                status: APIStatusEnum.LOADING,
            };
        case DATA_LOADED:
            return {
                data: action.data,
                status: APIStatusEnum.SUCCESS,
            };
        default:
            return state;
    }
};

export default consumptionData;
