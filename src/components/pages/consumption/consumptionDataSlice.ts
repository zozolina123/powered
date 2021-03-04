import { createSlice } from '@reduxjs/toolkit';

import { DayName, HourName, MonthName, weekArray } from '../../../api/ConsumpionDataAPI';
import { APIStatusEnum } from '../../../redux/ApiInterfaces';
import { RootState } from '../../wrappers/ReduxWrapper';

type TData = {
    status: APIStatusEnum;
    data: number[];
};

type DayMap = { [key in DayName]: number };
type HourMap = { [key in HourName]: number };
type MonthMap = { [key in MonthName]: number };

type OverviewObject = {
    weekData: DayMap;
    hourData: HourMap;
    monthData: MonthMap;
};

type OverViewData = {
    status: APIStatusEnum;
    data: {
        week: number[];
        day: number[];
        month: number[];
    };
};

type ConsumptionDataState = {
    dailyData: TData;
    monthlyData: TData;
    weeklyData: TData;
    overviewData: OverViewData;
};

const initialState: ConsumptionDataState = {
    dailyData: {
        status: APIStatusEnum.IDLE,
        data: [],
    },
    monthlyData: {
        status: APIStatusEnum.IDLE,
        data: [],
    },
    weeklyData: {
        status: APIStatusEnum.IDLE,
        data: [],
    },
    overviewData: {
        status: APIStatusEnum.IDLE,
        data: {
            week: [],
            day: [],
            month: [],
        },
    },
};

const consumptionDataSlice = createSlice({
    name: 'consumptionData',
    initialState,
    reducers: {
        fetchDailyData: (state) => {
            state.dailyData.status = APIStatusEnum.LOADING;
        },
        dailyDataLoaded: (state, action) => {
            state.dailyData.status = APIStatusEnum.SUCCESS;
            state.dailyData.data = action.payload.data;
        },
        fetchWeeklyData: (state) => {
            state.weeklyData.status = APIStatusEnum.LOADING;
        },
        weeklyDataLoaded: (state, action) => {
            state.weeklyData.status = APIStatusEnum.SUCCESS;
            state.weeklyData.data = mapObjectToArray(action.payload.data);
        },
        fetchMonthlyData: (state) => {
            state.weeklyData.status = APIStatusEnum.LOADING;
        },
        monthlyDataLoaded: (state, action) => {
            state.monthlyData.status = APIStatusEnum.SUCCESS;
            state.monthlyData.data = mapObjectToArray(action.payload.data);
        },
        fetchOverviewData: (state) => {
            state.overviewData.status = APIStatusEnum.LOADING;
        },
        overviewDataLoaded: (state, action) => {
            const data = mapOverviewObjectToArray(action.payload);
            state.overviewData.status = APIStatusEnum.SUCCESS;
            state.overviewData.data.day = data.hourArray;
            state.overviewData.data.week = data.dayArray;
            state.overviewData.data.month = data.monthArray;
        },
    },
});

export function mapOverviewObjectToArray({ hourData, monthData, weekData }: OverviewObject) {
    const hourArray: number[] = [];
    const monthArray: number[] = [];
    const dayArray: number[] = [];

    Object.keys(hourData).forEach((key) => {
        hourArray.push(hourData[key]);
    });
    Object.keys(monthData).forEach((key) => {
        monthArray.push(monthData[key]);
    });
    weekArray.forEach((key) => {
        dayArray.push(weekData[key]);
    });
    return { hourArray, monthArray, dayArray };
}

export function mapObjectToArray(obj: { [key: string]: number[] }): number[] {
    return Object.keys(obj).map((key) => {
        const dayData: number[] = obj[key];
        return dayData.reduce((sum, curVal) => sum + curVal);
    });
}

export const selectConsumptionData = (state: RootState) => state.consumptionData;

export const {
    fetchDailyData,
    dailyDataLoaded,
    fetchWeeklyData,
    weeklyDataLoaded,
    fetchMonthlyData,
    monthlyDataLoaded,
    fetchOverviewData,
    overviewDataLoaded,
} = consumptionDataSlice.actions;
export default consumptionDataSlice.reducer;
