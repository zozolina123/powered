import Grid from '@material-ui/core/Grid';
import { KeyboardDatePicker } from '@material-ui/pickers';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { monthsArray } from '../../api/ConsumpionDataAPI';
import { isOfTypeMonth } from '../../redux/ApiInterfaces';
import { RootState } from '../wrappers/ReduxWrapper';
import { changeMonth } from './dateSlice';

export default function MonthPicker(): React.ReactElement {
    const todayDate = new Date();
    todayDate.setDate(1);
    todayDate.setHours(0, 0, 0, 0);
    const [selectedDate, setSelectedDate] = useState(todayDate);
    const month = useSelector((state: RootState) => state.date.month);
    const dispatch = useDispatch();

    const formatWeekSelectLabel = () => {
        return month;
    };

    useEffect(() => {
        const dateClone = new Date(selectedDate.valueOf());
        dateClone.setMonth(monthsArray.indexOf(month));
        setSelectedDate(dateClone);
    }, [month]);

    const handleMonthChange = (date: Date | null) => {
        const monthName = date?.toLocaleString('default', { month: 'long' });
        if (monthName && isOfTypeMonth(monthName)) {
            dispatch(changeMonth(monthName));
        }
    };

    return (
        <Grid container justify="space-around">
            <KeyboardDatePicker
                autoOk={true}
                disableToolbar
                variant="inline"
                views={['month']}
                format="dd/MM/yyyy"
                labelFunc={formatWeekSelectLabel}
                margin="normal"
                id="date-picker-inline"
                label="Date picker inline"
                value={selectedDate}
                onChange={handleMonthChange}
                KeyboardButtonProps={{
                    'aria-label': 'change month',
                }}
            />
        </Grid>
    );
}
