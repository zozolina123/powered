import 'date-fns';

import { Grid } from '@material-ui/core';
import Box from '@material-ui/core/Box/Box';
import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';

import ConsumpionDataAPI from '../../../api/ConsumpionDataAPI';
import Card from '../../datePickers/ConsumptionCard';
import DatePicker from '../../datePickers/DatePicker';
import OverviewCard from '../../datePickers/OverviewCard';
import { DimProvider, withContext } from '../../utils/DimContext';
import DocumentTitle from '../../utils/DocumentTitle';
import { RootState } from '../../wrappers/ReduxWrapper';
import Chart from './ConsumptionChart';
import { dailyDataLoaded, fetchDailyData } from './consumptionDataSlice';

function Daily(): React.ReactElement {
    const [data, setData] = useState<number[]>([]);
    const state = useSelector((state: RootState) => state);
    const date = state.date.day;
    const fetchedData = state.consumptionData.dailyData.data;
    const chartData = state.consumptionData.overviewData.data.day;
    const intl = useIntl();
    const labelTextLine = {
        xLabel: intl.formatMessage({ id: 'Chart.hour' }),
        yLabel: intl.formatMessage({ id: 'Chart.consumptionKW' }),
    };
    const labelTextBar = {
        xLabel: intl.formatMessage({ id: 'Chart.hour' }),
        yLabel: intl.formatMessage({ id: 'Chart.day' }),
    };
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchDailyData());
        ConsumpionDataAPI.fetchDailyConsumptionData(date).then((res) => dispatch(dailyDataLoaded(res)));
    }, [date]);

    useEffect(() => {
        !(Object.keys(fetchedData).length === 0) && setData(fetchedData);
    }, [fetchedData]);

    return (
        <DimProvider>
            <Box component="div">
                <DocumentTitle title="Page.daily" />
                <DatePicker onlyPrevDays={true} />
                <Grid container>
                    <Grid item xs={12} md={8}>
                        <DimProvider>
                            <Chart labelText={labelTextLine} data={data} date={date} locale={intl.locale} />
                        </DimProvider>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Card data={data} />
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <DimProvider>
                            <Chart
                                labelText={labelTextBar}
                                data={chartData || []}
                                date={date}
                                type="day"
                                chartType={'BarChart'}
                                locale={intl.locale}
                            />
                        </DimProvider>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <OverviewCard data={chartData || []} type="day" />
                    </Grid>
                </Grid>
            </Box>
        </DimProvider>
    );
}

export default withContext(Daily);
