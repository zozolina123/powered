import 'date-fns';

import { Grid } from '@material-ui/core';
import Box from '@material-ui/core/Box/Box';
import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';

import ConsumpionDataAPI from '../../../api/ConsumpionDataAPI';
import Card from '../../datePickers/ConsumptionCard';
import OverviewCard from '../../datePickers/OverviewCard';
import WeekPicker from '../../datePickers/WeekPicker';
import { DimProvider, withContext } from '../../utils/DimContext';
import DocumentTitle from '../../utils/DocumentTitle';
import { RootState } from '../../wrappers/ReduxWrapper';
import Chart from './ConsumptionChart';
import { fetchWeeklyData, weeklyDataLoaded } from './consumptionDataSlice';

function Weekly(): React.ReactElement {
    const [data, setData] = useState<number[]>([]);
    const state = useSelector((state: RootState) => state);
    const date = state.date.week;
    const fetchedData = state.consumptionData.weeklyData.data;
    const chartData = state.consumptionData.overviewData.data.week;
    const dispatch = useDispatch();
    const intl = useIntl();
    const labelTextLine = {
        xLabel: intl.formatMessage({ id: 'Chart.date' }),
        yLabel: intl.formatMessage({ id: 'Chart.consumptionKW' }),
    };

    const labelTextBar = {
        xLabel: intl.formatMessage({ id: 'Chart.day' }),
        yLabel: intl.formatMessage({ id: 'Chart.consumptionKW' }),
    };

    useEffect(() => {
        dispatch(fetchWeeklyData());
        ConsumpionDataAPI.fetchWeeklyConsumptionData(date).then((res) => dispatch(weeklyDataLoaded(res)));
        date.setHours(0, 0, 0, 0);
    }, [date]);

    useEffect(() => {
        !(Object.keys(fetchedData).length === 0) && setData(fetchedData);
    }, [fetchedData]);

    return (
        <DimProvider>
            <Box component="div">
                <DocumentTitle title="Page.weekly" />
                <WeekPicker onlyPrevDays={true} />
                <Grid container>
                    <Grid item xs={12} md={8}>
                        <DimProvider>
                            <Chart
                                type={'week'}
                                data={data}
                                date={date}
                                labelText={labelTextLine}
                                locale={intl.locale}
                            />
                        </DimProvider>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Card data={data} />
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <DimProvider>
                            <Chart
                                data={chartData || []}
                                date={date}
                                type="week"
                                chartType={'BarChart'}
                                labelText={labelTextBar}
                                locale={intl.locale}
                            />
                        </DimProvider>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <OverviewCard data={chartData || []} type="week" />
                    </Grid>
                </Grid>
            </Box>
        </DimProvider>
    );
}

export default withContext(Weekly);
