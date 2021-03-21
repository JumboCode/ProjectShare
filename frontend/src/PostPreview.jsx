import React from 'react';
import './PostPreview.css';


function PostPreview({ Data }) {
    return (
    <div className="PostPreview">
        <p>
            <div className="PhotoPlaceHolder">
                {/* Image */}
            </div>
        </p>
        <h5 className="DatePosted">
            { Data.date }
        </h5>
        <div className="Title">
            { Data.title }
        </div>
        <div className="PostContent">
            {
                `${Data.content.substr(0, 113)}...`
            }
        </div>
        <div text="..."> </div>
        <p className="Tags">
          {Data.tags.map(tag => (
            <a href="/" className="tagElemPost" key={tag}>{tag}</a>
          ))}
        </p>
    </div>
    )
}

export default PostPreview;
