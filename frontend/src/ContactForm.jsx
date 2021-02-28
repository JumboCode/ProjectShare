import React from 'react';
import './ContactForm.css';
import 'bootstrap/dist/css/bootstrap.min.css';

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
    console.log(this.state);
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
      <div className="Contact-form-container">
        <div>
          <h2 className="Send-us-a-message">Send us a message!</h2>
        </div>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <input 
              name="email"
              type="email" 
              className="form-control" 
              id="exampleInputEmail1" 
              placeholder="Email Address" 
              onChange={this.onChange}
            />
          </div>
          <div className="form-group">
            <textarea 
              name="message"
              className="form-control" 
              id="exampleInputEmail1" 
              placeholder="Message" 
              rows="5"
              onChange={this.onChange}
            />
          </div>
          <button type="submit" className="btn btn-primary mb-2">Submit</button>
        </form>
      </div>
    );
  }
}

export default ContractForm;