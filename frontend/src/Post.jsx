import React from "react";
// import Link from "react-router-dom";
// import Map from "./Map";
import "./Post.css";

const templateData = [{
  "tags": ["access", "clinics", "women's health", "child health"],
  "date": "2020-10-18",
  "locations": [[-71.109830, 42.421530], [-71.312560, 42.649060]],
  "category": "Tufts Resources",
  "content": "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam rutrum magna ut interdum dictum. Sed orci nisl, maximus ac neque sed, tincidunt fringilla elit. Nullam dictum, augue eu viverra tristique, ipsum nulla accumsan sem, placerat dictum sem mauris nec magna. Nullam lobortis nibh diam, ac feugiat lorem bibendum in. Ut laoreet dui ipsum, a mollis dui pulvinar quis. Ut nisl mauris, rhoncus at orci nec, bibendum semper mauris. Sed a odio eu ante eleifend porttitor. Duis tempor turpis nec convallis lacinia. Sed non nunc a leo vehicula congue. Fusce efficitur iaculis porta. Integer molestie, magna ut dapibus lobortis, libero tellus dictum odio, vitae ornare nibh lacus eget risus. Donec tincidunt congue leo, ac pellentesque augue pretium nec. In vel diam massa. In eget quam vel purus hendrerit bibendum sit amet vitae nibh. Nam in augue maximus tortor mollis semper eu id dolor. Pellentesque ac orci nec ipsum molestie rhoncus sed sed metus. Maecenas sed diam suscipit, tincidunt odio a, rhoncus ipsum. Duis elit est, condimentum at dolor at, accumsan maximus enim. Quisque id odio non est scelerisque dignissim eget sit amet velit. Suspendisse nisi nibh, dictum ac dignissim quis, tincidunt sit amet ante. Mauris aliquet ipsum accumsan, venenatis metus suscipit, suscipit est. Aliquam quis dolor aliquet, vehicula tellus quis, vulputate eros. Mauris egestas mollis faucibus. Aliquam in arcu a sapien ultricies scelerisque et et leo. Suspendisse justo diam, malesuada vel diam eu, tincidunt dictum arcu. Integer ultrices ipsum ipsum, in eleifend felis dignissim quis. In vulputate vestibulum dui, vel lobortis dui pretium ac.</p>",
  "title": "Free Clinics in Medford",
  "author": "By Project SHARE"
}]

class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {;
    const post = templateData[0]

    return (
      <div className="Post">
        <ul className="Title">
          { post.title }
        </ul>
        <ul className="Author">
          { post.author }
        </ul>
        <ul className="Date">
          { post.date }
        </ul>
        <ul className="Contents">
          { post.content }
        </ul>
        {/* {templateData.tags.map(tag => <div className={tag} key={tag}> {tag} </div>)}  */}
      </div>
    );
  }
}

export default Post;