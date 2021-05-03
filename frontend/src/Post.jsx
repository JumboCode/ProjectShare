import React from "react";
import Markdown from 'markdown-to-jsx';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Map from "./MapboxMap";
import "./Post.css";

class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {posts:[]};
  }

  componentDidMount() {
    const { match: { params: { postId } } } = this.props;
    fetch(`http://localhost:8000/api/posts?post_id=${postId}`)
      .then(res => res.json())
      .then(res => this.setState({posts: res}));
  }

  render() {
    const {posts} = this.state
    let post;
    if (posts.length !== 0) {
      post = posts[posts.length - 1]
      const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
      return (
        <div className="post">
          
          <h5 className="post-category-navigator">
            All Topics &gt;
            <Link 
              className="post-category-navigator"
              to={{ pathname: `/category/${post.category.id}`, state: { pageName: post.category.name } }}
            >
              {` ${post.category.name}`}
            </Link>
          </h5>
          
        
          <p className="tags">
            {post.tags.map(tag => (
              <Link
                to={{ pathname: `/tag/${tag.id}`, state: { pageName: tag.name } }}
                className="tagElem"
                key={tag.id}
              >
                {tag.name}
              </Link>
            ))}
          </p>
          <p className="title">
            { post.title } 
          </p> 
          <h5 className="author">
            By Project SHARE
          </h5>
          <h5 className="date">
            {new Date(post.date).toLocaleDateString("en-US", dateOptions)}
          </h5>
          {post.caption && (
            <p className="caption">
              { post.caption }
            </p>
          )}
          <div className="contents">
            <Markdown>{post.content}</Markdown>
          </div>
          <div className="image">
            {post.images.map(image => (
              <img src={image.img_file} alt={image.img_name} key={image.id} className="image" />
            ))}
          </div>
          { posts.length > 0 && post.locations.length !== 0 && (
            <div className="map">
              <Map locations={post.locations} />
            </div>
          )}
        </div>
      )}
    return null;
  }
}

export default Post;


Post.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      postId: PropTypes.string,
    })
  }).isRequired,
};
