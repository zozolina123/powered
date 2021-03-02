import { combineReducers } from 'redux';

import consumptionData from './consumptionDataReducers';
import date from './dateReducers';
import priceData from './priceDataReducers';

const rootReducer = combineReducers({
    date,
    consumptionData,
    priceData,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
