import React from 'react';
import PropTypes from 'prop-types';
import PostFeedPage from "./PostFeedPage";

function TagPage(props) {

  const { match: { params: { tagId } } } = props;
  const endpoint = `http://localhost:8000/api/posts?tag_id=${tagId}`;
  return (
    <PostFeedPage fetchEndpoint={endpoint} subtitle={`All Topics > ${tagId}`} /> 
  );
}
export default TagPage;

TagPage.propTypes = {
  match: PropTypes.string.isRequired
};

