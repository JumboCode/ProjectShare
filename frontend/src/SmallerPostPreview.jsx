import React from 'react';
import './SmallerPostPreview.css';


function SmallerPostPreview({ Data }) {
  return (
    <div className="SmallerPostPreview">
      <p>
        <div className="PhotoPlaceHolder">
          {/* Image */}
        </div>
      </p>
      <p className="DatePosted">
        { Data.date }
      </p>
      <p className="Title">
        { Data.title }
      </p>
      <div className="SmallPostContent">
          {
              `${Data.content.substr(0, 85)}...`
          }
      </div>
      <p className="Tags">
        {Data.tags.map (tag => (
          <a href="/" className="tagElemPost" key={tag}>{tag}</a>
        ))}
      </p>
    </div>
  )
}

export default SmallerPostPreview;
