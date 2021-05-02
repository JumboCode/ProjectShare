import React from "react";
import PropTypes from 'prop-types';
import { Tabs , Tab } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import Signup from './SignupWindow';
import Login from './LoginWindow';
import 'bootstrap/dist/css/bootstrap.min.css';

function LoginSignupPage({updateAuth}) {
  const key = localStorage.getItem('pshare');
  if (key !== null) {
    updateAuth(true, key);
    return (
      <Redirect to="/dashboard" />
    )
  }
  return (
    <Tabs className="toggleSignupLogin" defaultActiveKey="login" id="toggleSignupLogin">
      <Tab eventKey="signup" title="Sign Up">
        <Signup authUpdate={updateAuth} />
      </Tab>
      <Tab eventKey="login" title="Log In">
        <Login authUpdate={updateAuth} />
      </Tab>
    </Tabs>
  );
}

LoginSignupPage.defaultProps = {
  updateAuth: null,
}

LoginSignupPage.propTypes = {
  updateAuth: PropTypes.func,
};

export default LoginSignupPage;