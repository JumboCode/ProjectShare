import React from 'react';
import PropTypes from 'prop-types';
import PostFeedPage from "./PostFeedPage";

function SearchResultsPage(props) {
    
  const { location: { search } } = props;
  const endpoint = `http://localhost:8000/api/posts${search}`;
  return (
    <PostFeedPage fetchEndpoint={endpoint} subtitle={`All Topics > ${search.substring(9)}`} featured={false} /> 
  );
}
export default SearchResultsPage;

SearchResultsPage.propTypes = {
  location: PropTypes.string.isRequired
};

