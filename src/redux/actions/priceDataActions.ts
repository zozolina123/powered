import PriceDataAPI from '../../api/PriceDataAPI';

export const FETCH_PRICE_DATA = 'FETCH_PRICE_DATA';
export const PRICE_DATA_LOADED = 'PRICE_DATA_LOADED';

export function fetchPriceData() {
    return async function fetchDataThunk(dispatch: (arg0: { type: string; data?: any }) => void, getState: any) {
        dispatch({ type: FETCH_PRICE_DATA });
        const response = await PriceDataAPI.fetchPriceData();
        dispatch({ type: PRICE_DATA_LOADED, data: response.data });
    };
}
