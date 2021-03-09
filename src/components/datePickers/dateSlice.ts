import DateFnsUtils from '@date-io/date-fns';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { MonthName } from '../../api/ConsumpionDataAPI';
import { IDateState, isOfTypeMonth } from '../../redux/ApiInterfaces';

const todayDate = new Date();
const monthName = todayDate.toLocaleString('default', { month: 'long' });
const DateUtil = new DateFnsUtils();

const initialState: IDateState = {
    day: todayDate,
    month: isOfTypeMonth(monthName) ? monthName : 'January',
    week: DateUtil.addDays(todayDate, -7),
};

const dateSlice = createSlice({
    name: 'date',
    initialState,
    reducers: {
        changeDate: (state, { payload }: PayloadAction<Date>) => {
            state.day = payload;
        },
        changeMonth: (state, { payload }: PayloadAction<MonthName>) => {
            state.month = payload;
        },
        changeWeek: (state, { payload }: PayloadAction<Date>) => {
            state.week = payload;
        },
    },
});

export const { changeDate, changeMonth, changeWeek } = dateSlice.actions;
export default dateSlice.reducer;
