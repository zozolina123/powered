import { FETCH_PRICE_DATA, PRICE_DATA_LOADED } from '../actions/priceDataActions';
import { APIStatusEnum, IPriceDataAction, IPriceDataState } from '../ApiInterfaces';

const initialState: IPriceDataState = {
    status: APIStatusEnum.IDLE,
    data: [],
};

const priceData = (state = initialState, action: IPriceDataAction): IPriceDataState => {
    switch (action.type) {
        case FETCH_PRICE_DATA:
            return {
                ...state,
                status: APIStatusEnum.LOADING,
            };
        case PRICE_DATA_LOADED:
            return {
                ...state,
                data: action?.data || [],
                status: APIStatusEnum.SUCCESS,
            };
        default:
            return state;
    }
};

export default priceData;
