import React from 'react';
import PropTypes from 'prop-types';
import PostFeedPage from "./PostFeedPage";

function TagPage(props) {

  const { match: { params: { tagId } } } = props;
  const endpoint = `http://localhost:8000/api/posts?tag_id=${tagId}`;
  const { location: { state: { tagName }}} = props;
  const tagLabel = tagName || tagId;
  return (
    <PostFeedPage fetchEndpoint={endpoint} subtitle={`All Topics > ${tagLabel}`} /> 
  );
}
export default TagPage;

TagPage.propTypes = {
  match: PropTypes.string.isRequired,
  location: {
    state: {
      tagName: PropTypes.string,
    }
  }
};

TagPage.defaultProps = {
  location: {
    state: {
      tagName: null,
    }
  }
}
