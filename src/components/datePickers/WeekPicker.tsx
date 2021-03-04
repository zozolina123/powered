import DateFnsUtils from '@date-io/date-fns';
import { createStyles, IconButton, Theme, withStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { KeyboardDatePicker } from '@material-ui/pickers';
import clsx from 'clsx';
import { endOfWeek, isSameDay, isWithinInterval, startOfWeek } from 'date-fns/fp';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../wrappers/ReduxWrapper';
import { changeWeek } from './dateSlice';
// import { useDispatch } from 'react-redux';

interface Props {
    onlyPrevDays?: boolean;
    classes: any;
}

function WeekPicker({ onlyPrevDays, classes }: Props): React.ReactElement {
    const todayDate = new Date();
    const DateUtil = new DateFnsUtils();
    const selectedDate = useSelector((state: RootState) => state.date.week);
    const dispatch = useDispatch();

    const handleWeekChange = (date: Date | null) => {
        date && dispatch(changeWeek(startOfWeek(date)));
    };

    const formatWeekSelectLabel = (date: Date | null, invalidLabel: string) => {
        if (!date) date = new Date();
        const dateClone = new Date(date.valueOf());

        return dateClone && DateUtil.isValid(dateClone)
            ? `Week of ${DateUtil.format(startOfWeek(dateClone), 'MMM dd')}`
            : invalidLabel;
    };

    const renderWrappedWeekDay = (date: Date | null, selectedDate: Date | null, dayInCurrentMonth: boolean) => {
        if (!date) date = new Date();
        if (!selectedDate) selectedDate = new Date();
        const dateClone = new Date(date.valueOf());
        const selectedDateClone = new Date(selectedDate.valueOf());

        const start = startOfWeek(selectedDateClone);
        const end = endOfWeek(selectedDateClone);

        const dayIsBetween = isWithinInterval({ start: start, end: end }, dateClone);
        const dayIsInvalidDate =
            DateUtil.isAfter(dateClone, DateUtil.addDays(todayDate, -1)) ||
            DateUtil.isBefore(dateClone, DateUtil.addDays(todayDate, -365));

        const isFirstDay = isSameDay(dateClone, start);
        const isLastDay = isSameDay(dateClone, end);

        const wrapperClassName = clsx({
            [classes.highlight]: dayIsBetween,
            [classes.firstHighlight]: isFirstDay,
            [classes.endHighlight]: isLastDay,
        });

        const dayClassName = clsx(classes.day, {
            [classes.nonCurrentMonthDay]: !dayInCurrentMonth || dayIsInvalidDate,
            [classes.highlightNonCurrentMonthDay]: !dayInCurrentMonth && dayIsBetween,
        });

        return (
            <div>
                <div className={wrapperClassName}>
                    <IconButton className={dayClassName}>
                        <span>{DateUtil.format(dateClone, 'dd')}</span>
                    </IconButton>
                </div>
            </div>
        );
    };

    return (
        <Grid container justify="space-around">
            <KeyboardDatePicker
                minDate={DateUtil.addDays(todayDate, -365)}
                maxDate={onlyPrevDays ? DateUtil.addDays(todayDate, -1) : todayDate}
                autoOk={true}
                onChange={handleWeekChange}
                renderDay={renderWrappedWeekDay}
                labelFunc={formatWeekSelectLabel}
                variant="inline"
                format="dd/MM/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="Date picker inline"
                value={selectedDate}
                KeyboardButtonProps={{
                    'aria-label': 'change date',
                }}
            />
        </Grid>
    );
}

const styles = createStyles((theme: Theme) => ({
    dayWrapper: {
        position: 'relative',
    },
    day: {
        width: 36,
        height: 36,
        fontSize: theme.typography.caption.fontSize,
        margin: '0 2px',
        color: 'inherit',
    },
    customDayHighlight: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: '2px',
        right: '2px',
        border: `1px solid ${theme.palette.secondary.main}`,
        borderRadius: '50%',
    },
    nonCurrentMonthDay: {
        color: theme.palette.text.disabled,
    },
    highlightNonCurrentMonthDay: {
        color: '#676767',
    },
    highlight: {
        background: theme.palette.primary.main,
        color: theme.palette.common.white,
    },
    endHighlight: {
        extend: 'highlight',
        borderTopRightRadius: '50%',
        borderBottomRightRadius: '50%',
    },
    firstHighlight: {
        extend: 'highlight',
        borderTopLeftRadius: '50%',
        borderBottomLeftRadius: '50%',
    },
}));

export default withStyles(styles)(WeekPicker);
