import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { authSelectors } from '../../redux/auth';
import Loader from '../Loader';

const PrivateRoute = ({ component: Component, redirectTo, ...routeProps }) => {
  const isLoggedOn = useSelector(authSelectors.getLoggedOn);
  const isLoading = useSelector(authSelectors.getLoading);

  return (
    <Route
      {...routeProps}
      render={props =>
        isLoading ? (
          <div>
            <Loader type="Rings" color="#999999" height={80} width={80} />
          </div>
        ) : isLoggedOn ? (
          <Component {...props} />
        ) : (
          <Redirect to={redirectTo} />
        )
      }
    />
  );
};

export default PrivateRoute;
