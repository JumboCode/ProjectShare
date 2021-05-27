import React from 'react';
import PropTypes from 'prop-types';
import PostFeedPage from "./PostFeedPage";
import { BACKEND_URL } from './fetch';

function CategoryPage(props) {
    
  const { match: { params: { categoryId } } } = props;
  const endpoint = `${BACKEND_URL}/api/posts?category_id=${categoryId}`;
  let catLabel = categoryId;
  const { location: { state } } = props;
  if (state) {
    catLabel = state.pageName;
  }
  return (
    <PostFeedPage fetchEndpoint={endpoint} subtitle={`All Topics > ${catLabel}`} /> 
  );
}

export default CategoryPage;

CategoryPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      categoryId: PropTypes.string,
    })
  }).isRequired,
  location: PropTypes.shape({
    state: PropTypes.shape({
      pageName: PropTypes.string,
    })
  }),
};

CategoryPage.defaultProps = {
  location: {
    state: {
      pageName: null,
    }
  }
}