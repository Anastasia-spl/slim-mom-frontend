import { Switch, Route } from 'react-router-dom';
import { Suspense, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import routes from '../routes';

import { useDispatch, useSelector } from 'react-redux';
import { authOperations } from '../redux/auth';
import { authSelectors } from '../redux/auth';
import { updateUserInfo } from '../redux/products/products-operations'

import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import Header from './Header';
import Loader from './Loader';

export default function App() {
  const dispatch = useDispatch();
  const onRefresh = () => {
    dispatch(authOperations.currentUser());
  };
  const getUserInfo = () => dispatch(updateUserInfo());
  const isAuthenticated = useSelector(authSelectors.getLoggedOn);
  const userInfo = localStorage.getItem('user')

  useEffect(() => {
    onRefresh();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (isAuthenticated && !userInfo) {
      getUserInfo();
      const userInfo = getUserInfo();
      console.log(userInfo)
      localStorage.setItem('user', JSON.stringify(userInfo) )
    }
  })

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
