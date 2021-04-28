import React from 'react';
import PostFeedPage from "./PostFeedPage";

class TagPage extends React.Component {
    
  componentDidMount() {
    // const { match: { params: { categoryId } } } = this.props;
  }

  render() {
    const { match: { params: { tagId } } } = this.props;
    const endpoint = `http://localhost:8000/api/posts?tag_id=${tagId}`;
    return (
      <PostFeedPage fetchEndpoint={endpoint} subtitle={`All Topics > ${tagId}`} /> 
    );
  }
}
export default TagPage;

