import React from 'react';
import './PostPreview.css';


function PostPreview({ Data }) {
  return (
    <div className="PostPreview">
      <p>
        { Data.images.length > 0 && (
          <img src={Data.images[0].img_file} alt={Data.images[0].img_name} key={Data.images[0].id} className="Photo"/>
        )}
        { Data.images.length <= 0 && (
          <div className="PhotoPlaceHolderLarge" />
        )}
      </p>
      <h5 className="DatePostedLarge">
        { Data.date }
      </h5>
      <div className="TitleLarge">
        { Data.title }
      </div>
      <div className="PostContentLarge">
        {
          `${Data.content.substr(0, 113)}...`
        }
      </div>
      <div text="..."> </div>
      <p className="TagsLarge">
        {Data.tags.map(tag => (
          <a href="/" className="tagElemPostLarge" key={tag.id}>{tag.name}</a>
        ))}
      </p>
    </div>
  )
}

export default PostPreview;
