import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component(){
  constructor(props) {
    super(props);
    this.state = {
      searchInput: '',
    };

  }

  render(){
    const { input } = this.state;
    return(
      <div className="searchBar">
        <input 
          className="SearchBar"
          placeholder="Search for a resource" 
          type="text" 
          searchInput={input} 
          onChange={this.handleChange} 
        />
      </div>
    );
  }
}

export default SearchBar;