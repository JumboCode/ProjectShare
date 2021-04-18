import React from 'react';
import './SmallerPostPreview.css';


function SmallerPostPreview({ Data }) {
  return (
    <div className="SmallerPostPreview">
      <p>
        { Data.images.length > 0 && (
          <img src={Data.images[0].img_file} alt={Data.images[0].img_name} key={Data.images[0].id} className="Photo"/>
        )}
        { Data.images.length <= 0 && (
          <div className="PhotoPlaceHolder" />
        )}
      </p>
      <p className="DatePosted">
        { Data.date }
      </p>
      <p className="Title">
        { Data.title }
      </p>
      <p className="PostContent">
        { `${Data.content.substr(0, 113)}...` }
      </p>
      <p className="Tags">
        {Data.tags.map (tag => (
          <a href="/" className="tagElemPost" key={tag.id}>{tag.name}</a>
        ))}
      </p>
    </div>
  )
}

export default SmallerPostPreview;
