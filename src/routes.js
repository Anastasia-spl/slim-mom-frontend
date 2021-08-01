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
const Page404 = lazy(() => import('./pages/Page404' /*webpackChunkName: "404-page" */));

const routes = [
  {
    exact: true,
    path: '/',
    component: HomePage,
    isProtected: false,
    redirectTo: localStorage.getItem('user') !== null ? '/diary' : '/calculator',
  },
  {
    path: '/diary',
    component: Diary,
    label: 'Дневник',
    isProtected: true,
    isNav: true,
    redirectTo: '/login',
  },
  {
    path: '/calculator',
    component: CalculatorPage,
    label: 'Калькулятор',
    isProtected: true,
    isNav: true,
    redirectTo: '/login',
  },
  {
    exact: false,
    path: '/login',
    label: 'Вход',
    component: LoginPage,
    isProtected: false,
    isLogBar: true,
    redirectTo: '/diary',
  },
  {
    exact: false,
    path: '/register',
    label: 'Регистрация',
    component: RegistrationPage,
    isProtected: false,
    isLogBar: true,
    redirectTo: '/diary',
  },
  {
    component: Page404,
    isProtected: null,
  },
];
export default routes;
