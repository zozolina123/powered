import { Grid } from '@material-ui/core';
import React from 'react';

import { DimProvider } from '../utils/DimContext';
import DocumentTitle from '../utils/DocumentTitle';
import Chart from './Chart';

function Home() {
    return (
        <>
            <DocumentTitle title="Home" />
            <h2>Home</h2>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <DimProvider>
                        <Chart data={[1, 2, 3, 4, 5, 6, 7, 8, 2, 5, 6, 1, 1, 3, 4, 5, 6, 7, 1, 3, 6, 2, 8, 5]} />
                    </DimProvider>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <DimProvider>
                        <Chart data={[1, 2, 3, 4, 5, 6, 7, 8]} />
                    </DimProvider>
                </Grid>
            </Grid>
        </>
    );
}

export default Home;
