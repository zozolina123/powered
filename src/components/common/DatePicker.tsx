import DateFnsUtils from '@date-io/date-fns';
import { Box } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { DatePicker } from '@material-ui/pickers';
import React, { useEffect } from 'react';

interface Props {
    onChange: (date: Date) => void;
}

export default function CustomDatePicker({ onChange }: Props): React.ReactElement {
    const todayDate = new Date(Date.now());
    const [selectedDate, setSelectedDate] = React.useState<Date | null>(todayDate);
    const DateUtil = new DateFnsUtils();

    useEffect(() => {
        selectedDate && onChange(selectedDate);
    }, [selectedDate]);

    const handleDateChange = (date: Date | null) => {
        if (selectedDate !== date) setSelectedDate(date);
    };

    interface Props {
        value: string;
        onClick: () => void;
    }

    return (
        <Grid container justify="space-around">
            <Box width="125px">
                <DatePicker
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
                />
            </Box>
        </Grid>
    );
}
