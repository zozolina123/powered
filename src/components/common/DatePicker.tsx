import DateFnsUtils from '@date-io/date-fns';
import Grid from '@material-ui/core/Grid';
import { KeyboardDatePicker } from '@material-ui/pickers';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { changeDate } from '../../redux/actions/dateActions';
import { RootState } from '../../redux/reducers';

interface Props {
    onlyPrevDays?: boolean;
}

export default function DatePicker({ onlyPrevDays }: Props): React.ReactElement {
    const todayDate = new Date();
    const selectedDate = useSelector((state: RootState) => state.date.day);
    const DateUtil = new DateFnsUtils();
    const dispatch = useDispatch();

    const handleDateChange = (date: Date | null) => {
        date?.setHours(0, 0, 0, 0);
        date && dispatch(changeDate(date));
    };

    useEffect(() => {
        if (onlyPrevDays && DateUtil.isAfter(selectedDate, DateUtil.addDays(todayDate, -1))) {
            handleDateChange(DateUtil.addDays(todayDate, -1));
        }
    }, []);

    return (
        <Grid container justify="space-around">
            <KeyboardDatePicker
                minDate={DateUtil.addDays(todayDate, -365)}
                maxDate={onlyPrevDays ? DateUtil.addDays(todayDate, -1) : todayDate}
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
