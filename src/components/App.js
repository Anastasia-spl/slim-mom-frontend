import { Switch, Route } from 'react-router-dom';
import { Suspense, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import routes from '../routes';

import { useDispatch } from 'react-redux';
import { authOperations } from '../redux/auth';

import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import Header from './Header';
import Loader from './Loader';

export default function App() {
  const dispatch = useDispatch();
  const onRefresh = () => {
    dispatch(authOperations.currentUser());
  };

  useEffect(() => {
    onRefresh();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Header />
      <Suspense fallback={<Loader />}>
        <Switch>
          {routes.map(
            ({ path, isProtected, redirectTo, exact, component: Component }) =>
              isProtected === null ? (
                <Route
                  exact={exact}
                  key={[path]}
                  path={path}
                  component={Component}
                  redirectTo={redirectTo}
                />
              ) : isProtected ? (
                <PrivateRoute
                  exact={exact}
                  key={path}
                  path={path}
                  component={Component}
                  redirectTo={redirectTo}
                />
              ) : (
                <PublicRoute
                  exact={exact}
                  key={[path]}
                  path={path}
                  component={Component}
                  redirectTo={redirectTo}
                />
              ),
          )}
        </Switch>
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
