import React from 'react';
import PostFeedPage from "./PostFeedPage";

function HomePage() {
    
  const endpoint = `http://localhost:8000/api/posts`;
  return (
    <PostFeedPage fetchEndpoint={endpoint} featured title="Featured Resources" /> 
  );
}
export default HomePage;


