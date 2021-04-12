import React from 'react';
import './SearchBar.css';
import * as Icon from 'react-feather';

class SearchBar extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      searchInput: '',
      tags: [],
    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount(){
    fetch("http://localhost:8000/api/tags")
      .then(res => res.json())
      .then(res => this.setState({tags: res})
  }

  handleChange(event){
    this.setState({searchInput: this.search.value});
    // eslint-disable-next-line no-console
    console.log(event.target.value);
  }


  render(){
    const { input } = this.state;
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

// PURPOSE: rendered based on firing on event. based on user. 
// TODO: change size and make it fit inside the box


// https://dev.to/sage911/how-to-write-a-search-component-with-suggestions-in-react-d20