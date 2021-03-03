import 'date-fns';

import { Grid } from '@material-ui/core';
import Box from '@material-ui/core/Box/Box';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ConsumpionDataAPI from '../../api/ConsumpionDataAPI';
import { DimProvider, withContext } from '../utils/DimContext';
import DocumentTitle from '../utils/DocumentTitle';
import { RootState } from '../wrappers/ReduxWrapper';
import Chart from './Chart';
import { dailyDataLoaded, fetchDailyData } from './consumptionDataSlice';

function Home(): React.ReactElement {
    const [data, setData] = useState({} as number[]);
    const state = useSelector((state: RootState) => state);
    const date = new Date();
    date.setMinutes(0, 0, 0);
    const fetchedData = state.consumptionData.dailyData.data;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchDailyData());
        ConsumpionDataAPI.fetchDailyConsumptionData(date).then((res) => dispatch(dailyDataLoaded(res)));
    }, []);

    useEffect(() => {
        !(Object.keys(fetchedData).length === 0) && setData(fetchedData);
    }, [fetchedData]);

    return (
        <DimProvider>
            <Box component="div">
                <DocumentTitle title="Home" />
                <Grid container>
                    <Grid item xs={12} md={8}>
                        <DimProvider>
                            <Chart data={data} date={date} />
                        </DimProvider>
                    </Grid>
                </Grid>
            </Box>
        </DimProvider>
    );
}

export default withContext(Home);
