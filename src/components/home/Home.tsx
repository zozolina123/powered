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

function Home({ dims }: { dims: DOMRect }): React.ReactElement {
    const [data, setData] = useState(generateArray());
    const [data2, setData2] = useState(generateArray());
    const state = useSelector((state: RootState) => state);
    const date = state.date;
    const fetchedData = state.consumptionData.data;
    const dispatch = useDispatch();

    useEffect(() => {
        date && dispatch(fetchData(date));
    }, [date]);

    useEffect(() => {
        !(Object.keys(fetchedData).length === 0) && setData(fetchedData);
    }, [fetchedData]);

    function generateArray(date = new Date(Date.now())) {
        const arr = [];
        console.log(date);
        for (let i = 0; i < 25; i++) {
            arr[i] = Math.round(Math.random() * 9);
        }
        return arr;
    }

    return (
        <DimProvider>
            <Box component="div">
                <DocumentTitle title="Home" />
                <DatePicker />
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
