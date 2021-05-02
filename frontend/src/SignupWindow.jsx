import React from "react";
import PropTypes from 'prop-types';
import { Form , Button , Alert } from "react-bootstrap";


import "./SignupWindow.css";

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.childFunction = this.childFunction.bind(this);
    this.state = {
      useremail: "",
      userpassword1: "",
      userpassword2: "",
      error: false,
      passMatch: true,
      response: 0
    };
  }

  childFunction = (key) => {
    const { authUpdate } = this.props;
    authUpdate(true, key);
  }

  handleSubmit(props) {
    props.preventDefault();

    const { useremail } = this.state;
    const { userpassword1 } = this.state;
    const { userpassword2 } = this.state;

    if (userpassword1 !== userpassword2) {
      this.setState({
        passMatch: false,
      })
    } else {
      if (localStorage.getItem('pshare') === null) {
        fetch('http://localhost:8000/auth/signup/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: useremail,
            password1: userpassword1,
            password2: userpassword2
          })
        })
          .then(response => {
            this.setState({
              response: response.status,
            })
            if (response.status >= 200 && response.status <= 299) {
              return response.json()
            }
            this.setState({
              error: true,
            })
            return "error"
          })
          .then(data => {
            localStorage.setItem('pshare', data.key);
            this.childFunction(data.key);
          })
          .catch( error => {
            const { response } = this.state;
            if (response < 200 || response > 299) {
              this.setState({
                error: true,
              })
              localStorage.removeItem('pshare');
            }
          })
      } else {
        const authToken = localStorage.getItem('pshare');
        this.childFunction(authToken);
      }
    }
  }

  render() {
    const { error } = this.state;
    const { passMatch } = this.state;

    if(!passMatch) {
      return (
        <Alert variant='danger'>
          Passwords have to match. Try again.
        </Alert>
      )
    }
    if (error) {
      return (
        <Alert variant='danger'>
          Oops, something went wrong! Try again.
        </Alert>
      )
    }
    return (
      <Form className="signupForm" onSubmit={this.handleSubmit}>
        <Form.Group className="email" controlid="useremail">
          <Form.Label>Email   </Form.Label>
          <Form.Control 
            type="email" 
            placeholder="Enter Email" 
            onChange={input => this.setState({ useremail : input.target.value})}
          />
        </Form.Group>
    
        <Form.Group className="password1" controlid="userPassword1">
          <Form.Label>Password   </Form.Label>
          <Form.Control 
            type="password" 
            placeholder="Password" 
            onChange={input => this.setState({ userpassword1 : input.target.value})}
          />
        </Form.Group>
    
        <Form.Group className="password2" controlid="userPassword2">
          <Form.Label>Enter Password Again   </Form.Label>
          <Form.Control
            type="password" 
            placeholder="Password" 
            onChange={input => this.setState({ userpassword2 : input.target.value})}
          />
        </Form.Group>
    
        <Button className="submit" variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    );
      
  }
}

Signup.defaultProps = {
  authUpdate: null,
}

Signup.propTypes = {
  authUpdate: PropTypes.func,
};

export default Signup;