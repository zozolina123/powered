import 'date-fns';

import { Grid } from '@material-ui/core';
import React, { useState } from 'react';

import DatePicker from '../common/DatePicker';
import { DimProvider } from '../utils/DimContext';
import DocumentTitle from '../utils/DocumentTitle';
import Chart from './Chart';

function Home() {
    const [data, setData] = useState(generateArray());
    const [data2, setData2] = useState(generateArray());

    function generateArray() {
        const arr = [];
        for (let i = 0; i < 25; i++) {
            arr[i] = Math.round(Math.random() * 9);
        }
        return arr;
    }

    return (
        <>
            <DocumentTitle title="Home" />
            <h2>Home</h2>
            <DatePicker />
            <button onClick={() => setData(generateArray())}>Shuffle</button>
            <button onClick={() => setData2(generateArray())}>Shuffle2</button>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={8}>
                    <DimProvider>
                        <Chart data={data} />
                    </DimProvider>
                </Grid>
                <Grid item xs={12} sm={8}>
                    <DimProvider>
                        <Chart data={data2} />
                    </DimProvider>
                </Grid>
            </Grid>
        </>
    );
}

export default Home;
