import { MonthTypes } from '../ApiInterfaces';

export const CHANGE_DATE = 'CHANGE_DATE';
export const CHANGE_MONTH = 'CHANGE_MONTH';
export const CHANGE_WEEK = 'CHANGE_WEEK';

export const changeDate = (date: Date | undefined) => {
    return {
        type: CHANGE_DATE,
        date: date,
    };
};

export const changeMonth = (month: MonthTypes) => {
    return {
        type: CHANGE_MONTH,
        month: month,
    };
};

export const changeWeek = (week: Date) => {
    return {
        type: CHANGE_WEEK,
        week: week,
    };
};

export default { changeDate };