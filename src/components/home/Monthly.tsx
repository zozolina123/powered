import 'date-fns';

import { Grid } from '@material-ui/core';
import Box from '@material-ui/core/Box/Box';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { monthsArray } from '../../api/ConsumpionDataAPI';
import { fetchMonthData } from '../../redux/actions/consumptionDataActions';
import { RootState } from '../../redux/reducers';
import { getAverage, getMax, getTotal, getTotalCost } from '../../utils/consumptionHelpers';
import Card from '../common/ConsumptionCard';
import MonthPicker from '../common/MonthPicker';
import { DimProvider, withContext } from '../utils/DimContext';
import DocumentTitle from '../utils/DocumentTitle';
import Chart from './Chart';

function Monthly(): React.ReactElement {
    const [data, setData] = useState({} as number[]);
    const [date, setDate] = useState(new Date());
    const state = useSelector((state: RootState) => state);
    const month = state.date.month;
    const fetchedData = state.consumptionData.monthlyData;
    const chartData = state.consumptionData.overviewData.monthArray;
    const dispatch = useDispatch();

    useEffect(() => {
        const dateClone = new Date(date.valueOf());
        dateClone.setMonth(monthsArray.indexOf(month));
        dateClone.setDate(1);
        dateClone.setHours(0, 0, 0, 0);
        setDate(dateClone);
        dispatch(fetchMonthData(month));
    }, [month]);

    useEffect(() => {
        !(Object.keys(fetchedData).length === 0) && setData(fetchedData);
    }, [fetchedData]);

    return (
        <DimProvider>
            <Box component="div">
                <DocumentTitle title="Daily" />
                <MonthPicker />
                <Grid container>
                    <Grid item xs={12} md={8}>
                        <DimProvider>
                            <Chart data={data} date={date} type="month" />
                        </DimProvider>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Card
                            averageValue={getAverage(data)}
                            comparedToAverage={10}
                            peakValue={getMax(data)}
                            totalConsumption={getTotal(data)}
                            totalCost={getTotalCost(data, 0.8)}
                        />
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <DimProvider>
                            <Chart data={chartData || []} date={date} type="month" chartType={'BarChart'} />
                        </DimProvider>
                    </Grid>
                </Grid>
            </Box>
        </DimProvider>
    );
}

export default withContext(Monthly);
