import React from 'react';
import PopUpAlert from './PopUpAlert';
import './ContactForm.css';
import { BACKEND_URL } from './fetch';

class ContractForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {email: '',
      message: '',
      alert: false,
      status: true};
    
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onShowAlert = this.onShowAlert.bind(this);
  }

  onChange(event) {
    const {target} = event;
    const {value, name} = target;

    this.setState({[name]: value});
  }

  onShowAlert() {
    this.setState({alert: true});
    window.setTimeout(()=>{
      this.setState({alert: false})
    }, 3000)
  }

  handleSubmit(event) {
    event.preventDefault();
    fetch(`${BACKEND_URL}/api/contact`, {
      method: "POST",
      body: JSON.stringify(this.state),
      credentials: "same-origin",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    }).then(
      (response) => (response.json())
    ).then((response) => {
      if (response.status === 'success') {
        this.setState({status: true,
          email:'',
          message: ''});
        this.onShowAlert();
      } else if (response.data.status === 'fail') {
        this.setState({status: false});
        this.onShowAlert();
      }
    })
  }



  render() {
    const {email, message, alert, status} = this.state;

    return (
      <div className="contact-form-container">
        <PopUpAlert 
          variant={status ? 'success' : 'danger'}
          visible={alert}
          message={status ? 'Your message was sent!' : 'Error in sending message. Please try again.'}
        />
        <h2 className="about-page-heading">Send us a message!</h2>
        <p className="additional-text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
        <form className="contact-form">
          <input 
            name="email"
            type="email" 
            value={email}
            className="email-field" 
            placeholder="Email Address"
            onChange={this.onChange}
          />
          <textarea 
            name="message" 
            value={message}
            className="message-field"
            placeholder="Message" 
            rows="7" 
            onChange={this.onChange}
          />
          <button onClick={this.handleSubmit} className="submit-button" type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default ContractForm;