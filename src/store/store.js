import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga'
import { composeWithDevTools } from 'redux-devtools-extension';
import initialState from './initialState';
import reducer from './reducers/reducer';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
    reducer, 
    initialState,
    composeWithDevTools(
        applyMiddleware(sagaMiddleware)
    )
);

sagaMiddleware.run(rootSaga);

export default store;
