import React from 'react';
import './Navigation.css';
import { Link, NavLink } from "react-router-dom";
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
          <div className="topRow">
            <Link to="/">
              <img 
                className="Logo"
                src={logo} 
                alt="Project SHARE Logo" 
              />
            </Link>
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
                searchinput={input} 
                onChange={this.handleChange} 
              />
            </div>

            <button 
              className="FindResource"
              type="button"
            >
              Help Me Find a Resource
            </button>
          </div>
          <div className="navbarLink">
            <NavLink className="tuftsResources" activeClassName="nav-active" to="/tuftsResources">
              Tufts Resources
            </NavLink>
            <NavLink className="communityResources" activeClassName="nav-active" to="/communityResources">
              Community Resources 
            </NavLink>
            <NavLink className="sharewood" activeClassName="nav-active" to="/sharewoodProject">
              The Sharewood Project
            </NavLink>
            <NavLink className="newsletterArchives" activeClassName="nav-active" to="/newsletterArchives">
              Newsletter Archives
            </NavLink>
            <NavLink className="howCanHelp" activeClassName="nav-active" to="/howYouCanHelp">
              How You Can Help
            </NavLink>
          </div>
        </form>
      </div>
    );
  }
}

export default Navigation;