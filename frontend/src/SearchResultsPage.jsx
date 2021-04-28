import React from 'react';
// import PropTypes from 'prop-types';
import PostFeedPage from "./PostFeedPage";

class SearchResultsPage extends React.Component {
    
  componentDidMount() {
    // const { match: { params: { categoryId } } } = this.props;
  }

  render() {
    const { location: { search } } = this.props;
    const endpoint = `http://localhost:8000/api/posts${search}`;
    console.log(endpoint);
    return (
      <PostFeedPage fetchEndpoint={endpoint} subtitle={`All Topics > `} featured={true} /> 
    );
  }
}
export default SearchResultsPage;

