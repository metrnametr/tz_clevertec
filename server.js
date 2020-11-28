import 'regenerator-runtime/runtime';
import 'babel-polyfill';
import express from 'express';
import path from 'path';
import  React from 'react';
import ReactDOMServer from'react-dom/server';
import Loadable from 'react-loadable'
import { matchRoutes } from 'react-router-config';

import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import { StaticRouter } from 'react-router';
import { ReduxAsyncConnect, loadOnServer } from 'redux-connect';
import { parse as parseUrl } from 'url';
import serialize from 'serialize-javascript'
import configureStore from './src/store';
import { routes } from './src/routes';
import fs  from 'fs';

const app = express();


const initialState = {};

app.use(express.static('./build'));

const port = process.env.PORT || 3001;

function * empty(){}


app.get('*', async (req, res) => {
    const url = req.originalUrl || req.url;
    const history = createMemoryHistory({
        initialEntries: [url],
    });
    const store = configureStore(initialState, history);
    const location = parseUrl(url);
    const helpers = {};
    const context = {};

    const currentRoute = matchRoutes(routes, req.path);
    const sagas = currentRoute.map(({ route }) => route.sagas);
    const currentSagas = sagas[0] ? sagas[0] : empty;
    store.runSaga(currentSagas).toPromise().then(() => {
        return loadOnServer({ store, location, routes, helpers })
        .then(() => {
          const reactApp = ReactDOMServer.renderToString(
                  <Provider store={store} key='provider'>
                      <StaticRouter location={location} context={context}>
                           <ReduxAsyncConnect routes={routes}/>
                      </StaticRouter>
                  </Provider>
          );
            

                fs.readFile(path.resolve('./build/main.html'), 'utf-8', (err, data) => {
                    if (err) {
                        console.log(err);
                    }
                    const page = createHtml(data, reactApp, serialize(store.getState()));
                    res.send(page);
                })
        });
    });
    store.close();
})

function createHtml(data, app, store){
    return data
            .replace('<div id="root"></div>', `<div id="root">${app}</div>`)
            .replace(
                '<script id="state" type="text/javascript"></script>',
                `<script id="state" type="text/javascript">window.__INITIAL_DATA__=${store}; </script>`
            );
}

Loadable.preloadAll().then(() => app.listen(port, () => console.log('server start')));