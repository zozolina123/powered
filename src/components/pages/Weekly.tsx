import 'date-fns';

import { Grid } from '@material-ui/core';
import Box from '@material-ui/core/Box/Box';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import WeekPicker from '../datePickers/WeekPicker';
import { DimProvider, withContext } from '../utils/DimContext';
import DocumentTitle from '../utils/DocumentTitle';
import { RootState } from '../wrappers/ReduxWrapper';
import Chart from './Chart';
import { fetchWeeklyData } from './consumptionDataSlice';

function Weekly(): React.ReactElement {
    const [data, setData] = useState({} as number[]);
    const state = useSelector((state: RootState) => state);
    const date = state.date.week;
    const fetchedData = state.consumptionData.weeklyData.data;
    const chartData = state.consumptionData.overviewData.data.week;
    const dispatch = useDispatch();

    useEffect(() => {
        date && dispatch(fetchWeeklyData(date));
        date.setHours(0, 0, 0, 0);
    }, [date]);

    useEffect(() => {
        !(Object.keys(fetchedData).length === 0) && setData(fetchedData);
    }, [fetchedData]);

    return (
        <DimProvider>
            <Box component="div">
                <DocumentTitle title="Daily" />
                <WeekPicker onlyPrevDays={true} />
                <Grid container>
                    <Grid item xs={12} md={8}>
                        <DimProvider>
                            <Chart type={'week'} data={data} date={date} />
                        </DimProvider>
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <DimProvider>
                            <Chart data={chartData || []} date={date} type="week" chartType={'BarChart'} />
                        </DimProvider>
                    </Grid>
                </Grid>
            </Box>
        </DimProvider>
    );
}

export default withContext(Weekly);