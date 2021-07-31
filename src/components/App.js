import { Switch, Route } from 'react-router-dom';
import { Suspense, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import routes from '../routes';

import { useDispatch } from 'react-redux';
import { authOperations } from '../redux/auth';

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
  // const isLoading = useSelector();
  const dispatch = useDispatch();
  const onRefresh = () => {
    dispatch(authOperations.currentUser());
  };

  useEffect(() => {
    onRefresh();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    // getCurrentUser
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
            {routes.map(
              ({
                path,
                isProtected,
                exact,
                isBcgAuth,
                isBcgHP,
                component: Component,
              }) =>
                isProtected ? (
                  <PrivateRoute exact={exact} key={path} path={path} />
                ) : (
                  <PublicRoute
                    exact={exact}
                    key={[path]}
                    path={path}
                    isBcgAuth={isBcgAuth}
                    isBcgHP={isBcgHP}
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
