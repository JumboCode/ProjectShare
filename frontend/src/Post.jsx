import React from "react";
import Map from "./MapboxMap";
import "./Post.css";

class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {posts:[]};
  }

  componentDidMount() {
    const { match: { params } } = this.props;
    fetch ("http://localhost:8000/api/posts") 
      .then(res => res.json())
      .then(res => this.setState({posts: res}));
  }

  render() {
    const {posts} = this.state
    let post;
    if (posts.length !== 0) {
      post = posts[posts.length - 1]
    }
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
            { post.date }
          </p>
        )}
        { posts.length > 0 && (
          <p>
            <div className="image"> 
              {post.images.map(image => (
                <img src={image.img_file} alt={image.img_name} key={image.id} className="image" />
              ))}
            </div>
          </p>
        )}
        { posts.length > 0 && (
          <p className="caption">
            { post.caption }
          </p>
        )}
        { posts.length > 0 && (
          <p className="contents">
            { post.content }
          </p>
        )}
        { posts.length > 0 && (
          <div className="map">
            <Map />
          </div>
        )}
      </div>
    );
  }
}

export default Post;
