import 'date-fns';

import { Grid } from '@material-ui/core';
import Box from '@material-ui/core/Box/Box';
import React from 'react';
import { useSelector } from 'react-redux';

import { DimProvider, withContext } from '../../utils/DimContext';
import DocumentTitle from '../../utils/DocumentTitle';
import { RootState } from '../../wrappers/ReduxWrapper';
import PriceChart from './PriceChart';

function Price(): React.ReactElement {
    const state = useSelector((state: RootState) => state);
    const priceData = state.priceData.data;

    return (
        <DimProvider>
            <Box component="div">
                <DocumentTitle title="Page.priceComparison" />
                <Grid container>
                    <Grid item xs={12}>
                        <DimProvider>
                            <PriceChart data={priceData} />
                        </DimProvider>
                    </Grid>
                </Grid>
            </Box>
        </DimProvider>
    );
}

export default withContext(Price);
