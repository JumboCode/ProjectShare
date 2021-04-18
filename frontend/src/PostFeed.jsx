import React from 'react';
import PropTypes from 'prop-types';
// import React, { Component } from 'react';
import SmallerPostPreview from "./SmallerPostPreview";
import PostPreview from "./PostPreview";
import './PostFeed.css';

export const PostFeed = ({title, posts,featured}) => {
  return (
    <div className="postfeed">
      <div className="title">
        {title}
      </div>
      <div className="featuredPost">
        { featured === true &&
          <PostPreview Data={posts[0]} />
        }
      </div>
      {posts.slice(1).map(post => (
        <div className="smallerPosts">
          { featured === true &&
            <SmallerPostPreview Data={post} />
          }
        </div>
      ))}
      {posts.map(post => (
        <div className="allSmallerPosts">
          { featured === false &&
            <SmallerPostPreview Data={post} />
          }
        </div>
      ))}
    </div>
  )
}
export default PostFeed;

PostFeed.defaultProps = {
  featured: false,
};

PostFeed.propTypes = {
  title: PropTypes.string.isRequired,
  posts: PropTypes.arrayOf(PropTypes.element).isRequired,
  featured: PropTypes.bool,
};
