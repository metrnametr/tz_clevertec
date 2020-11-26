import "regenerator-runtime/runtime";
import 'babel-polyfill';
import express from 'express';
import path from 'path';
import  React from 'react';
import ReactDOMServer from'react-dom/server';
import Loadable from 'react-loadable'

import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import { StaticRouter } from 'react-router';
import { ReduxAsyncConnect, loadOnServer } from 'redux-connect';
import { parse as parseUrl } from 'url';
import serialize from 'serialize-javascript'
import configureStore from './src/store';
import { routes } from './src/routes';
import fs  from 'fs';
import { serverSaga } from "./src/sagas";

const app = express();


const initialState = {}

app.use(express.static('./build'));


app.get('*', async (req, res) => {
    const url = req.originalUrl || req.url;
    const history = createMemoryHistory({
        initialEntries: [url],
    });
    const store = configureStore(initialState, history);
    const location = parseUrl(url);
    const helpers = {};
    const context = {};
    store.runSaga(serverSaga).toPromise().then(() => {
        return loadOnServer({ store, location, routes, helpers })
        .then(() => {

          const reactApp = ReactDOMServer.renderToString(
                  <Provider store={store} key="provider">
                      <StaticRouter location={location} context={context}>
                           <ReduxAsyncConnect routes={routes}/>
                      </StaticRouter>
                  </Provider>
          );
            

                fs.readFile(path.resolve('./build/main.html'), 'utf-8', (err, data) => {
                    const page = createHtml(data, reactApp, serialize(store.getState()));
                    res.send(page);
                })
        })
    })
    store.close();
})

function createHtml(data, app, store){
    return data
            .replace('<div id="root"></div>', `<div id="root">${app}</div>`)
            .replace(
                '<script id="state" type="text/javascript"></script>',
                `<script id="state" type="text/javascript">window.__INITIAL_DATA__=${store}; </script>`
            )
}

Loadable.preloadAll().then(() => app.listen(3001, () => console.log('server start')));