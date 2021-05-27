import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

class ProtectedRoute extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { Component } = this.props;
    const { isAuthenticated } = this.props;

    return isAuthenticated ? (
      <Component />
    ) : (
      <Redirect to="/login" />
    )
  }
}

ProtectedRoute.defaultProps = {
  Component: null,
  isAuthenticated: null,
}

ProtectedRoute.propTypes = {
  Component: PropTypes.elementType,
  isAuthenticated: PropTypes.bool,
};

export default ProtectedRoute;