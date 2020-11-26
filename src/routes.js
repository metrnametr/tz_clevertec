import App from './containers/App';
import FormPage from './containers/FormPage';
import SecondPage from './containers/SecondPage';
import NotFoundPage from './containers/NotFoundPage';

export const routes = [
  {
    path: '/',
    component: App,
    exact: true,
  },
  {
    path: '/form',
    component: FormPage,
  },
  {
    path: '/second-page',
    component: SecondPage,
  },
  {
    component: NotFoundPage,
  },
];
