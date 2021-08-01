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
    isProtected: null,
  },
  {
    path: '/diary',
    component: Diary,
    label: 'Дневник',
    isProtected: true,
    isNav: true,
  },
  {
    path: '/calculator',
    component: CalculatorPage,
    label: 'Калькулятор',
    isProtected: true,
    isNav: true,
  },
  {
    exact: false,
    path: '/login',
    label: 'Вход',
    component: LoginPage,
    isProtected: false,
    isLogBar: true,
  },
  {
    exact: false,
    path: '/register',
    label: 'Регистрация',
    component: RegistrationPage,
    isProtected: false,
    isLogBar: true,
  },
  {
    component: Page404,
    isProtected: null,
  },
];
export default routes;
