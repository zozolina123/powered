import { configureStore } from '@reduxjs/toolkit';
import React from 'react';
import { Provider } from 'react-redux';

import consumptionDataReducer from '../../redux/reducers/consumptionDataSlice';
import dateReducer from '../../redux/reducers/dateReducers';
import priceDataReducer from '../../redux/reducers/priceDataReducers';

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
