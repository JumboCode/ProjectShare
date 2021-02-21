import React from "react";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import "./SignupWindow.css";

class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            userEmail: "",
            password1: "",
            password2: "",
        };
    }

    handleSubmit(props) {
        if (this.state.password1 !== this.state.password2) {
            alert( 'Passwords have to match.' );
        } else {
            // response stores the key fetched from the signup endpoint
            const response = fetch('http://localhost:8000/auth/signup/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: this.state.userEmail,
                    password1: this.state.password1,
                    password2: this.state.password2
                })
            });
        }
    }

    render() {
        return (
            <Form className="signupForm" onSubmit={ this.handleSubmit }>
            <Form.Group className="email" controlID="userEmail">
                <Form.Label>Email   </Form.Label>
                <Form.Control 
                    type="email" 
                    placeholder="Enter Email" 
                    userEmail={ this.state }
                    onChange={ input => this.setState({ userEmail : input.target.value})}
                    ></Form.Control>
            </Form.Group>

            <Form.Group className="password1" controlID="userPassword1">
                <Form.Label>Password   </Form.Label>
                <Form.Control 
                    type="password" 
                    placeholder="Password" 
                    value={ this.state.password1 }
                    onChange={ input => this.setState({ password1 : input.target.value})}
                    ></Form.Control>
            </Form.Group>

            <Form.Group className="password2" controlID="userPassword2">
                <Form.Label>Enter Password Again   </Form.Label>
                <Form.Control
                type="password" 
                placeholder="Password" 
                value={ this.state.password2 }
                onChange={ input => this.setState({ password2 : input.target.value})}
                ></Form.Control>
            </Form.Group>

            <Button className="submit" variant="primary" type="submit">
                Submit
            </Button>
        </Form>

        );
    }
}

export default Signup;