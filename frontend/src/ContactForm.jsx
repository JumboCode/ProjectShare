import React from 'react';
import './ContactForm.css';

class ContractForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {email: '',
      message: '',};
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
          />
          <textarea 
            name="message" 
            className="message-field"
            placeholder="Message" 
            rows="7" 
          />
        <button className="submit-button" type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default ContractForm;