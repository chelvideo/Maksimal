import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga'
import { composeWithDevTools } from 'redux-devtools-extension';
import initialState from './initialState';
import reducer from './reducers/reducer';
import sagaWatcher from './sagas';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
    reducer, 
    initialState,
    composeWithDevTools(
        applyMiddleware(sagaMiddleware)
    )
);

sagaMiddleware.run(sagaWatcher);

export default store;
