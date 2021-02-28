import React from 'react';
import './SmallerPostPreview.css';


function SmallerPostPreview({ Data }) {
    console.log()
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
        <h5 className="Tags">
            { Data.tags }
        </h5>
    </div>
    )
}

export default SmallerPostPreview;
