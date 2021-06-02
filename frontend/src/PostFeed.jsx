import React from 'react';
import PropTypes from 'prop-types';
// import React, { Component } from 'react';
import SmallerPostPreview from "./SmallerPostPreview";
import PostPreview from "./PostPreview";
import './PostFeed.css';

const PostFeed = ({title, subtitle, posts,featured, isLoading}) => {
  return (
    <div className="postfeed">
      <h3 className="postfeed-title">
        {title}
      </h3>
      <div className="subtitle">
        {subtitle}
      </div>
      {isLoading && <p>Loading...</p>}
      { featured === true && posts.length !== 0 && (
        <div className="featuredPost" key={posts[0].id}>
          <PostPreview Data={posts[0]} /> 
        </div>
      )}
      { posts.length !== 0 && featured === true && (
        posts.slice(1, posts.length).map(post => (
          <div className="smallerPosts" key={post.id}>
            <SmallerPostPreview Data={post} /> 
          </div>
        )) )}
      { posts.length !== 0 && featured === false && (
        posts.map(post => (
          <div className="allSmallerPosts" key={post.id}>
            <SmallerPostPreview Data={post} />
          </div>
        )) )}
    </div>
  )
}
export default PostFeed;

PostFeed.defaultProps = {
  featured: false,
  subtitle: "",
  isLoading: false,
};

PostFeed.propTypes = {
  isLoading: PropTypes.bool,
  title: PropTypes.string.isRequired,
  posts: PropTypes.arrayOf(PropTypes.shape({
    category: PropTypes.objectOf(PropTypes.oneOfType([
      PropTypes.string, PropTypes.number,
    ])),
    content: PropTypes.string,
    date: PropTypes.string,
    id: PropTypes.number,
    images: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.oneOfType([
      PropTypes.string, PropTypes.number,
    ]))),
    language: PropTypes.string,
    locations: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.oneOfType([
      PropTypes.string, PropTypes.number,
    ]))),
    tags: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.oneOfType([
      PropTypes.string, PropTypes.number,
    ]))),
    title: PropTypes.string,
  })).isRequired,
  featured: PropTypes.bool,
  subtitle: PropTypes.string,
};
