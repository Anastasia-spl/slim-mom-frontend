import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { authSelectors } from '../../redux/auth';
import Loader from '../Loader';

const PublicRoute = ({ component: Component, redirectTo, ...routeProps }) => {
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
        ) : !isLoggedOn ? (
          <Component {...props} />
        ) : (
          <Redirect to={redirectTo} />
        )
      }
    />
  );
};

export default PublicRoute;
