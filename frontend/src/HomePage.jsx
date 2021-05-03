import React from 'react';
import PostFeedPage from "./PostFeedPage";
import { BACKEND_URL } from './fetch';

function HomePage() {
    
  const endpoint = `${BACKEND_URL}/api/posts`;
  return (
    <PostFeedPage fetchEndpoint={endpoint} featured title="Featured Resources" /> 
  );
}
export default HomePage;


