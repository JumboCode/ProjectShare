import React from 'react';
import PropTypes from 'prop-types';
import PostFeedPage from "./PostFeedPage";

function CategoryPage(props) {
    
  const { match: { params: { categoryId } } } = props;
  const endpoint = `http://localhost:8000/api/posts?category_id=${categoryId}`;
  return (
    <PostFeedPage fetchEndpoint={endpoint} subtitle={`All Topics > ${categoryId}`} /> 
  );
}

export default CategoryPage;

CategoryPage.propTypes = {
  match: PropTypes.string.isRequired
};

