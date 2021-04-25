import React from "react";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Alert } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.childFunction = this.childFunction.bind(this);
    this.state = {
      useremail: "",
      userpassword: "",
      key: "",
      error: false,
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
    const { userpassword } = this.state;


    if (localStorage.getItem('pshare') === null) {
      fetch('http://localhost:8000/auth/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: useremail,
          password: userpassword
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
          localStorage.setItem('pshare', data.key);
          this.childFunction();
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
      this.setState({
        key: authToken,
      })
      this.childFunction()
    }
  }

  render() {
    const { error } = this.state;

    if (error) {
      return (
        <Alert variant='danger'>
          Oops, something went wrong! Try again.
        </Alert>
      );
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
  
        <Form.Group className="password" controlid="userPassword">
          <Form.Label>Password   </Form.Label>
          <Form.Control 
            type="password" 
            placeholder="Password" 
            onChange={input => this.setState({ userpassword : input.target.value})}
          />
        </Form.Group>
  
        <Button className="submit" variant="primary" type="submit">
          Sign In
        </Button>
      </Form>
    );
    
  }
}

export default Login;