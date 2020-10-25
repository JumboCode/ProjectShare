import React from 'react';
import './Navigation.css';
import logo from './projectSHARELogo.jpeg';

class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {searchInput: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({searchInput: event.target.value});
  }

  handleSubmit(event) {
    // eslint-disable-next-line
    const search = this.state.searchInput;
    // alert(`submited: ${  search}`);
    event.preventDefault();
  }

  render() {
    const { input } = this.state;
    return (
      <div className="NavBar">
        <form onSubmit={this.handleSubmit}>

          <img 
            className="Logo"
            src={logo} 
            alt="Project SHARE Logo" 
          />

          <button 
            className="Home" 
            type="button"
          >
            Home
          </button>

          <button 
            className="FindResource"
            type="button"
          >
            Help Me Find a Resource
          </button>

          <input 
            className="SearchBar"
            placeholder="Search for a resource" 
            type="text" 
            searchInput={input} 
            onChange={this.handleChange} 
          />

        </form>
      </div>
    );
  }
}

export default Navigation;