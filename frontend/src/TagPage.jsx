import React from 'react';
import PropTypes from 'prop-types';
import PostFeedPage from "./PostFeedPage";
import { BACKEND_URL } from './fetch';

function TagPage(props) {
  const { match: { params: { tagId } } } = props;
  const endpoint = `${BACKEND_URL}/api/posts?tag_id=${tagId}`;
  let tagLabel = tagId;
  const { location: { state } } = props;
  if (state) {
    tagLabel = state.pageName;
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
      pageName: PropTypes.string,
    })
  }),
};

TagPage.defaultProps = {
  location: {
    state: {
      pageName: null,
    }
  }
}
