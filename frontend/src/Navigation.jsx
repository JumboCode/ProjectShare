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
    {const categories= } // and the other stuff before using 
    inputValue !== "" && (
      postSearchResults.map(post => (
      // TODO this is most definitely not right 
        <li>
          <Link to={`/post/${post.id}/`}> 
            {' '}
            {post.title}
            {' '}
          </Link>
        </li>
      ))
    )
  //  const categoriesFiltered = categories.filter(categories => categories.includes(keyword));
  //  const tagsFiltered= tags.filter(tags => tags.includes(keyword));

  // TODO this is def not right either 
    const {searchInput} = this.state;
    categories.filter(categories => categories.includes(searchInput)).map(categoriesFiltered => (
      <li>
        {categoriesFiltered}
      
        const categoryid = 
        {' '}
        {category.id}
        ;
        <Link to="/category/categoryid">{category.name}</Link>
      </li>
    ))
    tags.filter(tags => tags.includes(searchInput)).map(tagsFiltered => (
      <li>
        {tagsFiltered}
      
        const tags_id = 
        {' '}
        {tags.id}
        ;
        <Link to="/category/tags_id">{tags.name}</Link>
      </li>
    ))
    return (
      // jsx here
      
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


