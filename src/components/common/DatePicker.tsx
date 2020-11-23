import DateFnsUtils from '@date-io/date-fns';
import Grid from '@material-ui/core/Grid';
import { KeyboardDatePicker } from '@material-ui/pickers';
import React from 'react';

export default function DatePicker() {
    const todayDate = new Date(Date.now());
    const [selectedDate, setSelectedDate] = React.useState<Date | null>(todayDate);
    const DateUtil = new DateFnsUtils();

    const handleDateChange = (date: Date | null) => {
        setSelectedDate(date);
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
