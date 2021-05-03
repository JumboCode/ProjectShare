import React from 'react';
import './Navigation.css';
import { Link, NavLink } from "react-router-dom";
import * as Icon from 'react-feather';
import logo from './static/projectSHARELogo.jpeg';
import HelpModal from './HelpModal';
import { BACKEND_URL } from './fetch';

class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: '',
      tags: [],
      categories: [],
      isModalOpen: false,
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
    fetch(`${BACKEND_URL}/api/tags`)
      .then(res => res.json())
      .then(res => this.setState({tags: res}))
    fetch(`${BACKEND_URL}/api/categories`)
      .then(res => res.json())
      .then(res => this.setState({categories: res}))
    fetch(`${BACKEND_URL}/api/posts?keyword=${searchInput}`)
      .then(res => res.json())
      .then(res => this.setState({postSearchResults: res}))
  }

  

  updateIsModalOpen = (val) => {
    this.setState({isModalOpen: val })
  }

  clearSearchBar() {
    this.setState({ searchInput: '' })
  }

  handleChange(event) {
    const {searchInput}=this.state;
    this.setState({searchInput: event.target.value});
    fetch(`${BACKEND_URL}/api/posts?keyword=${searchInput}`)
      .then(res => res.json())
      .then(res => this.setState({postSearchResults: res}))
  }

  handleSubmit(event) {
    // eslint-disable-next-line no-unused-vars
    const { searchInput: search } = this.state;
    event.preventDefault();
  }


  render() {
    const {searchInput, isModalOpen } = this.state;
    const {tags} = this.state;
    const {categories} = this.state;
    const {postSearchResults} = this.state;
    const categoriesFiltered = searchInput === "" ? [] :
      categories.filter(category => category.name.includes(searchInput)); 
    const tagsFiltered = searchInput === "" ? [] :
      tags.filter(tag => tag.name.includes(searchInput));
    // tags array is formatted so that each element formatted is an object that has 2 items (name and ID),
    // so like a list of objects. so when filter your tags
    const shouldDisplayResults = (searchInput !== '' && 
      (tagsFiltered.length !== 0 || postSearchResults.length !== 0 || categoriesFiltered.length !== 0 ))

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
            <div className="SearchBox">
              <Icon.Search color="lightgrey" className="search-icon-nav" />
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
                          <Link to={`/post/${post.id}/`} onClick={this.clearSearchBar}> 
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
                        <Link to={`/category/${categoryFiltered.id}`} onClick={this.clearSearchBar}> 
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
                        <Link to={`/tag/${tagFiltered.id}`} onClick={this.clearSearchBar}> 
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
