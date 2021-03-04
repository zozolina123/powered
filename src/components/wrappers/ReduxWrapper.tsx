import { configureStore } from '@reduxjs/toolkit';
import React from 'react';
import { Provider } from 'react-redux';

import priceDataReducer from '../../redux/reducers/priceDataSlice';
import dateReducer from '../datePickers/dateSlice';
import consumptionDataReducer from '../pages/consumption/consumptionDataSlice';

interface Props {
    children: React.ReactElement;
}

const store = configureStore({
    reducer: {
        date: dateReducer,
        consumptionData: consumptionDataReducer,
        priceData: priceDataReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;

export default function ReduxWrapper({ children }: Props): React.ReactElement {
    return <Provider store={store}>{children}</Provider>;
}
