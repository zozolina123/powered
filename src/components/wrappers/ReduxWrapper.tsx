import React from 'react';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';

import rootReducer from '../../redux/reducers/index';

interface Props {
    children: React.ReactElement;
}

export default function ReduxWrapper({ children }: Props): React.ReactElement {
    const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunkMiddleware)));

    return <Provider store={store}>{children}</Provider>;
}
