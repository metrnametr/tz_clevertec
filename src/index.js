/* eslint-disable no-underscore-dangle */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ReduxAsyncConnect } from 'redux-connect';
import { createBrowserHistory, createMemoryHistory } from 'history';
import Header from './components/Header';
import { routes } from './routes';
import configureStore from './store';
import './app.scss';
import { clientFormSaga } from './sagas';

// eslint-disable-next-line no-undef
const initialState = window.__INITIAL_DATA__ || {};

// eslint-disable-next-line no-constant-condition
const history = typeof window
  ? createMemoryHistory({
    initialEntries: ['/'],
  })
  : createBrowserHistory();

const store = configureStore(initialState, history);

// eslint-disable-next-line no-constant-condition
const renderMethod = typeof window ? ReactDOM.render : ReactDOM.hydrate;

store.runSaga(clientFormSaga);

const helpers = {};

const render = (
  <Provider store={store}>
    <BrowserRouter>
      <Header />
      <ReduxAsyncConnect helpers={helpers} routes={routes} />
    </BrowserRouter>
  </Provider>
);
  // eslint-disable-next-line no-undef
const root = document.getElementById('root');
renderMethod(
  render,
  root,
);
