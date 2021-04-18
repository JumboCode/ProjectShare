import React from "react";
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
    return (
      <Tabs className="toggleSignupLogin" defaultActiveKey="signup" id="toggleSignupLogin">
        <Tab eventKey="signup" title="Sign Up">
          <Signup callbackFromParent={this.HandleCallback} />
        </Tab>
        <Tab eventKey="login" title="Log In">
          <Login callbackFromParent={this.HandleCallback} />
        </Tab>
      </Tabs>
    );
  }
}

export default LoginSignupPage;