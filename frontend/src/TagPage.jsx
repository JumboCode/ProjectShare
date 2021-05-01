import React from 'react';
import PropTypes from 'prop-types';
import PostFeedPage from "./PostFeedPage";

function TagPage(props) {
  const { match: { params: { tagId } } } = props;
  const endpoint = `http://localhost:8000/api/posts?tag_id=${tagId}`;
  let tagLabel = tagId;
  const { location: { state } } = props;
  if (state) {
    tagLabel = state.tagName;
  }
  return (
    <PostFeedPage fetchEndpoint={endpoint} subtitle={`All Topics > ${tagLabel}`} /> 
  );
}
export default TagPage;

TagPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      tagId: PropTypes.string,
    })
  }).isRequired,
  location: PropTypes.shape({
    state: PropTypes.shape({
      tagName: PropTypes.string,
    })
  }),
};

TagPage.defaultProps = {
  location: {
    state: {
      tagName: null,
    }
  }
}
