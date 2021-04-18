import React from 'react';
import './Navigation.css';
import * as Icon from 'react-feather';
import { NavLink } from "react-router-dom";
import logo from './static/projectSHARELogo.jpeg';



class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: '',
      tags: [],
      categories: [],
      // should i add a post search result here to get rid of parsing error
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    fetch("http://localhost:8000/api/tags")
      .then(res => res.json())
      .then(res => this.setState({tags: res}))
    fetch("http://localhost:8000/api/categories")
      .then(res => res.json())
      .then(res => this.setState({categories: res}))
    fetch("http://localhost:8000/api/posts?keyword={keyword_value}")
      .then(res => res.json())
      .then(res => this.setState({postSearchResults: res}))
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
    const {searchInput} = this.state;
    { const categoriesFiltered = categories.filter(categories => categories.includes(searchInput)); }
    { const tagsFiltered= tags.filter(tags => tags.includes(searchInput)); }

    return (
      
      <div className="NavBar">
        <form onSubmit={this.handleSubmit}>

          <div className="topRow">
            <img 
              className="Logo"
              src={logo} 
              alt="Project SHARE Logo" 
            />

            <div className="SearchBox">
              <Icon.Search color="lightgrey" />
              <input 
                className="SearchBar"
                placeholder="Search for a resource" 
                type="text" 
                searchinput={input} 
                onChange={this.handleChange} 
              />
              <Icon.X color="var(--primary)" />
              <div className="searchResults" />
              {inputValue !== "" && (
                postSearchResults.map(post => (
      
                  <li>
                    <Link to={`/post/${post.id}/`}> 
                      {' '}
                      {post.title}
                      {' '}
                    </Link>
                  </li>
                )))}
    
            </div>
            <div className="category">
              {categoriesFiltered.map(categoriesFiltered => (
                <li>
                  <Link to={`/category/${category.id}`}> 
                    {' '}
                    {category.name}
                    {' '}
                  </Link>
                </li>
              ))}
            </div>
            <div className="tags">
              {tagsFiltered.map(tagsFiltered => (
                <li>
                  <Link to={`/tags/${tags.id}`}> 
                    {' '}
                    {tags.name}
                    {' '}
                  </Link>
                </li>
              ))}
            </div>
            <button 
              className="FindResource"
              type="button"
            >
              Help Me Find a Resource
            </button>
          </div>
          <div className="navbarLink">
            <NavLink className="tuftsResources" activeClassName="active" to="/tuftsResources">
              Tufts Resources
            </NavLink>
            <NavLink className="communityResources" activeClassName="active" to="/communityResources">
              Community Resources 
            </NavLink>
            <NavLink className="sharewood" activeClassName="active" to="/sharewoodProject">
              The Sharewood Project
            </NavLink>
            <NavLink className="newsletterArchives" activeClassName="active" to="/newsletterArchives">
              Newsletter Archives
            </NavLink>
            <NavLink className="howCanHelp" activeClassName="active" to="/howYouCanHelp">
              How You Can Help
            </NavLink>
          </div>
        </form>
      </div>
    );
  }
}

export default Navigation;


