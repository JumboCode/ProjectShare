import React from "react";
import PropTypes from 'prop-types';
import { Tabs } from "react-bootstrap";
import { Tab } from "react-bootstrap";
import Signup from './SignupWindow';
import Login from './LoginWindow';
import 'bootstrap/dist/css/bootstrap.min.css';

class LoginSignupPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authToken: ""
    };
  }

  HandleCallback = (key) => {
    this.setState({authToken: key});
  }

  render() {
    const {updateAuth} = this.props
    return (
      <Tabs className="toggleSignupLogin" defaultActiveKey="signup" id="toggleSignupLogin">
        <Tab eventKey="signup" title="Sign Up">
          <Signup callbackFromParent={this.HandleCallback} authUpdate={updateAuth} />
        </Tab>
        <Tab eventKey="login" title="Log In">
          <Login callbackFromParent={this.HandleCallback} authUpdate={updateAuth} />
        </Tab>
      </Tabs>
    );
  }
}

LoginSignupPage.defaultProps = {
  updateAuth: null,
}

LoginSignupPage.propTypes = {
  updateAuth: PropTypes.func,
};

export default LoginSignupPage;