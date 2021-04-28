import React from 'react';
import PropTypes from 'prop-types';
// import React, { Component } from 'react';
import SmallerPostPreview from "./SmallerPostPreview";
import PostPreview from "./PostPreview";
import './PostFeed.css';

export const PostFeed = ({title, subtitle, posts,featured}) => {
  return (
    <div className="postfeed">
      <div className="title">
        {title}
      </div>
      <div className="subtitle">
        {subtitle}
      </div>
      { featured === true && (
        <div className="featuredPost">
          <PostPreview Data={posts[0]} /> 
        </div>
      )}
      {posts.slice(1).map(post => (
        <div className="smallerPosts" key={post.id}>
          { featured === true &&
            <SmallerPostPreview Data={post} /> }
        </div>
      ))}
      {posts.map(post => (
        <div className="allSmallerPosts" key={post.id}>
          { featured === false &&
            <SmallerPostPreview Data={post} />}
        </div>
      ))}
    </div>
  )
}
export default PostFeed;

PostFeed.defaultProps = {
  featured: false,
  subtitle: "",
};

PostFeed.propTypes = {
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
