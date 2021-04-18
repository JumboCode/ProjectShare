import React from 'react';
import PropTypes from 'prop-types';
// import React, { Component } from 'react';
import SmallerPostPreview from "./SmallerPostPreview";
import PostPreview from "./PostPreview";
import './PostFeed.css';

export const PostFeed = ({title, posts}) => {
// function PostFeed({title, posts}) {
  console.log(title);
  console.log(posts);
  return (
    <div className="postfeed">
      <div className="title">
        {title}
      </div>
      <div className="featuredPost">
        <PostPreview Data={posts[0]}>
        </PostPreview>
      </div>
      {posts.slice(1).map(post => (
        <div className="smallerPosts">
          <SmallerPostPreview Data={post}>
          </SmallerPostPreview>
        </div>
      ))}
    </div>
  )
}
export default PostFeed;

PostFeed.propTypes = {
  title: PropTypes.string.isRequired,
  posts: PropTypes.arrayOf(PropTypes.element).isRequired
};