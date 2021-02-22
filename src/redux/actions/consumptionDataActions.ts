import ConsumpionDataAPI from '../../api/ConsumpionDataAPI';
import { MonthTypes } from '../ApiInterfaces';

export const FETCH_DATA = 'FETCH_DATA';
export const FETCH_MONTH_DATA = 'FETCH_MONTH_DATA';
export const FETCH_WEEK_DATA = 'FETCH_WEEK_DATA';
export const FETCH_OVERVIEW_DATA = 'FETCH_OVERVIEW_DATA';
export const DATA_LOADED = 'DATA_LOADED';
export const DATA_MONTH_LOADED = 'DATA_MONTH_LOADED';
export const DATA_WEEK_LOADED = 'DATA_WEEK_LOADED';
export const DATA_OVERVIEW_LOADED = 'DATA_OVERVIEW_LOADED';

export function fetchData(date: Date) {
    return async function fetchDataThunk(dispatch: (arg0: { type: string; data?: any }) => void, getState: any) {
        dispatch({ type: FETCH_DATA });
        const response = await ConsumpionDataAPI.fetchDailyConsumptionData(date);
        dispatch({ type: DATA_LOADED, data: response.data });
    };
}
export function fetchMonthData(month: MonthTypes) {
    return async function fetchDataThunk(dispatch: (arg0: { type: string; data?: any }) => void, getState: any) {
        dispatch({ type: FETCH_MONTH_DATA });
        const response = await ConsumpionDataAPI.fetchMonthlyConsumptionData(month);
        dispatch({ type: DATA_MONTH_LOADED, data: response.data });
    };
}

export function fetchWeekData(date: Date) {
    return async function fetchDataThunk(dispatch: (arg0: { type: string; data?: any }) => void, getState: any) {
        dispatch({ type: FETCH_WEEK_DATA });
        const response = await ConsumpionDataAPI.fetchWeeklyConsumptionData(date);
        dispatch({ type: DATA_WEEK_LOADED, data: response.data });
    };
}
export function fetchOverviewData() {
    return async function fetchDataThunk(dispatch: (arg0: { type: string; data?: any }) => void, getState: any) {
        dispatch({ type: FETCH_OVERVIEW_DATA });
        const response = await ConsumpionDataAPI.fetchOverviewConsumptionData();
        dispatch({ type: DATA_OVERVIEW_LOADED, data: response });
    };
}
export default { fetchData };
