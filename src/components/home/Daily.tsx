import 'date-fns';

import { Grid } from '@material-ui/core';
import Box from '@material-ui/core/Box/Box';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchData } from '../../redux/actions/consumptionDataActions';
import { RootState } from '../../redux/reducers';
import DatePicker from '../common/DatePicker';
import { DimProvider, withContext } from '../utils/DimContext';
import DocumentTitle from '../utils/DocumentTitle';
import Chart from './Chart';

function Daily(): React.ReactElement {
    const [data, setData] = useState({} as number[]);
    const state = useSelector((state: RootState) => state);
    const date = state.date.day;
    const fetchedData = state.consumptionData.dailyData;
    const dispatch = useDispatch();

    useEffect(() => {
        date && dispatch(fetchData(date));
    }, [date]);

    useEffect(() => {
        !(Object.keys(fetchedData).length === 0) && setData(fetchedData);
    }, [fetchedData]);

    return (
        <DimProvider>
            <Box component="div">
                <DocumentTitle title="Daily" />
                <DatePicker onlyPrevDays={true} />
                <Grid container>
                    <Grid item xs={12} md={8}>
                        <DimProvider>
                            <Chart data={data} date={date} />
                        </DimProvider>
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <DimProvider>
                            <Chart data={[1, 2, 3, 4, 5, 6, 7]} date={date} type="day" chartType={'BarChart'} />
                        </DimProvider>
                    </Grid>
                </Grid>
            </Box>
        </DimProvider>
    );
}

export default withContext(Daily);
