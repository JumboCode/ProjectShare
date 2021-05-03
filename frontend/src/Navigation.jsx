import React from 'react';
import './Navigation.css';
import { Link, NavLink } from "react-router-dom";
import logo from './static/projectSHARELogo.jpeg';
import searchIcon from './static/searchIcon.png';
import HelpModal from './HelpModal';

class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: '',
      categories: [],
      isModalOpen: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    fetch('http://localhost:8000/api/categories')
      .then(res => res.json())
      .then(res => this.setState({ categories: res }));
  }

  updateIsModalOpen = (val) => {
    this.setState({isModalOpen: val })
  }

  handleSubmit(event) {
    // eslint-disable-next-line no-unused-vars
    const { searchInput: search } = this.state;
    event.preventDefault();
  }

  handleChange(event) {
    this.setState({ searchInput: event.target.value });
  }

  render() {
    const { input, categories, isModalOpen } = this.state;
    return (
      <div className="NavBar">
        {isModalOpen && (
          <HelpModal updateIsModalOpen={this.updateIsModalOpen} isModalOpen={isModalOpen} />
        )}
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
              onClick={() => this.setState({ isModalOpen: true })}
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
                to={{ pathname: `/category/${cat.id}`, state: { pageName: cat.name } }}
              >
                <h5>
                  {cat.name}
                </h5>
              </NavLink>
            ))}
          </div>
          <div className="nav-bottom-bar" />
        </form>
      </div>
    );
  }
}

export default Navigation;