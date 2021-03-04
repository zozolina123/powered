import { createSlice } from '@reduxjs/toolkit';

import { APIStatusEnum, IPrice, IPriceDataState } from '../ApiInterfaces';

const initialState: IPriceDataState = {
    status: APIStatusEnum.IDLE,
    data: [] as IPrice[],
};

const priceDataSlice = createSlice({
    name: 'priceData',
    initialState,
    reducers: {
        fetchPriceData: (state) => {
            state.status = APIStatusEnum.LOADING;
        },
        priceDataLoaded: (state, action) => {
            state.status = APIStatusEnum.SUCCESS;
            state.data = action.payload.data;
        },
    },
});
export const { fetchPriceData, priceDataLoaded } = priceDataSlice.actions;
export default priceDataSlice.reducer;
