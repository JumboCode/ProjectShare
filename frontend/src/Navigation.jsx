import React from 'react';
import './Navigation.css';

class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    // eslint-disable-next-line
    const search = this.state.value;
    // alert(`submited: ${  search}`);
    event.preventDefault();
  }

  render() {
    // eslint-disable-next-line react/destructuring-assignment
    const { value } = this.state.value;
    return (
      <form onSubmit={this.handleSubmit}>
        {/* eslint-disable-next-line */}
        <img src="https://media-exp1.licdn.com/dms/image/C4D0BAQGR7P1s2dm04A/company-logo_200_200/0?e=2159024400&v=beta&t=ExcBhk84mPfea8XkxTN582SzYzOIB0FshET-FS7CMmQ" />
        <p>Project SHARE</p>
        <input placeholder="Search" type="text" value={value} onChange={this.handleChange} />
        <button type="button">
          Help Me Find a Resource
        </button>
      </form>
    );
  }
}

export default Navigation;