import React from 'react';
import './PostPreview.css';
//import Data from "./Post.jsx";


function PostPreview({ Data }) {
    console.log()
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
                Data.content.substr(0, 142)
            }
        </div>
        <h5 className="Tags">
            { Data.tags }
        </h5>
    </div>
    )
}

export default PostPreview;
