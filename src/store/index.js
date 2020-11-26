import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware, { END } from 'redux-saga';

import reducers from '../reducers';

export default (initialState, history) => {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    reducers(history),
    initialState,
    applyMiddleware(sagaMiddleware),
  );
  store.runSaga = sagaMiddleware.run;
  store.close = () => store.dispatch(END);
  return store;
};
