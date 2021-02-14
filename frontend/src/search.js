/*
Search class
This file contains the Search class, a React component for sitewide search.
It has a text field for search terms and a dropdown menu for location filters.
*/

import React from 'react';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: "",
      locationFilter: ""
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  
  handleInputChange(event) {
    const {target} = event;
    const {value} = target;
    const {name} = target;

    this.setState({
      [name]: value
    });
  }
  
  render() {
    const {searchTerm, locationFilter} = this.state;
    return (
      <form>
        <label>
          Search Term:
          <input
            name="searchTerm"
            type="text"
            value={searchTerm}
            onChange={this.handleInputChange}
          />
        </label>
        <br />
        <label>
          Location Filter:
          <select
            name="locationFilter"
            value={locationFilter}
            onChange={this.handleInputChange}
          >
            <option value="Medford/Somerville">Medford/Somerville</option>
            <option value="Tufts">Tufts</option>
            <option value="any location">any location</option>
          </select>
        </label>
      </form>
    );
  }
}

export default Search;