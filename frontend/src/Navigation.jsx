import React from 'react';
import './Navigation.css';
import { Link } from "react-router-dom";
import logo from './static/projectSHARELogo.jpeg';
import searchIcon from './static/searchIcon.png';


class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({searchInput: event.target.value});
  }

  handleSubmit(event) {
    // eslint-disable-next-line no-unused-vars
    const { searchInput:search } = this.state;
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
          
          <div className="navbarLink">
            <Link to="/home">
              <button 
                className="Home" 
                type="button"
              >
                Home
              </button>
            </Link>
            <button 
              className="Topics" 
              type="button"
            >
              Topics
            </button>

            <button 
              className="FindResource"
              type="button"
            >
              Help Me Find a Resource
            </button>
          </div>

          <div className="Search">
            <img 
              className="SearchIcon" 
              src={searchIcon}
              alt="Icon for Search Bar"
            />
            <input 
              className="SearchBar"
              placeholder="Search for a resource" 
              type="text" 
              searchInput={input} 
              onChange={this.handleChange} 
            />
          </div>
        </form>
      </div>
    );
  }
}

export default Navigation;