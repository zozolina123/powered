import ConsumpionDataAPI from '../../api/ConsumpionDataAPI';

export const FETCH_DATA = 'FETCH_DATA';
export const DATA_LOADED = 'DATA_LOADED';

export function fetchData(date: Date) {
    return async function fetchDataThunk(dispatch: (arg0: { type: string; data?: any }) => void, getState: any) {
        dispatch({ type: FETCH_DATA });
        const response = await ConsumpionDataAPI.fetchDailyConsumptionData(date);
        dispatch({ type: DATA_LOADED, data: response.data });
    };
}
export default { fetchData };
