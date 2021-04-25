import React from "react";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Alert } from "react-bootstrap";
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
      key: "",
      error: false,
      passMatch: true,
      response: 0
    };
  }

  childFunction = () => {
    const { key } = this.state;
    const { callbackFromParent } = this.props;
    callbackFromParent(key);
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
          this.setState({
            key: data.key,
          })
          this.childFunction();
        })
        .catch( error => {
          const { response } = this.state;
          if (response < 200 || response > 299) {
            this.setState({
              error: true,
            })
          }
        })
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
      <Form className="signupForm" onSubmit={ this.handleSubmit }>
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

export default Signup;