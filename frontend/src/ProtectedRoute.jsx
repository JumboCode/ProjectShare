import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';

class ProtectedRoute extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { Component,
      isAuthenticated,
      authToken,
      path,
    } = this.props;

    return isAuthenticated ? (
      <Route 
        path={path}
        render={() => (
          <Component 
            authToken={authToken}
            isAuthenticated={isAuthenticated}
          />
        )}
      />
    ) : (
      <Redirect to="/login" />
    )
  }
}

ProtectedRoute.defaultProps = {
  Component: null,
  isAuthenticated: null,
  authToken: null,
}

ProtectedRoute.propTypes = {
  Component: PropTypes.elementType,
  isAuthenticated: PropTypes.bool,
  authToken: PropTypes.string,
  path: PropTypes.string.isRequired,
};

export default ProtectedRoute;