import { combineReducers } from 'redux';

import consumptionData from './consumptionDataReducers';
import date from './dateReducers';

const rootReducer = combineReducers({
    date,
    consumptionData,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
