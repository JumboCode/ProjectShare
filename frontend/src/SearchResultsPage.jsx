import React from 'react';
import PropTypes from 'prop-types';
import PostFeedPage from "./PostFeedPage";
import { BACKEND_URL } from './fetch';

function SearchResultsPage(props) {
    
  const { location: { search } } = props;
  const endpoint = `${BACKEND_URL}/api/posts${search}`;
  return (
    <div>
      <PostFeedPage fetchEndpoint={endpoint} subtitle="Search Results" featured={false} mapDefaultOpen />
    </div>
  );
}
export default SearchResultsPage;

SearchResultsPage.propTypes = {
  location: PropTypes.shape({
    search: PropTypes.string,
  }),
};

SearchResultsPage.defaultProps = {
  location: {
    search: '',
  },
};
