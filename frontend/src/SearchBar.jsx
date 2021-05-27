import React from 'react';
import './SearchBar.css';
import * as Icon from 'react-feather';
import { BACKEND_URL } from './fetch';

class SearchBar extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      searchInput: '',
      tags: [],
      categories: [],
    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount(){
    fetch(`${BACKEND_URL}/api/tags`)
      .then(res => res.json())
      .then(res => this.setState({tags: res}))
    fetch(`${BACKEND_URL}/api/categories`)
      .then(res => res.json())
      .then(res => this.setState({categories: res}))
    fetch(`${BACKEND_URL}/api/posts?keyword={keyword_value}`
      .then(res => res.json())
      .then(res => this.setState({postSearchResults: res}))
  }

  handleChange(event){
    this.setState({searchInput: e.search.value});
    // eslint-disable-next-line no-console
    console.log(event.target.value);
  }


  render(){
    // const { input } = this.state;
    
    return(
      <div className="searchBar">
        <Icon.Search color="lightgrey" />
        <input 
          className="searchBarText"
          placeholder="Search for a resource" 
          type="text" 
          searchInput={input} 
          onChange={this.handleChange} 
        />
        <Icon.X color="var(--primary)" />
        <div className="belowInput" />
      </div>
    );
  }
}

export default SearchBar;

// https://dev.to/sage911/how-to-write-a-search-component-with-suggestions-in-react-d20