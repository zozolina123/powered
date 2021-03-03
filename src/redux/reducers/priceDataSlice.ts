import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import PriceDataAPI from '../../api/PriceDataAPI';
import { APIStatusEnum, IPrice, IPriceDataState } from '../ApiInterfaces';

const initialState: IPriceDataState = {
    status: APIStatusEnum.IDLE,
    data: [] as IPrice[],
};

export const fetchPriceData = createAsyncThunk('priceData/fetchPriceData', async () => {
    return await PriceDataAPI.fetchPriceData();
});

const priceDataSlice = createSlice({
    name: 'priceData',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPriceData.fulfilled, (state, action) => {
                state.status = APIStatusEnum.SUCCESS;
                state.data = action.payload.data;
            })
            .addCase(fetchPriceData.pending, (state) => {
                state.status = APIStatusEnum.LOADING;
            });
    },
});

export default priceDataSlice.reducer;
