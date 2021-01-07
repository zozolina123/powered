import DateFnsUtils from '@date-io/date-fns';
import Grid from '@material-ui/core/Grid';
import { KeyboardDatePicker } from '@material-ui/pickers';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { changeDate } from '../../redux/actions/dateActions';
import { RootState } from '../../redux/reducers';

export default function DatePicker() {
    const todayDate = new Date();
    const selectedDate = useSelector((state: RootState) => state.date);
    const DateUtil = new DateFnsUtils();
    const dispatch = useDispatch();

    const handleDateChange = (date: Date | null) => {
        date && dispatch(changeDate(date));
    };

    return (
        <Grid container justify="space-around">
            <KeyboardDatePicker
                minDate={DateUtil.addDays(todayDate, -365)}
                maxDate={todayDate}
                autoOk={true}
                disableToolbar
                variant="inline"
                format="dd/MM/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="Date picker inline"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                    'aria-label': 'change date',
                }}
            />
        </Grid>
    );
}
