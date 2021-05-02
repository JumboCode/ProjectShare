import React from 'react';
import { Redirect } from "react-router-dom";
import PropTypes from 'prop-types';

const Logout = ({ updateAuth, isAuthenticated }) => {
  localStorage.removeItem('pshare');
  updateAuth(false, "");
  if (!isAuthenticated) {
    return <Redirect to="/" />
  }
  return null;
};

Logout.propTypes = {
  updateAuth: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
}

export default Logout;