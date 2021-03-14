import React from 'react';
import './ContactForm.css';

class ContractForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {email: '',
      message: '',};
    
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.resetForm = this.resetForm.bind(this);
  }

  onChange(event) {
    const {target} = event;
    const {value, name} = target;

    this.setState({[name]: value});
  }

  resetForm() {
    this.setState({email: '', message: ''})
  }

  handleSubmit(event) {
    event.preventDefault();
    fetch('/api/contact', {
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
        alert("Message sent!");
        this.resetForm();
      } else if (response.data.status === 'fail') {
        alert("Message failed to send.");
      }
    })
  }



  render() {

    return (
      <div className="contact-form-container">
        <h2 className="title-text">Send us a message!</h2>
        <body className="additional-text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </body>
        <form className="contact-form" onSubmit={this.handleSubmit}>
          <input 
            name="email"
            type="email" 
            className="email-field" 
            placeholder="Email Address"
            onChange={this.onChange}
          />
          <textarea 
            name="message" 
            className="message-field"
            placeholder="Message" 
            rows="7" 
            onChange={this.onChange}
          />
          <button className="submit-button" type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default ContractForm;