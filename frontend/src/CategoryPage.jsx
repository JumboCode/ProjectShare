import React from 'react';
import PostFeedPage from "./PostFeedPage";

class CategoryPage extends React.Component {
    
  componentDidMount() {
    // const { match: { params: { categoryId } } } = this.props;
  }

  render() {
    const { match: { params: { categoryId } } } = this.props;
    const endpoint = `http://localhost:8000/api/posts?category_id=${categoryId}`;
    return (
      <PostFeedPage fetchEndpoint={endpoint} subtitle={`All Topics > ${categoryId}`} /> 
    );
  }
}
export default CategoryPage;

