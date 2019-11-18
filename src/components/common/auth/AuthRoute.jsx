import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

export default function AuthRoute({
  isAuthenticated = false,
  redirectTo = '/',
  component,
  ...rest
}) {
  const props = {};

  // Cannot use component and render therefore create a props object
  if (isAuthenticated) props.component = component;
  else
    props.render = ({ location }) => (
      <Redirect
        to={{
          pathname: redirectTo,
          state: { from: location }
        }}
      />
    );

  return <Route {...rest} {...props} />;
}

AuthRoute.propTypes = {
  isAuthenticated: PropTypes.bool,
  redirectTo: PropTypes.string
};
