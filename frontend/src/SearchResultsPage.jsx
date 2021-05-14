import React from 'react';
import PropTypes from 'prop-types';
import PostFeedPage from "./PostFeedPage";

function SearchResultsPage(props) {
    
  const { location: { search } } = props;
  const endpoint = `http://localhost:8000/api/posts${search}`;
  return (
    <div>
      <PostFeedPage fetchEndpoint={endpoint} subtitle={`All Topics > ${search.substring(9)}`} featured={false} mapDefaultOpen /> 
    </div>
  );
}
export default SearchResultsPage;

SearchResultsPage.propTypes = {
  location: PropTypes.string.isRequired /* change to not string, or make prop string */
};

/*
check if map is open, if open, render map (not in this page)
in component did mount, create parameter in state that is list of all locations (or in render function)
pass map location list 
check what to do if no locations with meguna 
*/

