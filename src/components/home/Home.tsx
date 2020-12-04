import 'date-fns';

import { Grid } from '@material-ui/core';
import Box from '@material-ui/core/Box/Box';
import React, { useState } from 'react';

import DatePicker from '../common/DatePicker';
import { DimProvider, withContext } from '../utils/DimContext';
import DocumentTitle from '../utils/DocumentTitle';
import Chart from './Chart';

function Home({ dims }: { dims: DOMRect }): React.ReactElement {
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
        <DimProvider>
            <Box component="div">
                <DocumentTitle title="Home" />
                <DatePicker />
                <button onClick={() => setData(generateArray())}>Shuffle</button>
                <button onClick={() => setData2(generateArray())}>Shuffle2</button>
                <Grid container>
                    <Grid item xs={12} md={8}>
                        <DimProvider>
                            <Chart data={data} />
                        </DimProvider>
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <DimProvider>
                            <Chart data={data2} />
                        </DimProvider>
                    </Grid>
                </Grid>
            </Box>
        </DimProvider>
    );
}

export default withContext(Home);
