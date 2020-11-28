import App from './containers/App';
import FormPage from './containers/FormPage';
import SecondPage from './containers/SecondPage';
import NotFoundPage from './containers/NotFoundPage';
import { serverFormSaga } from './sagas';

export const routes = [
  {
    path: '/',
    component: App,
    exact: true,
    sagas: serverFormSaga,
  },
  {
    path: '/form',
    exact: true,
    component: FormPage,
    sagas: serverFormSaga,
  },
  {
    path: '/second-page',
    exact: true,
    component: SecondPage,
  },
  {
    component: NotFoundPage,
  },
];
