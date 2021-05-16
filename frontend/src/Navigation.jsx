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
      postSearchResults: [],
      // should i add a post search result here to get rid of parsing error
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearSearchBar = this.clearSearchBar.bind(this);
  }

  componentDidMount(){
    const {searchInput}=this.state;
    fetch("http://localhost:8000/api/tags")
      .then(res => res.json())
      .then(res => this.setState({tags: res}))
    fetch("http://localhost:8000/api/categories")
      .then(res => res.json())
      .then(res => this.setState({categories: res}))
    fetch(`http://localhost:8000/api/posts?keyword=${searchInput}`)
      .then(res => res.json())
      .then(res => this.setState({postSearchResults: res}))
  }

  clearSearchBar(){
    this.setState({searchInput:''})
  }

  handleChange(event) {
    const {searchInput}=this.state;
    this.setState({searchInput: event.target.value});
    fetch(`http://localhost:8000/api/posts?keyword=${searchInput}`)
      .then(res => res.json())
      .then(res => this.setState({postSearchResults: res}))
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
              <Icon.Search color="var(--header)" />
              <input 
                className="SearchBar"
                placeholder="Search for a resource" 
                type="text" 
                input={searchInput} 
                onChange={this.handleChange} 
              />
              <Icon.X onClick={this.clearSearchBar} color="var(--primary)" />
              <div className="searchResults"> 
                <div className="postSearchResults">
                  <Icon.FileText color="var(--header)" />
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
                  <hr />
                  
                </div>
              
                <div className="category">
                  <Icon.Hash color="var(--header)" />
                  {categoriesFiltered.map(categoryFiltered => (
                    <li>
                      <Link to={`/category/${categoryFiltered.id}`}> 
                        {' '}
                        {categoryFiltered.name}
                        {' '}
                      </Link>
                    </li>
                  ))}
                  <hr />
                  <p> - view related posts </p>
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
                  <hr />
                  <p> - view related posts </p>
                </div>

              </div>
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

// backend: pipenv run python3 manage.py runserver
