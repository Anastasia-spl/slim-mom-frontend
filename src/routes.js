import { lazy } from 'react';
const HomePage = lazy(() => import('./pages/HomePage'));
const LoginPage = lazy(() =>
  import('./pages/LoginPage' /*webpackChunkName: "login-page" */),
);
const RegistrationPage = lazy(() =>
  import('./pages/RegistrationPage' /*webpackChunkName: "registration-page" */),
);
const Diary = lazy(() =>
  import('./pages/Diary' /*webpackChunkName: "diary-page" */),
);

const CalculatorPage = lazy(() =>
  import('./pages/Calculator' /*webpackChunkName: "calculator-page" */),
);
const Page404 = lazy(() => import('./pages/Page404'));

const routes = [
  {
    exact: true,
    path: '/',
    component: HomePage,
    isProtected: false,
  },
  {
    path: '/diary',
    component: Diary,
    label: 'Дневик',
    isProtected: true,
    isNav: true,
  },
  {
    path: '/calculator',
    component: CalculatorPage,
    label: 'Калькулятор',
    isProtected: false,
    isNav: true,
  },
  {
    exact: false,
    path: '/login',
    label: 'Вход',
    component: LoginPage,
    isProtected: false,
    isNav: false,
  },
  {
    exact: false,
    path: '/register',
    label: 'Регистрация',
    component: RegistrationPage,
    isProtected: false,
    isNav: false,
  },
  {
    component: Page404,
    isProtected: false,
  },
];
export default routes;
