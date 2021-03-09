import 'date-fns';

import { Grid, Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box/Box';
import React, { useMemo } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useSelector } from 'react-redux';

import { IPrice } from '../../../redux/ApiInterfaces';
import { DimProvider, withContext } from '../../utils/DimContext';
import DocumentTitle from '../../utils/DocumentTitle';
import { RootState } from '../../wrappers/ReduxWrapper';
import PriceChart from './PriceChart';

function Price(): React.ReactElement {
    const state = useSelector((state: RootState) => state);
    const priceData = state.priceData.data;
    const intl = useIntl();
    const labelText = {
        yLabel: intl.formatMessage({ id: 'Chart.price' }),
    };

    const getCompactPriceData = (priceData: IPrice[]): IPrice[] => {
        const groupedData = {};
        priceData.forEach((offer) => {
            if (groupedData[offer.furnizor]) {
                groupedData[offer.furnizor].push(offer);
                return;
            }
            groupedData[offer.furnizor] = [offer];
        });

        const compactData: IPrice[] = [];
        Object.keys(groupedData).forEach((furnizor) => {
            const bestOffer = groupedData[furnizor].reduce((offer: IPrice, bestOffer: IPrice) =>
                offer.tarifFinal < bestOffer.tarifFinal ? offer : bestOffer,
            );
            compactData.push(bestOffer);
        });
        return compactData;
    };

    const mapPriceToUsage = (priceData: IPrice[], consumption: number): IPrice[] => {
        const priceProperties = [
            'acciza',
            'pretCertificateVerzi',
            'pretEnergie',
            'tarifDistributie',
            'tarifSistem',
            'tarifTransport',
            'taxaCogenerare',
            'tarifFinal',
        ];
        const priceToCost = priceData.map((offer) => {
            const offerClone = { ...offer };
            priceProperties.forEach((property) => {
                offerClone[property] = offerClone[property] * consumption;
            });
            offerClone['valCompFix'] = offerClone['valCompFix'] * 30;
            return offerClone;
        });
        return priceToCost;
    };

    const compactPriceData = useMemo(() => getCompactPriceData(priceData), [priceData]);
    const usageData = useMemo(() => mapPriceToUsage(compactPriceData, 300), [compactPriceData]);

    return (
        <DimProvider>
            <Box component="div">
                <DocumentTitle title="Page.priceComparison" />
                <Grid container>
                    <Typography>
                        <FormattedMessage id={'Price.chartInfo'} />
                    </Typography>
                    <Grid item xs={12}>
                        <DimProvider>
                            <PriceChart data={usageData} labelText={labelText} />
                        </DimProvider>
                    </Grid>
                </Grid>
            </Box>
        </DimProvider>
    );
}

export default withContext(Price);
