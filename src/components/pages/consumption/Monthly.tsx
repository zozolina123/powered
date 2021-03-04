import 'date-fns';

import { Grid } from '@material-ui/core';
import Box from '@material-ui/core/Box/Box';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ConsumpionDataAPI, { monthsArray } from '../../../api/ConsumpionDataAPI';
import Card from '../../datePickers/ConsumptionCard';
import MonthPicker from '../../datePickers/MonthPicker';
import OverviewCard from '../../datePickers/OverviewCard';
import { DimProvider, withContext } from '../../utils/DimContext';
import DocumentTitle from '../../utils/DocumentTitle';
import { RootState } from '../../wrappers/ReduxWrapper';
import Chart from './ConsumptionChart';
import { fetchMonthlyData, monthlyDataLoaded } from './consumptionDataSlice';

function Monthly(): React.ReactElement {
    const [data, setData] = useState<number[]>([]);
    const [date, setDate] = useState(new Date());
    const state = useSelector((state: RootState) => state);
    const month = state.date.month;
    const fetchedData = state.consumptionData.monthlyData.data;
    const chartData = state.consumptionData.overviewData.data.month;
    const dispatch = useDispatch();

    useEffect(() => {
        const dateClone = new Date(date.valueOf());
        dateClone.setMonth(monthsArray.indexOf(month));
        dateClone.setDate(1);
        dateClone.setHours(0, 0, 0, 0);
        setDate(dateClone);
        dispatch(fetchMonthlyData());
        ConsumpionDataAPI.fetchMonthlyConsumptionData(month).then((res) => dispatch(monthlyDataLoaded(res)));
    }, [month]);

    useEffect(() => {
        !(Object.keys(fetchedData).length === 0) && setData(fetchedData);
    }, [fetchedData]);

    return (
        <DimProvider>
            <Box component="div">
                <DocumentTitle title="Page.monthly" />
                <MonthPicker />
                <Grid container>
                    <Grid item xs={12} md={8}>
                        <DimProvider>
                            <Chart data={data} date={date} type="month" />
                        </DimProvider>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Card data={data} />
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <DimProvider>
                            <Chart data={chartData || []} date={date} type="month" chartType={'BarChart'} />
                        </DimProvider>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <OverviewCard data={chartData || []} type="month" />
                    </Grid>
                </Grid>
            </Box>
        </DimProvider>
    );
}

export default withContext(Monthly);
