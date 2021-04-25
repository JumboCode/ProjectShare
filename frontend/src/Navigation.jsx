import React from 'react';
import './Navigation.css';
import * as Icon from 'react-feather';
import { NavLink, Link } from "react-router-dom";
import logo from './static/projectSHARELogo.jpeg';



class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: '',
      tags: [],
      categories: [],
      // eslint-disable-next-line react/no-unused-state
      postSearchResults: '',
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
    const {tags} = this.state;
    const {categories} = this.state;
    const {postSearchResults} = this.state;
    const categoriesFiltered = categories.filter(category => category.name.includes(searchInput)); 
    const tagsFiltered= tags.filter(tag => tag.name.includes(searchInput)); 
    console.log(categoriesFiltered);
    // tags array is formatted so that each element formatted is an object that has 2 items (name and ID),
    // so like a list of objects. so when filter your tags

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
                input={searchInput} 
                onChange={this.handleChange} 
              />
              <Icon.X color="var(--primary)" />
              <div className="searchResults" />
              {searchInput !== "" && (
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
              {categoriesFiltered.map(categoryFiltered => (
                <li>
                  <Link to={`/category/${categoryFiltered.id}`}> 
                    {' '}
                    {categoryFiltered.name}
                    {' '}
                  </Link>
                </li>
              ))}
            </div>
            <div className="tags">
              {tagsFiltered.map(tagFiltered => (
                <li>
                  <Link to={`/tags/${tagFiltered.id}`}> 
                    {' '}
                    {tagFiltered.name}
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


// more tags and categories
// need fixing: in third fetch request, not using the search input keyword correctly. concatanate searchINput with rest of the fetch endpoint.
// backend: pipenv run python3 manage.py runserver
 