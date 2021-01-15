import 'date-fns';

import { Grid } from '@material-ui/core';
import Box from '@material-ui/core/Box/Box';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchWeekData } from '../../redux/actions/consumptionDataActions';
import { RootState } from '../../redux/reducers';
import WeekPicker from '../common/WeekPicker';
import { DimProvider, withContext } from '../utils/DimContext';
import DocumentTitle from '../utils/DocumentTitle';
import Chart from './Chart';

function Weekly(): React.ReactElement {
    const [data, setData] = useState({} as number[]);
    const state = useSelector((state: RootState) => state);
    const date = state.date.week;
    const fetchedData = state.consumptionData.weeklyData;
    const dispatch = useDispatch();

    useEffect(() => {
        date && dispatch(fetchWeekData(date));
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
                </Grid>
            </Box>
        </DimProvider>
    );
}

export default withContext(Weekly);
