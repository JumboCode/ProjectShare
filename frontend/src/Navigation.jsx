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
      categories: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    fetch('http://localhost:8000/api/categories')
      .then(res => res.json())
      .then(res => this.setState({ categories: res }));
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
    const { input, categories } = this.state;
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
            {categories.map(cat => (
              <NavLink 
                key={cat.id}
                className="tuftsResources"
                activeClassName="nav-active"
                to={`/category/${cat.id}`}
              >
                {cat.name}
              </NavLink>
            ))}
          </div>
        </form>
      </div>
    );
  }
}

export default Navigation;