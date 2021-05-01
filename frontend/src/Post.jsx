import React from "react";
import Markdown from 'markdown-to-jsx';
import PropTypes from 'prop-types';
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
    }
    const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return (
      <div className="post">
        { posts.length > 0 && (
          <p className="tags">
            {post.tags.map(tag => (
              <a href="/" className="tagElem" key={tag.name}>{tag.name}</a>
            ))}
          </p>
        )}
        { posts.length > 0 && (
          <p className="title">
            { post.title } 
          </p> 
        )}
        { posts.length > 0 && (
          <p className="author">
            By Project SHARE
          </p>
        )}
        { posts.length > 0 && (
          <p className="date">
            {new Date(post.date).toLocaleDateString("en-US", dateOptions)}
          </p>
        )}
        { posts.length > 0 && (
          <p className="caption">
            { post.caption }
          </p>
        )}
        { posts.length > 0 && (
          <div className="contents">
            <Markdown>{post.content}</Markdown>
          </div>
        )}
        { posts.length > 0 && (
          <div className="image">
            {post.images.map(image => (
              <img src={image.img_file} alt={image.img_name} key={image.id} className="image" />
            ))}
          </div>
        )}
        { posts.length > 0 && post.locations.length !== 0 && (
          <div className="map">
            <Map locations={post.locations} />
          </div>
        )}
      </div>
    );
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
