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
    const categoriesFiltered = searchInput === "" ? [] :
      categories.filter(category => category.name.includes(searchInput)); 
    const tagsFiltered = searchInput === "" ? [] :
      tags.filter(tag => tag.name.includes(searchInput));
    console.log(categoriesFiltered);
    // tags array is formatted so that each element formatted is an object that has 2 items (name and ID),
    // so like a list of objects. so when filter your tags
    const shouldDisplayResults = (searchInput !== '' && 
      (tagsFiltered.length !== 0 || postSearchResults.length !== 0 || categoriesFiltered.length !== 0 ))

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
                value={searchInput} 
                onChange={this.handleChange}
              />
              <div 
                onClick={this.clearSearchBar}
                className="close-button-wrapper"
                role="button"
                tabIndex="0"
                onKeyDown={this.clearSearchBar}
              >
                <Icon.X color="var(--primary)" />
              </div>
              {shouldDisplayResults && (
                <div className="searchResults"> 
                  <div className="postSearchResults">
                    {searchInput !== "" && (
                      postSearchResults.map(post => (
      
                        <p className="nav-search-result">
                          <Link to={`/post/${post.id}/`}> 
                            {' '}
                            {post.title}
                            {' '}
                          </Link>
                          <span className="search-results-type">POST</span>
                        </p>
                      )))}
                  </div>
              
                  <div className="category">
                    {categoriesFiltered.map(categoryFiltered => (
                      <p className="nav-search-result">
                        <Link to={`/category/${categoryFiltered.id}`}> 
                          {' '}
                          {categoryFiltered.name}
                          {' '}
                        </Link>
                        <span className="search-results-type">CATEGORY</span>
                      </p>
                    ))}
                  </div>
                  <div className="tags-wrapper">
                    {tagsFiltered.map(tagFiltered => (
                      <p className="nav-search-result">
                        <Link to={`/tags/${tagFiltered.id}`}> 
                          {' '}
                          {tagFiltered.name}
                          {' '}
                        </Link>
                        <span className="search-results-type">TAG</span>
                      </p>
                    ))}
                  </div>
                </div>
              )}
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
 

// TODO: 
// test tags (health1, health2, health3 all should come up should be inside tag filtered)
// zeplin: add designs for the various types of search results - format things to look that way
// icons in feather icons - on the big X onClick={}

// put all of the results inside a div 
// one div for categoriesfiltered, another for tagsFiltered, one for searchResults. 
// on the big box surrounding everything, put displayflex, flexdirection make sure things are stacked in a column
//* display flex *around containing div 

// hash and file text icons from feather icons

// display:flex;flex-direction:column;
// Hash, FileText