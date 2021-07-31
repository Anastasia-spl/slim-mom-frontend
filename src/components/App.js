import { Switch, Route } from 'react-router-dom';
import { Suspense, useEffect, useSelector } from 'react';
import { ToastContainer } from 'react-toastify';
import routes from '../routes';

import { useDispatch } from 'react-redux';
import { authOperations, authSelectors } from '../redux/auth';

/* ПРИМЕР ИМПОРТА ФАЙЛОВ КОЛЛЕКЦИИ ИЗ РЕДАКСА */
// import { usersOperations, usersSelectors } from './redux/users';

import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import Header from './Header';
import Loader from './Loader';
// import { Component } from 'react';
// import Loader from './components/Loader';

/* НЕ ЗАБЫВАЕМ, ЧТО ПОДКЛЮЧЕНИЕ РАУТОВ ДОЛЖНО БЫТЬ РЕАЛИЗОВАНО ЧЕРЕЗ lazy load */

export default function App() {
  const dispatch = useDispatch();
  const onRefresh = () => {
    dispatch(authOperations.currentUser());
  };

  useEffect(() => {
    onRefresh();
    // eslint-disable-next-line
  }, []);

  let isLoading = false;

  return (
    <>
      <Header />
      <Suspense fallback={Loader}>
        {isLoading ? (
          <Loader />
        ) : (
          <Switch>
            {routes.map(({ path, isProtected, exact, component: Component }) =>
              isProtected === null ? (
                <Route
                  exact={exact}
                  key={[path]}
                  path={path}
                  isProtected={isProtected}
                  component={Component}
                />
              ) : isProtected ? (
                <PrivateRoute
                  exact={exact}
                  key={path}
                  path={path}
                  isProtected={isProtected}
                  component={Component}
                />
              ) : (
                <PublicRoute
                  exact={exact}
                  key={[path]}
                  path={path}
                  isProtected={isProtected}
                  component={Component}
                />
              ),
            )}
          </Switch>
        )}
      </Suspense>
      <ToastContainer
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}
