import { combineReducers } from 'redux';

import { connectRouter } from 'connected-react-router/immutable';
import {
  reducer as reduxAsyncConnect,
} from 'redux-connect';
import { reducerForm } from './reducerForm';

export default (history) => combineReducers({
  reduxAsyncConnect,
  router: connectRouter(history),
  reducerForm,
});
